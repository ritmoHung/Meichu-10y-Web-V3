// Components & UI
import QnaAccordion from "@/components/main/qna/qnaAccordion";



const checkboxes = [
    {
        id: 0,
        category: "屬性",
        names: ["2022", "創客組", "競賽內容", "報名相關", "其他"],
    }
];

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