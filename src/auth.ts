import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import type { Provider } from "next-auth/providers";

import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const providers: Provider[] = [
  Google,
  Twitter,
  GitHub,
  Discord,
];

export const providersMap = providers.map((provider) => {
  
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }

  else return { id: provider.id, name: provider.name };

}).filter((provider) => provider.id !== "credentials"); // Just in case...

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers,
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
});