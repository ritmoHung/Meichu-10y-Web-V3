"use client";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
// TODO: Remove temporary images
import Nene from "/public/imgs/luna.webp";

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// Components & UI
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NeuCard, VIEW_MORE } from "@/components/main/common/card";



export function InViewSec({ className, setInView, children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: 0.5
    });

    useEffect(() => {
        setInView(isInView);
    }, [isInView, setInView]);

    return (
        <section ref={ref} className={`${className} place-items-center min-h-svh`}>
            {children}
        </section>
    );
}



export function AboutUsSec({ setInView }) {
    const title = "關於我們";
    const content = "透過回顧與紀念歷史，我們才能帶著更多經驗與力量走向未來。在這個頁面中，我們會介紹梅竹黑客松的競賽精神與意義，簡單總結過去各年度的活動內容、賽制與工作人員，並以時間軸的方式呈現每年的特點或制度創新。藉由紀錄歷屆活動的內容，檢視相異年度的變革，我們能夠吸取並傳承過去的精髓，同時思索與探尋未來的無限可能。";

    return (
        <InViewSec className="wrapper-md" setInView={setInView}>
			<NeuCard className="md:justify-self-start max-w-sm md:max-w-4xl" imgSrc={Nene} imgAlt="" title={title} content={content} footer={VIEW_MORE} link="/about" />
        </InViewSec>
    );
}



export function TeamSec({ setInView }) {
	// TODO: Skeleton loading
    const { data, isLoading, error } = useSWR("/api/about", fetcher);

	const options = {
		align: "center",
		skipSnaps: true,
	}

    return (
        <InViewSec className="wrapper-lg" setInView={setInView}>
			<Carousel opts={options} className="w-7/8 xl:w-2/3 xl:justify-self-end xl:me-8 hover:cursor-grab active:cursor-grabbing">
				<CarouselContent className="p-8">
					{data?.data.length > 0 && data?.data.map((year, index) => (
						<CarouselItem key={index} className="basis-full lg:basis-1/2 3xl:basis-1/3 px-8 grid place-items-center">
							<NeuCard
								className="select-none"
								axis="y"
								imgSrc={Nene}
								imgAlt=""
								title={year.year}
								content={year.summary}
								footer={VIEW_MORE}
								link={`/about/${year.year}`}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
        </InViewSec>
    );
}



export function QnaSec({ setInView }) {
    const title = "Q & A";
    const content = "在這個頁面之中，我們會將大家的問題一併答覆，你可以根據熱門標籤或是直接搜尋問題關鍵字，解決自己的疑惑。";

    return (
        <InViewSec className="wrapper-md" setInView={setInView}>
			<NeuCard className="md:justify-self-start max-w-sm md:max-w-4xl" imgSrc={Nene} imgAlt="" title={title} content={content} footer={VIEW_MORE} link="/qna" />
        </InViewSec>
    );
}