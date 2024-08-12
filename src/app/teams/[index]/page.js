"use client";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import TeamHeader from "@/components/main/team/team-header";
import { DescSection, IntroSection } from "@/components/main/team/team-sections";
import { Skeleton } from "@/components/ui/skeleton";



export default function TeamPage({ params }) {
	const { data, isLoading, error } = useSWR(params.index ? `/api/teams/${params.index}` : null, fetcher);
	const teamData = data?.data || {};

	// TODO: New skeletons
	if (isLoading) return <Skeleton />;
	if (error) return <div>Error</div>;

	return (
        <>
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
			<main>
				<div className="wrapper-md">
					<article className="grid gap-y-18 py-12">
						<IntroSection introduction={teamData.introduction} />
						<DescSection teamDesc={teamData.team_desc} members={teamData.members} />
					</article>
				</div>
            </main>
        </>
	);
}