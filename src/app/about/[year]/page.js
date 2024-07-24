"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Hacker from "/public/imgs/about/hacker.svg";
import Maker from "/public/imgs/about/maker.svg";
import Idea from "/public/imgs/about/idea.svg";
// TODO: Real company logos or not?
import CompanyTemp from "/public/imgs/deco/company_temp.svg";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { NeuCard } from "@/components/main/common/card";
import { Skeleton } from "@/components/ui/skeleton";

// Lucide Icon
import { Maximize } from "lucide-react";



export default function YearPage({ params }) {
	// TODO: Skeleton loading; year range protection
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
					<article className="grid gap-y-32 [&_h2]:mb-12">
						{data.data?.description && (
							<section id="year-description" className="wrapper-md">
								<MarkdownParagraph content={data.data?.description} />
							</section>
						)}

						{data.data?.competition && <Competition competition={data.data.competition} />}

						{data.data?.scenes && <Scenes scenes={data.data.scenes} />}

						{data.data?.topics && <Topics topics={data.data.topics} />}

						{data.data?.sponsors && <Sponsors sponsors={data.data.sponsors} />}

						{data.data?.staffs && <Staffs year={params.year} logoUrl={data.data?.logoUrl} staffs={data.data.staffs} />}
					</article>
				)}
            </main>
		</div>
	);
}

function Banner({ year, bannerUrl }) {
	const [loaded, setLoaded] = useState(false);

	return (
        <div className="relative flex h-48 md:h-72 xl:h-80 mb-8">
            {bannerUrl && (
                <Image
                    src={bannerUrl}
                    alt={`Banner image of ${year} Meichu Hackathon`}
                    className={`w-screen object-cover ${loaded ? "opacity-100" : "opacity-0"} transition-opacity`}
					width={1920} height={1280}
                    quality={100}
                    priority
					onLoad={() => setLoaded(true)}
                />
			)}
			{!loaded && <Skeleton className="absolute top-0 left-0 w-screen h-full" />}
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
                {competition?.systems && competition.systems.map((system, index) => (
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

// TODO: Stop carousel autoplay when dialog is opened
function Scenes({ scenes }) {
	const [api, setApi] = useState();
	const [count, setCount] = useState(0);
	const [current, setCurrent] = useState(0);

	const carouselOptions = {
		align: "center",
		loop: true,
		skipSnaps: true,
	};

	const autoplayOptions = {
		delay: 6000,
		stopOnInteraction: false,
		stopOnMouseEnter: true,
	};

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		})
	}, [api]);

	return (
        <section id="year-scenes">
            <div className="wrapper-md">
                <h2 className="whitespace-nowrap">活動實況</h2>
            </div>
            <div className="grid md:flex md:justify-between py-12 bg-zinc-50 dark:bg-zinc-900">
                <div className="wrapper-md md:grid-flow-col auto-cols-fr gap-16">
					<article>
						<MarkdownParagraph content={scenes.description} />
					</article>
					<Dialog>
						{/* Carousel */}
						<Carousel opts={carouselOptions} setApi={setApi} className="mb-8 md:mb-0" plugins={[Autoplay(autoplayOptions)]}>
							{/* Carousel Content */}
							<CarouselContent>
								{scenes.imgUrls && scenes.imgUrls.length > 0 && scenes.imgUrls.map((url, index) => (
									<CarouselItem key={index} className="basis-full flex justify-center aspect-video">
										<Image
											src={url}
											alt={`Event image ${index + 1}`}
											className="object-cover"
											width={960} height={540}
											quality={80}
										/>
									</CarouselItem>
								))}
							</CarouselContent>

							{/* Carousel Control */}
							<div className="absolute bottom-0 right-6 flex items-center gap-x-4 translate-y-1/2">
								<DialogTrigger className="flex items-center justify-center size-10 p-1 bg-primary rounded-full shadow-lg [&_>_svg]:disabled:opacity-50"
											   disabled={!scenes.imgUrls || scenes.imgUrls.length === 0}>
									<Maximize className="size-4" />
								</DialogTrigger>
								<div className="flex items-center gap-x-3 p-1 bg-primary rounded-full shadow-lg">
									<CarouselPrevious className="!static !translate-y-0" />
									<span className="w-4 font-bold text-center">{current}</span>
									<CarouselNext className="!static !translate-y-0" />
								</div>
							</div>
						</Carousel>

						{/* Image Dialog Content */}
						<DialogContent className="justify-items-center max-w-7xl">
							<DialogHeader>
								<DialogTitle>
									{`活動照片 ${current}`}
								</DialogTitle>
								<DialogDescription>
									<Image
										src={scenes.imgUrls[current - 1]}
										alt={`Event image ${current}`}
										className="object-contain rounded-md"
										width={1920} height={1080}
										quality={100}
									/>
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
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
                            {sponsor?.companies && sponsor.companies.map((company, index) => (
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
                            {staff?.members && staff.members.map((member, index) => (
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