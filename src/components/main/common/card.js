import Image from "next/image";
import Link from "next/link";

// Components & UI
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { Button } from "@/components/ui/button";

export const VIEW_MORE = "查看更多";



export function NeuCard({ className, axis = "x", imgSrc, imgAlt, title, content, footer, link, autoHideImg = false, contain = false, gradient = true }) {
	return (
		<Card className={`md:justify-self-start grid ${!autoHideImg ? "grid-rows-[auto_1fr]" : ""} ${axis === "x" ? "md:grid-cols-[auto_1fr]" : ""} ${className}`}>
			{/* Image */}
			<div className={`mx-auto ${autoHideImg ? "hidden md:block" : ""}`}>
				<Image
					src={imgSrc}
					alt={imgAlt}
					className={`h-full aspect-5/4 ${contain ? "object-contain" : "object-cover"} rounded-tl-[4rem] rounded-tr-[4rem]
								${axis === "x" ? "md:max-w-sm md:rounded-tr-none md:rounded-bl-[4rem] md:aspect-square" : ""}`}
				/>
			</div>

			{/* Text */}
			<div className="grid grid-rows-[auto_1fr_auto]">
				<CardHeader className={`items-center ${axis === "x" ? "md:items-start" : ""}`}>
					<CardTitle className={`${gradient ? "text-primary-gradient" : ""}`}>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<MarkdownParagraph content={content} />
				</CardContent>
				{footer && (
					<CardFooter className="justify-end">
						<Button variant="link" asChild>
							{link.startsWith("https://") ? (
								<a href={link} className="!text-accent" target="_blank" rel="noreferrer noopener">
									{footer}
								</a>
							) : (
								<Link href={link} className="!text-accent">
									{footer}
								</Link>
							)}
						</Button>
					</CardFooter>
				)}
			</div>
		</Card>
	);
}