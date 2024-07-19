import "styles/map.scss";

// Fonts
import localFont from "next/font/local";
const sourceHansSerif = localFont({
    src: [
        {
            path: "../fonts/SourceHanSerifTW-R.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/SourceHanSerifTW-B.otf",
            weight: "700",
            style: "normal"
        }
    ],
    display: "swap",
	variable: "--font-source-hans-serif",
});

// Metadata
const title = "會場地圖";
const description = "在這個頁面中，我們會展示梅竹黑客松的場地圖。但是只有 2023 的。";
const url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/map`;
export const metadata = {
    title: {
        default: title,
        template: "%s 梅竹黑客松場地圖",
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



export default function MapLayout({ children }) {
    return (
        <div className={`${sourceHansSerif.variable} grid place-items-center px-8 py-16 bg-map overflow-scroll`}>
            {children}
        </div>
    );
}