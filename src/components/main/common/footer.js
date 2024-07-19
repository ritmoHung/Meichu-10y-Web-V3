// Components & UI
import { Button } from "@/components/ui/button";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

const links = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/HackMeiChu",
		icon: <FontAwesomeIcon icon={faFacebook} />,
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/mc_hackathon",
		icon: <FontAwesomeIcon icon={faInstagram} />,
	},
	{
		name: "Mail",
		href: "mailto:mchackathon2024@gmail.com",
		icon: <FontAwesomeIcon icon={faEnvelope} />,
	}
];



export default function Footer() {
	return (
		<footer className="bg-zinc-50 dark:bg-zinc-900">
			<div className="grid place-items-center gap-y-2 p-8">
				<FooterLinks links={links} />
                <span className="text-300">Copyright © 2023 Meichu Hackathon. All rights reserved</span>
            </div>
		</footer>
	);
}

function FooterLinks({ links }) {
	return (
		<div className="flex gap-x-6">
			{links.map((link, index) => (
				<Button key={index} className="footer-link" data-name={link.name} variant="ghost" asChild>
					<a id={`link-${link.name.toLowerCase()}`} href={link.href} aria-label={link.name} target="_blank" rel="noreferrer noopener">
						{link.icon}
					</a>
				</Button>
			))}
		</div>
	);
}