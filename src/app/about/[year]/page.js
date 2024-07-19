"use client";
import Image from "next/image";
import Hacker from "/public/imgs/about/hacker.svg";
import Maker from "/public/imgs/about/maker.svg";
import Idea from "/public/imgs/about/idea.svg";
// TODO: Real company logos or not?
import CompanyTemp from "/public/imgs/deco/company_temp.svg"

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// Components & UI
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { NeuCard } from "@/components/main/common/card";
import { Skeleton } from "@/components/ui/skeleton";



export default function YearPage({ params }) {
	// TODO: Skeleton loading
    const { data, isLoading, error } = useSWR(params.year ? `/api/about/${params.year}` : null, fetcher);

	return (
		<div>
			<header className="mb-4">
				<Banner year={params.year} bannerUrl={data?.data.bannerUrl} />
				<div className="wrapper-md">
					<h1 className="bracket bracket-md">
						{params.year}
						<span className="hidden sm:inline"> 梅竹黑客松</span>
					</h1>
				</div>
			</header>
            <main>
				{data?.data && (
					<article className="grid gap-y-32 [&_h2]:mb-16">
						<section id="year-description" className="wrapper-md">
							<MarkdownParagraph content={data.data.description} />
						</section>

						<Competition competition={data.data.competition} />

						<Scenes scenes={data.data.scenes} params={params} />

						<Topics topics={data.data.topics} />

						<Sponsors sponsors={data.data.sponsors} />

						<Staffs year={params.year} logoUrl={data.data.logoUrl} staffs={data.data.staffs} />
					</article>
				)}
            </main>
		</div>
	);
}

function Banner({ year, bannerUrl }) {
	return (
        <div className="flex h-48 md:h-72 xl:h-80 overflow-hidden mb-8">
            {bannerUrl ? (
                <Image
                    src={bannerUrl}
                    alt={`Banner image of ${year} Meichu Hackathon`}
                    className="w-screen object-cover"
					width={1920} height={1280}
                    quality={100}
                    priority
                />
			) : (
				<Skeleton className="w-screen h-full" />
			)}
        </div>
	);
}

function Competition({ competition }) {
    function getImgFromType(type) {
        switch (type) {
            case "hacker":
                return Hacker;
            case "maker":
                return Maker;
            case "idea":
                return Idea;
            default:
                return Hacker;
        }
    }

    return (
        <section id="year-competition" className="wrapper-md">
            <h2 className="whitespace-nowrap">賽制介紹</h2>
            <div className="grid justify-center gap-y-8 lg:grid-flow-col lg:gap-x-16 xl:gap-x-32">
                {competition.systems.map((system, index) => (
					<NeuCard
						key={index}
						className="max-w-xs"
						axis="y"
						imgSrc={getImgFromType(system.type)}
						imgAlt=""
						title={system.title}
						content={system.description}
						contain
					/>
                ))}
            </div>
        </section>
    );
}

function Scenes({ scenes }) {
	return (
        <section id="year-scenes">
            <div className="wrapper-md">
                <h2 className="whitespace-nowrap">活動實況</h2>
            </div>
            <div className="grid md:flex md:justify-between py-12 bg-primary-foreground">
                <div className="wrapper-md md:grid-flow-col auto-cols-fr gap-16">
                    <p className="text-primary-invert whitespace-pre-line">
                        {scenes.description}
                    </p>
                    {/* <div className="translate-y-240"><ImageSlider slides={slides} contain /></div> */}
                </div>
            </div>
        </section>
	);
}

function Topics({ topics }) {
    return (
        <section id="year-topics" className="wrapper-md">
            <h2 className="whitespace-nowrap">出題介紹</h2>
            <ul className="grid gap-16">
                {topics.map((topic, index) => (
                    <li key={index}>
						<NeuCard
							imgSrc={CompanyTemp}
							imgAlt=""
							title={topic.company}
							content={(topic.title ? `#### 主題\n${topic.title}\n\n` : "") + `#### 說明\n${topic.description}`}
							footer={topic.pdf ? "查看 PDF" : ""}
							link={topic.pdf}
							autoHideImg
							contain
						/>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Sponsors({ sponsors }) {
    return (
        <section id="year-sponsors" className="wrapper-md">
            <h2 className="whitespace-nowrap">贊助企業</h2>
            <div className="grid lg:grid-cols-2 gap-8">
                {sponsors.map((sponsor, index) => (
                    <ul key={index} className="grid auto-rows-min gap-2">
                        <h3>{sponsor.group}</h3>
                        <li className="flex flex-wrap">
                            {sponsor.companies.map((company, index) => (
                                <span key={index} className="whitespace-nowrap">
                                    {company}
                                    {(index !== sponsor.companies.length - 1) && "、"}
                                </span>
                            ))}
                        </li>
                    </ul>
                ))}
            </div>
        </section>
    );
}

function Staffs({ year, logoUrl, staffs }) {
    return (
        <section id="year-staff" className="wrapper-md">
            <h2 className="whitespace-nowrap">工作人員</h2>
            {logoUrl && (
                <div className="flex justify-between h-18 mb-8">
                    <Image
                        src={logoUrl}
                        alt={`Logo of ${year} Meichu Hackathon`}
                        className="w-min object-contain rounded-lg"
						width={288} height={72}
                        quality={100}
                    />
                </div>
            )}
            <div className="grid lg:grid-cols-2 gap-8">
                {staffs.map((staff, index) => (
                    <ul key={index} className="grid auto-rows-min gap-2">
                        <h3>{staff.dept}</h3>
                        <li className="flex flex-wrap">
                            {staff.members.map((member, index) => (
                                <span key={index} className="whitespace-nowrap">
                                    {member}
                                    {(index !== staff.members.length - 1) && "\u00A0/\u00A0"}
                                </span>
                            ))}
                        </li>
                    </ul>
                ))}
            </div>
        </section>
    );
}