"use client";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import TeamHeader from "@/components/main/team/team-header";
import { DescSection, IntroSection } from "@/components/main/team/team-sections";
import { Skeleton } from "@/components/ui/skeleton";



export default function TeamPage({ params }) {
	const { data, error, isLoading } = useSWR(params.teamId ? `/api/teams/${params.teamId}` : null, fetcher);
	const teamData = data?.data || {};

	// TODO: Error layout
	if (error) return (
		<div className="grid justify-items-center content-center gap-8 p-8">
			<span>{error.message}</span>
		</div>
	);

	return (
        <div>
			<header className="w-screen">
				{isLoading ? (
					<Skeleton className="w-screen h-72" />
				) : (
					<TeamHeader
						coverImgUrl={teamData.cover_img_url}
						title={teamData.title}
						year={teamData.year}
						group={teamData.group}
						teamName={teamData.team_name}
						email={teamData.email}
						related_urls={teamData.related_urls}
						tags={teamData.tags}
					/>
				)}
			</header>
			<main>
				{!isLoading && (
					<div className="wrapper-md">
						<article className="grid gap-y-18 py-12">
							<IntroSection introduction={teamData.introduction} />
							<DescSection teamDesc={teamData.team_desc} members={teamData.members} />
						</article>
					</div>
				)}
            </main>
        </div>
	);
}