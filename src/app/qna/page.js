// Components & UI
import QnaAccordion from "@/components/main/qna/qna-accordion";



export default function Qna() {
	return (
        <div className="grid grid-rows-[auto_1fr]">
            <header className="mb-4">
                <h1 className="bracket bracket-md justify-center">常見問題</h1>
			</header>
			<main>
                <QnaAccordion />
            </main>
        </div>
    );
}