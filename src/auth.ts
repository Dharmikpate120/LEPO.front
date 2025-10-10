// auth.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from 'next-auth/jwt';
import { Account, Session } from 'next-auth';
// import type { NextAuthConfig } from "next-auth";
import { GitHubRepo } from "./types/githubrepo";

interface CustomSession extends Session {
  repos?: GitHubRepo[]
}

interface CustomJWT extends JWT {
  accessToken?: string;
}

export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: "user repo"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: CustomJWT; account: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // You can also add the access token to the session object here if needed for client-side use
    // async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
