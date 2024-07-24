"use client";
import { useState } from "react";
import Link from "next/link";
// TODO: Remove temporary images
import Nene from "/public/imgs/luna.webp";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import { NeuCard } from "@/components/main/common/card";
import { NeuPagination } from "@/components/main/common/pagination";
import { Skeleton } from "@/components/ui/skeleton";



export default function TeamList() {
	const { data, isLoading, error } = useSWR("/api/teams", fetcher);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentData = data?.data.slice(startIndex, endIndex);

	return (
		<div>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 py-16 justify-items-center place-items-stretch">
				{!error && (
					isLoading ? (
						Array.from({ length: 6 }).map((_, index) => (
							<Skeleton key={index} className="w-full h-[36rem] rounded-[2rem]" />
						))
					) : (
						currentData && currentData.map(team => (
							<li key={team.id}>
								<Link href={`/teams/${team.index}`}>
									<NeuCard
										className="h-full active:neu-pressed-md"
										size="sm"
										axis="y"
										imgSrc={team.cover_img_url || Nene}
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
							</li>
						))
					)
				)}
			</ul>
			{data?.data.length > 0 && (
				<NeuPagination
					totalItems={data.data.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
}