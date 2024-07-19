import { fetcher } from "@/lib/fetcher";

// Metadata
export async function generateMetadata({ params }) {
	const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://localhost:2023"
	const yearData = await fetcher(`${baseUrl}/api/about/${params.year}?summary_only=true`);

	const title = `${params.year}`;
	const description = yearData?.data?.summary || "在這個頁面中，我們會介紹梅竹黑客松的競賽精神與意義，簡單總結過去各年度的活動內容、賽制與工作人員，並以時間軸的方式呈現每年的特點或制度創新。";
	const url = `${baseUrl}/about`;

	return {
        title,
        description,
		openGraph: {
			title,
			description,
			url,
			// images: [], // TODO: Get image from Firebase Storage
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}



export default function YearLayout({ children }) {
    return children;
}