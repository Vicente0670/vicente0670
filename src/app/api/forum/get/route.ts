import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import pool from "../../sql/db";

// Display 

/**
 * /** Grab only a single post to display using a unique identifier
 * @param request 
 */
export async function GET(request: NextRequest): Promise<NextResponse> {

  const { searchParams: params } = new URL(request.url);

  const uuid = params.get("");

  const singletonRequest = `
    SELECT forum_posts.*
    
  `;

  const { rows } = await pool.query(singletonRequest, [uuid]);

  return NextResponse.json(rows);

}

export async function POST(request: NextRequest): Promise<NextResponse> {

  const uuid = Crypto.prototype.randomUUID();
  return NextResponse.json({});

}