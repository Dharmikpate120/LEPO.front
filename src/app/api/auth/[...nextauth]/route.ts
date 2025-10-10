import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from 'next-auth/jwt';
import { Account, Session } from 'next-auth';
import { getPublicRepos } from "@/functions/getPublicRepos";
import { GitHubRepo } from "@/types/githubrepo";

// Define the shape of the token and session to add the accessToken
interface CustomSession extends Session {
  // accessToken?: string;
  repos?: GitHubRepo[]
}

interface CustomJWT extends JWT {
  accessToken?: string;
}

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      authorization:{
        params: {
          scope:"user repo"
        }
      }
    }),
  ],
  callbacks : {
  // Add the access token to the JWT
  async jwt({ token, account }: { token: CustomJWT; account: Account | null }) {
    // console.log(account, token);

    if (account) {
      token.accessToken = account.access_token;
    }
    return token;
  },
  // // Expose the access token to the session
  // async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
  //   const response =await getPublicRepos(token?.accessToken || ""); 
  //   session.repos = response?.data;
  //   return session;
  // },
}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };