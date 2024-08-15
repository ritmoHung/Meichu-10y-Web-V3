import { notFound } from "next/navigation";
import fetcher from "@/lib/fetcher";
import { getBaseUrl } from "@/lib/utils";

// Metadata
export async function generateMetadata({ params }) {
	try {
		const baseUrl = getBaseUrl();
		const data = await fetcher(`${baseUrl}/api/teams/${params.teamId}?summary_only=true`);
		const teamData = data?.data || {};
	
		const title = teamData?.title ?? "";
		const description = teamData?.introduction ?? "";
		const url = `${baseUrl}/teams/${params.teamId}`;
	
		return {
			title,
			description,
			openGraph: {
				title: `${title} | 歷屆作品`,
				description,
				url,
				// images: [], // TODO: Get image from Firebase Storage
			},
			twitter: {
				card: "summary_large_image",
				title: `${title} | 歷屆作品`,
				description,
			},
		};
	} catch (error) {
		if (error.status === 404) notFound();
	}
}



export default function TeamLayout({ children }) {
	return children;
}