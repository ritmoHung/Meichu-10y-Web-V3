import fetcher from "@/lib/fetcher";
import { getBaseUrl } from "@/lib/utils";

// Metadata
export async function generateMetadata({ params }) {
	const baseUrl = getBaseUrl();
	const data = await fetcher(`${baseUrl}/api/about/${params.year}?summary_only=true`);
	const yearData = data?.data || {};

	const title = `${params.year}`;
	const description = yearData?.summary ?? "";
	const url = `${baseUrl}/about/${params.year}`;

	return {
        title,
        description,
		openGraph: {
			title: `關於 ${title} 梅竹黑客松`,
			description,
			url,
			// images: [], // TODO: Get image from Firebase Storage
		},
		twitter: {
			card: "summary_large_image",
			title: `關於 ${title} 梅竹黑客松`,
			description,
		},
	};
}



export default function YearLayout({ children }) {
    return children;
}