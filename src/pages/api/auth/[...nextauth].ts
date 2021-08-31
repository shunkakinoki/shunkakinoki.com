/* eslint-disable @typescript-eslint/no-unsafe-call */

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { User as NextAuthUser } from "next-auth";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

interface NextAuthUserWithStringId extends NextAuthUser {
  id: string;
}
const prisma = new PrismaClient();

export const Auth = NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        } as NextAuthUserWithStringId;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
export default Auth;
