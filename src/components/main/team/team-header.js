import Image from "next/image";

// Components & UI
import Anchor from "@/components/main/common/anchor";

// Icon & Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFigma, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faEye, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";



export default function TeamHeader({ className, coverImgUrl, title, year, group, teamName, email, related_urls = [], tags = [] }) {
	return (
		<header className={`w-screen ${className}`}>
			<div className="relative py-6 isolate">
				{/* Information */}
				<TeamInformation title={title} teamName={teamName} year={year} group={group} email={email} related_urls={related_urls} />

				{/* Gradient Overlay */}
				<GradientOverlay className="absolute top-0 left-0 w-full h-full -z-1" />

				{/* Cover Image */}
                <Image
                    src={coverImgUrl}
                    alt={`Cover image of ${title}`}
                    className={`absolute top-0 right-0 h-full object-cover opacity-40 -z-2`}
					width={1920} height={640} 
                    quality={100}
                    priority
                />
			</div>

			<TeamAside tags={tags} />
		</header>
	);
}

function TeamInformation({ title, teamName, year, group, email, related_urls }) {
	return (
		<div className="wrapper-md gap-2"> 
			{/* Titles */}
			<h1 className="text-800">{title}</h1>
			<span className="font-medium text-600">{teamName} ｜ {year} {group}</span>

			{/* URLs */}
			<div className="grid">
				<Anchor href={`mailto:${email}`}>
					<FontAwesomeIcon icon={faEnvelope} />
					<span className="ml-2">{email}</span>
				</Anchor>
				{related_urls.map((url, index) => {
					const resolvedUrl = resolveUrl(url);
					return (		
						<Anchor key={index} href={url}>
							<FontAwesomeIcon icon={resolvedUrl.icon} />
							<span className="ml-2">{resolvedUrl.urlText}</span>
						</Anchor>
					);
				})}
			</div>
		</div>
	);
}

function GradientOverlay({ className }) {
	return (
		<div className={`bg-gradient-135 from-[#ECECEC] dark:from-primary md:from-25% backdrop-blur-md ${className}`}></div>
	);
}

function TeamAside({ className, tags }) {
	return (
		<aside className={`bg-secondary ${className}`}>
			<div className="wrapper-md gap-2 py-4">
				<div className="flex items-center justify-between">
					{/* Tags */}
					<div className="flex items-center gap-x-4">
						{tags.map((tag, index) => (
							<span key={index}>#{tag}</span>
						))}
					</div>

					{/* Views & Comments */}
					<div className="hidden md:flex items-center gap-x-4">
						<span>
							<FontAwesomeIcon icon={faEye} className="mr-2"/>
							{3357}
						</span>
						<span>
							<FontAwesomeIcon icon={faMessage} className="mr-2" />
							{9}
						</span>
					</div>
				</div>
			</div>
		</aside>
	);
}

function resolveUrl(url) {
	const FIGMA_URL = "https://www.figma.com";
	const GITHUB_URL = "https://github.com";
	let icon, urlText;

	if (url.startsWith(FIGMA_URL)) {
		icon = faFigma;
		urlText = new URL(url).pathname.split("/").pop();
	} else if (url.startsWith(GITHUB_URL)) {
		icon = faGithub;
		urlText = url.replace(`${GITHUB_URL}/`, "");
	} else {
		icon = faLink;
		urlText = url.replace("https://", "");
	}

	return { icon, urlText };
}