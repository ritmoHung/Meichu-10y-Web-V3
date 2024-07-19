"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Components & UI
import { ThemeToggle } from "@/components/main/common/theme-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const links = [
	{ name: "首頁", href: "/" },
	{ name: "關於我們", href: "/about" },
	{ name: "歷年作品", href: "/teams" },
	{ name: "Q & A", href: "/qna" },
];



export default function Navbar() {
	const ref = useRef(null);
	const [isPinned, setIsPinned] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsPinned(entry.intersectionRatio < 1);
			},
			{ threshold: [1] }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return (() => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		})
	}, []);
	
	return (
        <NavigationMenu ref={ref} className={`${isPinned ? "neu-concave-sm" : ""} sticky -top-px justify-between md:mt-[min(7vh,_4rem)] petite:mt-0 px-6 py-4`}>
			<NavigationMenuList className="p-2 md:ml-20 lg:ml-32 xl:ml-40 hidden md:flex">
				<NavigationLinks links={links} />
			</NavigationMenuList>
			<NavigationMenuList className="p-2">
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
							{link.name}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			))}
		</>
	);
}