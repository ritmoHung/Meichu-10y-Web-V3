"use client";
import { useState } from "react";
import Image from "next/image";
import HomepageBG from "/public/imgs/homepage/bg.svg";

// Components & UI
import { AboutUsSec, TeamSec, QnaSec } from "@/components/main/homepage/sections";



export default function Home() {
    const [aboutUsInView, setAboutUsInView] = useState(false);
    const [teamInView, setTeamInView] = useState(false);
    const [qnaInView, setQnaInView] = useState(false);

	return (
		<div>
			<header className="grid h-[max(90svh,_24rem)] md:h-[max(80svh,_24rem)]">
				<Headings className="justify-self-center md:justify-self-start
                                md:ml-20 lg:ml-32 xl:ml-40" />
                <BannerFilter className={`fixed w-screen h-full -top-1/2 md:top-0 md:-left-2/4 -z-1`} />
			</header>

			<main>
				<article className="grid">
					<AboutUsSec setInView={setAboutUsInView} />
                    <TeamSec setInView={setTeamInView} />
                    <QnaSec setInView={setQnaInView} />
				</article>
			</main>

            <BannerImg aboutUsInView={aboutUsInView} teamInView={teamInView} qnaInView={qnaInView} />
		</div>
	);
}

function Headings({ className }) {
	return (
		<div className={`${className} grid max-w-min self-center justify-items-center gap-y-[1em] px-6`}>
			<h1 className="bracket bracket-md sm:bracket-lg w-max text-[3em] font-black">
				<span className="text-[0.875em] sm:text-[1em]">
					梅竹黑客松<br />
					<span className="text-primary-gradient">成果存放</span>
					平台
				</span>
			</h1>
			<p className="px-2">
				在梅竹黑客松邁向十週年之際，我們決定以一個嶄新的方式，紀念過去十年走過的足跡。透過存放往年的優秀作品，我們能夠回顧並學習，同時讓未來的參與者能夠在此找尋與迸發創意。
			</p>
		</div>
	);
}

function BannerFilter({ className }) {
	return (
		<div className={`${className} banner-filter skew-x-0 -skew-y-30 md:-skew-x-30 md:skew-y-0`}></div>
	);
}

function BannerImg({ aboutUsInView, teamInView, qnaInView }) {
    let x = 17.5, y = 12.5;
    if(qnaInView) {
        x = 70;
        y = -10;
    }
    else if(teamInView) {
        x = -60;
        y = -60;
    }
    else if(aboutUsInView) {
        x = 60;
        y = 30;
    }

    return (
        <div className="grid fixed inset-0 place-content-center -z-2
                        transition-all ease-out-quint duration-1000 motion-reduce:duration-300"
             style={{transform: `translate(${x}%, ${y}%)`}}>
            <Image
                src={HomepageBG}
                alt="Concept art of this website"
                className="max-w-none max-h-none scale-300 select-none"
                priority
            />
        </div>
    );
}