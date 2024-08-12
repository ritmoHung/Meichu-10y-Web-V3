// Components & UI
import Anchor from "@/components/main/common/anchor";
import { MarkdownParagraph } from "@/components/main/common/paragraph";
import { Skeleton } from "@/components/ui/skeleton";

// Icon & Images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";



export function IntroSection({ className = "", introduction }) {
	return (
		<TeamSection className={`${className}`}>
			<h2 className="whitespace-nowrap">作品介紹</h2>
			<div>
				<MarkdownParagraph content={introduction} />
			</div>
		</TeamSection>
	);
}

export function DescSection({ className = "", teamDesc, members = [] }) {
	return (
		<TeamSection className={`${className}`}>
			<h2 className="whitespace-nowrap">隊伍介紹</h2>
			<div>
				<MarkdownParagraph content={teamDesc} />
				<h3 className="mb-2">成員</h3>
				<div className="grid gap-4">
					{members.map((member, index) => (
						<div key={index}>
							<h4>
								<FontAwesomeIcon icon={faUser} className="mr-1" />
								{member.name}
								{member?.email && (
									<Anchor href={`mailto:${member.email}`} className="ml-2">
										<FontAwesomeIcon icon={faEnvelope} />
									</Anchor>
								)}
							</h4>
							{member?.thoughts && (
								<MarkdownParagraph content={member.thoughts} />
							)}
						</div>
					))}
				</div>
			</div>
		</TeamSection>
	);
}

function TeamSection({ className, children }) {
	return (
		<section className={`grid gap-3 md:grid-cols-[10rem,_1fr] lg:grid-cols-[16rem,_1fr] xl:grid-cols-[24rem,_1fr] ${className}`}>
			{children}
		</section>
	);
}