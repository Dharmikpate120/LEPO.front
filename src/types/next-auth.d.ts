import {JWT} from "next-auth/jwt";
import {Session } from "next-auth";
import { GitHubRepo } from "./githubrepo";

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
declare module "next-auth" {
    interface Session {
        // accessToken?: string;
        repos?: GitHubRepo[]
    }
}