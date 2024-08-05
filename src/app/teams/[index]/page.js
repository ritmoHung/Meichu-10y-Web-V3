"use client";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import TeamHeader from "@/components/main/team/team-header";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { Skeleton } from "@/components/ui/skeleton";



export default function TeamPage({ params }) {
	const { data, isLoading, error } = useSWR(params.index ? `/api/teams/${params.index}` : null, fetcher);

	if (isLoading) return <Skeleton />;
	if (error) return <div>Error</div>;

	return (
        <div className="">
			<TeamHeader coverImgUrl={data.cover_img_url} title={data.title} year={data.year} group={data.group} teamName={data.team_name} email={data.email} related_urls={data.related_urls} tags={data.tags} />
			<main>
				<div className="wrapper-md">
					<article className="grid gap-y-18 py-12">
						<IntroductionSection introduction={data.introduction} />
						<TeamDescSection teamDesc={data.teamDesc} members={data.members} />
					</article>
				</div>
            </main>
        </div>
	);
}

function IntroductionSection({ className, introduction }) {
	return (
		<TeamSection className={`${className}`}>
			<h2 className="whitespace-nowrap">作品介紹</h2>
			<div>
				<MarkdownParagraph content={introduction} />
			</div>
		</TeamSection>
	);
}

function TeamDescSection({ className, teamDesc, members }) {
	return (
		<TeamSection className={`${className}`}>
			<h2 className="whitespace-nowrap">隊伍介紹</h2>
			<div>
				{/* <MarkdownParagraph content={members} /> */}
			</div>
		</TeamSection>
	);
}

function TeamSection({ className, children }) {
	return (
		<section className={`grid gap-3 md:grid-cols-[10rem,_1fr] lg:grid-cols-[16rem,_1fr] xl:grid-cols-[24rem,_1fr] ${className}`}>
			{children}
		</section>
	);
}