import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";

// Components & UI
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const neuCardVariants = cva(
	"neu-concave-md grid grid-rows-[auto_1fr] overflow-hidden",
	{
		variants: {
			axis: {
				x: "md:grid-cols-[auto_1fr]",
				y: "",
			},
			size: {
				sm: "rounded-[2rem]",
				md: "rounded-[4rem]",
			},
		},
		defaultVariants: {
			axis: "x",
			size: "md",
		},
	}
)



export function NeuCard({
	className,
	size = "md",
	axis = "x",
	imgSrc,
	imgAlt,
	title,
	description,
	badge,
	content,
	footer,
	link,
	autoHideImg = false,
	centerHeader = true,
	contain = false,
	gradient = true,
	lineClamp = false,
	showBadge = false,
	showDesc = false,
}) {
	return (
		<Card className={cn(neuCardVariants({ axis, size, className }))}>
			{/* Image */}
			<div className={`relative mx-auto ${autoHideImg ? "hidden md:block" : ""}`}>
				<Image
					src={imgSrc}
					alt={imgAlt}
					className={`h-full aspect-3/2 ${contain ? "object-contain" : "object-cover"} ${axis === "x" ? "md:max-w-sm md:aspect-square" : ""}`}
				/>
				{showBadge && badge && <Badge className="absolute bottom-0 left-0 flex items-center m-4" variant="secondary">{badge}</Badge>}
				{/* <span className="absolute neu-concave-sm left-1/2 bottom-0 px-2 py-1 rounded-full -translate-x-1/2 translate-y-1/2">AAA Test</span> */}
			</div>

			{/* Text */}
			<div className="grid grid-rows-[auto_1fr_auto]">
				<CardHeader className={`${centerHeader ? "items-center" : ""} ${axis === "x" ? "md:items-start" : ""}`}>
					<CardTitle className={`${gradient ? "text-primary-gradient" : ""}`}>{title}</CardTitle>
					{showDesc && description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
				<CardContent>
					<MarkdownParagraph className={`${lineClamp ? "line-clamp-5" : ""}`} content={content} />
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

export const VIEW_MORE = "查看更多";