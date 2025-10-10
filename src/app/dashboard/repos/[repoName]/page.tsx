"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GitHubRepo, Commit, Skill, SubSkill } from "@/types/githubrepo"; // Assuming GitHubRepo type is available
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress"; // Assuming a Progress component from shadcn is available

export default function RepoDetailPage() {
  const params = useParams();
  const repoName = params.repoName as string;

  const [repoDetails, setRepoDetails] = useState<GitHubRepo | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedCommitIndex, setSelectedCommitIndex] = useState<number>(0);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchRepoData = async () => {
      // Simulate fetching repo details
      const dummyRepo: GitHubRepo = {
        id: 123,
        node_id: "dummy_node_id",
        name: repoName,
        full_name: `user/${repoName}`,
        private: false,
        owner: {
          login: "user",
          id: 1,
          node_id: "dummy_user_node_id",
          avatar_url: "",
          gravatar_id: "",
          url: "",
          html_url: "",
          followers_url: "",
          following_url: "",
          gists_url: "",
          starred_url: "",
          subscriptions_url: "",
          organizations_url: "",
          repos_url: "",
          events_url: "",
          received_events_url: "",
          type: "User",
          user_view_type: "User",
          site_admin: false,
        },
        html_url: `https://github.com/user/${repoName}`,
        description: `This is a dummy description for ${repoName}.`,
        fork: false,
        url: "",
        forks_url: "",
        keys_url: "",
        collaborators_url: "",
        teams_url: "",
        hooks_url: "",
        issue_events_url: "",
        events_url: "",
        assignees_url: "",
        branches_url: "",
        tags_url: "",
        blobs_url: "",
        git_tags_url: "",
        git_refs_url: "",
        trees_url: "",
        statuses_url: "",
        languages_url: "",
        stargazers_url: "",
        contributors_url: "",
        subscribers_url: "",
        subscription_url: "",
        commits_url: "",
        git_commits_url: "",
        comments_url: "",
        issue_comment_url: "",
        contents_url: "",
        compare_url: "",
        merges_url: "",
        archive_url: "",
        downloads_url: "",
        issues_url: "",
        pulls_url: "",
        milestones_url: "",
        notifications_url: "",
        labels_url: "",
        releases_url: "",
        deployments_url: "",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        pushed_at: "2023-01-01T00:00:00Z",
        git_url: "",
        ssh_url: "",
        clone_url: "",
        svn_url: "",
        homepage: null,
        size: 0,
        stargazers_count: 0,
        watchers_count: 0,
        language: "TypeScript",
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        has_discussions: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 0,
        license: null,
        allow_forking: true,
        is_template: false,
        web_commit_signoff_required: false,
        topics: [],
        visibility: "public",
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: "main",
        permissions: {
          admin: true,
          maintain: true,
          push: true,
          triage: true,
          pull: true,
        },
      };
      setRepoDetails(dummyRepo);

      // Simulate fetching commits and their skills
      const dummyCommits: Commit[] = [
        {
          sha: "commit1",
          message: "Initial commit",
          date: "2023-01-01",
          skills: [
            { name: "TypeScript", mastery: 750, subSkills: [{ name: "Generics", mastery: 800 }, { name: "Interfaces", mastery: 700 }] },
            { name: "React", mastery: 600, subSkills: [{ name: "Components", mastery: 650 }, { name: "Hooks", mastery: 550 }] },
          ],
        },
        {
          sha: "commit2",
          message: "Added new feature",
          date: "2023-01-15",
          skills: [
            { name: "TypeScript", mastery: 800, subSkills: [{ name: "Generics", mastery: 850 }, { name: "Type Inference", mastery: 750 }] },
            { name: "React", mastery: 700, subSkills: [{ name: "Context API", mastery: 720 }, { name: "State Management", mastery: 680 }] },
            { name: "Node.js", mastery: 500, subSkills: [{ name: "Express", mastery: 550 }] },
          ],
        },
        {
          sha: "commit3",
          message: "Bug fix and refactor",
          date: "2023-02-01",
          skills: [
            { name: "TypeScript", mastery: 850, subSkills: [{ name: "Decorators", mastery: 900 }, { name: "Utility Types", mastery: 800 }] },
            { name: "React", mastery: 750, subSkills: [{ name: "Performance Optimization", mastery: 780 }, { name: "Testing", mastery: 720 }] },
            { name: "Node.js", mastery: 600, subSkills: [{ name: "APIs", mastery: 620 }, { name: "Security", mastery: 580 }] },
            { name: "Database", mastery: 400, subSkills: [{ name: "SQL", mastery: 450 }]},            
          ],
        },
      ];
      setCommits(dummyCommits);
      setCurrentSkills(dummyCommits[selectedCommitIndex]?.skills || []);
    };
    fetchRepoData();
  }, [repoName, selectedCommitIndex]);

  if (!repoDetails || commits.length === 0) {
    return <div className="container mx-auto py-10">Loading repository details...</div>;
  }

  const selectedCommit = commits[selectedCommitIndex];

  const getProgressColor = (mastery: number) => {
    if (mastery >= 800) return "bg-green-500";
    if (mastery >= 500) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getCircularProgressStyle = (mastery: number) => {
    const circumference = 2 * Math.PI * 15; // 15 is the radius
    const offset = circumference - (mastery / 1000) * circumference;
    return {
      strokeDasharray: circumference,
      strokeDashoffset: offset,
      transition: "stroke-dashoffset 0.5s ease-in-out",
    };
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Repository: {repoDetails.name}</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{repoDetails.name}</CardTitle>
          <CardDescription>{repoDetails.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Language: {repoDetails.language}</p>
          <p>
            GitHub Link:{" "}
            <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {repoDetails.html_url}
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Commit Progress Bar */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Commit History</CardTitle>
          <CardDescription>Select a commit to view skills at that point in time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {commits.map((commit, index) => (
              <div
                key={commit.sha}
                className={`w-6 h-6 rounded-full cursor-pointer flex items-center justify-center
                  ${index === selectedCommitIndex ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}
                `}
                onClick={() => setSelectedCommitIndex(index)}
                title={commit.message}
              >
                {index + 1}
              </div>
            ))}
          </div>
          {selectedCommit && (
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Commit:</strong> {selectedCommit.message} ({selectedCommit.date})
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills at this Commit</CardTitle>
        </CardHeader>
        <CardContent>
          {currentSkills.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {currentSkills.map((skill, index) => (
                <AccordionItem key={index} value={skill.name}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-medium">{skill.name}</span>
                      <div className="relative w-8 h-8">
                        <svg className="w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                          <circle
                            className="text-gray-200 stroke-current"
                            cx="18" cy="18" r="15"
                            strokeWidth="3"
                            fill="none"
                          ></circle>
                          <circle
                            className={`${getProgressColor(skill.mastery)} stroke-current`}
                            cx="18" cy="18" r="15"
                            strokeWidth="3"
                            fill="none"
                            transform="rotate(-90 18 18)"
                            style={getCircularProgressStyle(skill.mastery)}
                          ></circle>
                          <text
                            x="18" y="18"
                            className="text-[10px] fill-current text-gray-700 dark:text-gray-300 font-bold"
                            textAnchor="middle" alignmentBaseline="middle"
                          >
                            {Math.round((skill.mastery / 1000) * 100)}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {skill.subSkills && skill.subSkills.length > 0 ? (
                      <div className="ml-4 border-l pl-4">
                        {skill.subSkills.map((subSkill, subIndex) => (
                          <div key={subIndex} className="flex items-center justify-between py-2">
                            <span>{subSkill.name}</span>
                            <div className="relative w-7 h-7">
                              <svg className="w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle
                                  className="text-gray-200 stroke-current"
                                  cx="18" cy="18" r="15"
                                  strokeWidth="3"
                                  fill="none"
                                ></circle>
                                <circle
                                  className={`${getProgressColor(subSkill.mastery)} stroke-current`}
                                  cx="18" cy="18" r="15"
                                  strokeWidth="3"
                                  fill="none"
                                  transform="rotate(-90 18 18)"
                                  style={getCircularProgressStyle(subSkill.mastery)}
                                ></circle>
                                <text
                                  x="18" y="18"
                                  className="text-[9px] fill-current text-gray-700 dark:text-gray-300 font-bold"
                                  textAnchor="middle" alignmentBaseline="middle"
                                >
                                  {Math.round((subSkill.mastery / 1000) * 100)}%
                                </text>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="ml-4 text-muted-foreground">No sub-skills defined for this skill.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="mb-4">No skills generated for this commit yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
