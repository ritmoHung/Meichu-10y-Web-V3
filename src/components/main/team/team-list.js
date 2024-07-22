"use client";
import Link from "next/link";
// TODO: Remove temporary images
import Nene from "/public/imgs/luna.webp";

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// Components & UI
import { NeuCard } from "@/components/main/common/card";



export default function TeamList() {
	// TODO: Skeleton loading
	const { data, isLoading, error } = useSWR("/api/teams", fetcher);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 py-16 justify-items-center place-items-stretch">
				{data?.data.length > 0 && data.data.map(team => (
					<Link key={team.id} href={`/teams/${team.index}`}>
						<NeuCard
							className="h-full active:neu-pressed-md"
							size="sm"
							axis="y"
							imgSrc={Nene}
							imgAlt=""
							title={team.title}
							description={team.team_name}
							badge={`${team.year} ${team.group}`}
							content={team.introduction}
							centerHeader={false}
							lineClamp
							showBadge
							showDesc
						/>
					</Link>
				))}
			</div>
		</div>
	);
}