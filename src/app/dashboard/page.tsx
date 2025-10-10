"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { getPublicRepos } from "@/functions/getPublicRepos";
import { GitHubRepo } from "@/types/githubrepo";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export default function Home() {
  const [data, setData] = useState<GitHubRepo[]>([]);
  // const { data } = useSession();
  // console.log(data?.repos);
useEffect(()=>{
  (async ()=>{
    if(data.length === 0){
      setData(await getPublicRepos());
    }
  })()
},[])
  return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Your Public Repositories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.map((repo: GitHubRepo) => (
            <Card key={repo.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/dashboard/repos/${repo.name}`}>
                    {repo.name}
                  </Link>
                </CardTitle>
                <CardDescription>{repo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}
