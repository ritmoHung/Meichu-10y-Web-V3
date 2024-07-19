// # api/qna
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/firebase-admin";



// # Get all questions or apply filters
export async function GET(req) {
	let message, level, status;
	let data = [];

	try {
		// Get data from Firestore, order by "question"
		const qnaCollection = firestore.collection("qnas");
		const snapshot = await qnaCollection
			.orderBy("question")
			.get();

		// Return data with status
		if (snapshot.empty) {
			message = `No questions.`;
            level = "info";
            status = 200;
        } else {
			data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            message = `Questions retrieved successfully.`;
            level = "info";
            status = 200;
		}
	} catch (error) {
        message = `Error retrieving questions: ${error.message}`;
        level = "error";
        status = 500;
	}

    return NextResponse.json({ data, message, level }, { status });
}