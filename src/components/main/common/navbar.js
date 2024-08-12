"use client";
import { useState, useEffect, useRef } from "react";
import { throttle } from "lodash-es";
import Link from "next/link";

// Components & UI
import { ThemeToggle } from "@/components/main/common/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

// Lucide Icon
import { House, Library, MessagesSquare, Users } from "lucide-react";

const links = [
	{
		name: "首頁",
		href: "/",
		icon: <House className="size-[1.2rem]" />,
	},
	{
		name: "關於我們",
		href: "/about",
		icon: <Library className="size-[1.2rem]" />,
	},
	{
		name: "歷屆作品",
		href: "/teams",
		icon: <Users className="size-[1.2rem]" />,
	},
	{
		name: "Q & A",
		href: "/qna",
		icon: <MessagesSquare className="size-[1.2rem]" />,
	},
];



export default function Navbar() {
	const ref = useRef(null);
	const [isPinned, setIsPinned] = useState(false);
	
	const handleScroll = throttle(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setIsPinned(rect.top < 0);
		}
	}, 100);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);
	
	return (
        <NavigationMenu ref={ref} className={`${isPinned ? "neu-concave-sm" : ""} sticky -top-px justify-between gap-4 md:mt-[clamp(0px,_16vh_-_6rem,_3rem)] px-6 py-4 transition-box-shadow`}>
			<NavigationMenuList className="p-2 md:ml-20 lg:ml-32 xl:ml-40">
				<TooltipProvider delayDuration={500}>
					<NavigationLinks links={links} />
				</TooltipProvider>
			</NavigationMenuList>
			<NavigationMenuList className="md:mr-20 lg:mr-32">
				<ThemeToggle />
			</NavigationMenuList>
		</NavigationMenu>
    );
}

function NavigationLinks({ links }) {
	return (
		<>
			{links.map((link, index) => (
				<NavigationMenuItem key={index}>
					<Link href={link.href} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							<div className="md:hidden">
								<Tooltip>
									<TooltipTrigger asChild>{link.icon}</TooltipTrigger>
									<TooltipContent side="bottom" sideOffset={12}>{link.name}</TooltipContent>
								</Tooltip>
							</div>
							<span className="hidden md:inline">{link.name}</span>
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			))}
		</>
	);
}