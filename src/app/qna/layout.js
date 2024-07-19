// Metadata
const title = "常見問題";
const description = "在這個頁面之中，我們會將大家的問題一併答覆，你可以根據熱門標籤或是直接搜尋問題關鍵字，解決自己的疑惑。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/qna`;
export const metadata = {
    title,
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



export default function QnaLayout({ children }) {
    return (
        <div className="wrapper-md my-16 petite:my-16 md:mt-10">
            {children}
        </div>
    );
}