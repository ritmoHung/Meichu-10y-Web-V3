// # api/about
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";



// # Get all year summaries in descending order by "year"
export async function GET() {
	let message, level, status;
	let data = [];

	try {
		// Get data from Firestore, order by "year" in descending order, then filter keys
		const aboutCollection = firestore.collection("about");
		const snapshot = await aboutCollection
			.orderBy("year", "desc")
			.select("year", "summary")
			.get();

		// Return data with status
		if (snapshot.empty) {
			message = `No year summaries.`;
            level = "warning";
            status = 200;
        } else {
			data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            message = `Year summaries retrieved successfully.`;
            level = "info";
            status = 200;
		}
	} catch (error) {
        message = `Error retrieving year summaries: ${error.message}`;
        level = "error";
        status = 500;
	}

    return NextResponse.json({ data, message, level }, { status });
}