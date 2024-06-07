import NextAuth from "next-auth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import type {Provider} from "next-auth/providers";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

const providers: Provider[] = [
  Google,
  Twitter,
  Discord,
  GitHub,
  Resend({
    // Change this later during production; Make sure to get a DNS record from Resend.dev!
    from: "no-reply@resend.dev",
  }),
]
export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const info = provider();
    return {
      id: info.id,
      name: info.name,
    }
  }
  else {
    return {
      id: provider.id,
      name: provider.name,
    }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers,
  pages: {
    signIn: "/access",
    signOut: "/signout",
    error: "/access/error",
    // verifyRequest: "/access/verify",
  },
})