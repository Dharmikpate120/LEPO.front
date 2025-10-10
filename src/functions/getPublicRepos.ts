"use server";

import { decodeJWT } from "@/lib/auth";
import { GitHubRepo } from "@/types/githubrepo";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function getPublicRepos(){
    "use server"
    const header = await headers();
    const cookie = await cookies();

    const req = {
        headers: header,
        cookies: cookie
    } as unknown as NextRequest

    const jwt_data =await decodeJWT(req);
    // console.log("token",jwt_data);

    if(jwt_data?.accessToken){

        const repos = await axios.get("https://api.github.com/user/repos?visibility=public", {
            headers:{
                'Authorization': `Bearer ${jwt_data.accessToken}`,
                'User-Agent':"LEPO/1.0"
            }
        }) 
        // console.log(repos);
        return repos.data;
    }
return {data:[]}
}