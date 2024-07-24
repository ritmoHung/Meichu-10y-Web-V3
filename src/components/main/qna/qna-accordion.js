"use client";

// SWR
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Components & UI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";



export default function QnaAccordion() {
    const { data, isLoading, error } = useSWR("/api/qna", fetcher);

	return (
		<Accordion type="multiple" collapsible="true">
			{data?.data.length > 0 && data.data.map(qa => (
				<AccordionItem key={qa.id} value={qa.id}>
					<AccordionTrigger>
						<span className="text-left text-balance">
							<span className="text-primary-gradient font-bold">Q: </span>
							{qa.question}
						</span>
					</AccordionTrigger>
					<AccordionContent>
						<div className="neu-pressed-md rounded-[2rem] p-8">
							<p className="whitespace-pre-line">{qa.answer.replace("\\n", "\n")}</p>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}