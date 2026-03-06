import { NextResponse, NextRequest } from "next/server";
import { forumGenres } from "@/constants"; 
import { checkGenre } from "@/utils";
import { randomUUID } from "crypto";
import pool from "../../sql/db";
import { auth } from "@/auth";

/**
 * Sets the pool query with the order in the query.
 * @param order
 * @returns string
 */
function setOrder(order: string) {

  if (!order || order != "ascending")
    return "DESC";

  else
    return "ASC";
  
}

/**
 * Used for getting a range of posts based on 4 factors:
 * - Server Rate Limits
 * - Post Offset (for indexing database)
 * - User-selected Genre
 * - User-selected Subgenres of each Genre (e.g. memes, media, announcement, etc.)
 * - User-selected Order of Posts (by date, by author, etc.)
 */ 
export async function GET(request: NextRequest): Promise<NextResponse> {

  const { searchParams: params } = new URL(request.url);
  const limit = Number(params.get("limit")) || 5;
  const offset = Number(params.get("offset")) || 0;
  const genre = checkGenre(String(params.get("genre")));
  // const subgenre = filterParameters(String());
  const order = setOrder(String(params.get("order")));

  try {

    const forumPostRequest = `
      SELECT forum_posts.*, users.name, users.email
      FROM forum_posts
      JOIN users ON forum_posts.author_id = users.id
      WHERE forum_posts.topic LIKE '${genre}'
      ORDER BY created_at ${order}
      LIMIT $1 OFFSET $2
    `;

    const { rows } = await pool.query(forumPostRequest, [limit, offset]);
    
    return NextResponse.json(rows);

  }
  catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not fetch forum posts. Why does this happen?" }, { status: 500 });
  }

}

/**
 * Parses fields from the user, and posts the data onto the database.
 * @since 0.1.2
 * @param request 
 * @returns Promise<NextResponse>
 */
export async function POST(request: NextRequest): Promise<NextResponse> {

  const session = await auth();

  if (!session || !session.user)
    return NextResponse.json({ error: "You need to log in first! Please try logging in again." }, { status: 401 });

  const userId = session.user.id;
  const userName = session.user.name;

  if (!userId || !userName)
    return NextResponse.json({ error: "Missing user information. Please try logging in again." }, { status: 401 });

  const { title, content, genre } = await request.json();
  
  try {
    
    //  
    //  TRY TO FIND A WAY TO SEE WHAT TOPIC YOU'RE WRITING A POST FOR ON THE SERVER SIDE!
    // 
    //     
    const forumInsertRequest = `
    INSERT INTO forum_posts (title, content, topic, author_id, author_name, crypto_uuid)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;

    const start = 9;
    const end = 23;
    const cryptoUUID = self.crypto.randomUUID().slice(start, end);
    
    console.log(cryptoUUID);

    const values = [title, content, genre, userId, userName, cryptoUUID];
    const { rows } = await pool.query(forumInsertRequest, values);

    return NextResponse.json(rows[0]);
    
  }
  catch (e) {

    console.error(e);
    return NextResponse.json({ error: "Could not create post! Please try again later!" }, { status: 500 });

  }

}