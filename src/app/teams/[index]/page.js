"use client";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import Anchor from "@/components/main/common/anchor";
import TeamHeader from "@/components/main/team/team-header";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { Skeleton } from "@/components/ui/skeleton";

// Icon & Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";



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
						<IntroductionSection introduction={teamData.introduction} />
						<TeamDescSection teamDesc={teamData.team_desc} members={teamData.members} />
					</article>
				</div>
            </main>
        </>
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

function TeamDescSection({ className, teamDesc, members = [] }) {
	return (
		<TeamSection className={`${className}`}>
			<h2 className="whitespace-nowrap">隊伍介紹</h2>
			<div>
				<MarkdownParagraph content={teamDesc} />
				<h3 className="mb-2">成員</h3>
				<div className="grid gap-4">
					{members.map((member, index) => (
						<div key={index}>
							<h4>
								{member.name}
								{member?.email && (
									<Anchor href={`mailto:${member.email}`} className="ml-2">
										<FontAwesomeIcon icon={faEnvelope} />
									</Anchor>
								)}
							</h4>
							{member?.thoughts && (
								<MarkdownParagraph content={member.thoughts} />
							)}
						</div>
					))}
				</div>
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