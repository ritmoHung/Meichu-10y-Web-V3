import fetcher from "@/lib/fetcher";
import { getBaseUrl } from "@/lib/utils";

// Metadata
export async function generateMetadata({ params }) {
	const baseUrl = getBaseUrl();
	const data = await fetcher(`${baseUrl}/api/teams/${params.index}?summary_only=true`);
	const teamData = data?.data || {};

	const title = teamData?.title ?? "";
	const description = teamData?.introduction ?? "";
	const url = `${baseUrl}/teams/${params.index}`;

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
}



export default function TeamLayout({ children }) {
	return children;
}