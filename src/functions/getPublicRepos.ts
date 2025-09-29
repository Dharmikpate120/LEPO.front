"use server";

import { GitHubRepo } from "@/types/githubrepo";
import axios from "axios";

export async function getPublicRepos(GITHUB_ACCESS_TOKEN:string){
    
"use server"
console.log(GITHUB_ACCESS_TOKEN)
if(GITHUB_ACCESS_TOKEN){

    const repos = await axios.get("https://api.github.com/user/repos?visibility=public", {
        headers:{
            'Authorization': `Bearer ${GITHUB_ACCESS_TOKEN}`,
            'User-Agent':"LEPO/1.0"
        }
    })
    // console.log(repos);
    return repos;
}
return {data:[]}
}