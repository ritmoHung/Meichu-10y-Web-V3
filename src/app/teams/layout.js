// Metadata
const title = "歷屆作品";
// TODO: Decide description
const description = "歷屆作品。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/teams`;
export const metadata = {
    title: {
        default: title,
        template: "%s | 歷屆作品",
    },
    description,
    openGraph: {
        title,
        description,
        url,
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
}



export default function TeamsLayout({ children }) {
    return children;
}