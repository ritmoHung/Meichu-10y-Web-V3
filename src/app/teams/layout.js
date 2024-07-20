// Metadata
const title = "歷屆作品";
// TODO: Decide description
const description = "歷屆作品。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/teams`;
export const metadata = {
    title: {
        default: title,
        template: "歷屆作品 | %s",
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
    return (
        <div className="wrapper-md mt-4 mb-16 md:mt-10">
            {children}
        </div>
    );
}