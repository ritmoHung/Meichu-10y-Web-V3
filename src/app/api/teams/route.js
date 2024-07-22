// # api/teams
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/firebase-admin";



// #
export async function POST(req) {
	return NextResponse.json({ data: {}, message: "To be developed", level: "warning" }, { status: 200 });
}

// # Get all team summaries in descending order by "index"
export async function GET() {
	let message, level, status;
	let data = {};

	try {
		// Get data from Firestore, order by "index" in descending order, then filter keys
		const teamCollection = firestore.collection("teams");
		const snapshot = await teamCollection
			.orderBy("index", "desc")
			.select("index", "year", "group", "team_name", "title", "introduction")
			.get();

		// Return data with status
		if (snapshot.empty) {
			message = `No team summaries.`;
            level = "warning";
            status = 200;
        } else {
			data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            message = `Team summaries retrieved successfully.`;
            level = "info";
            status = 200;
		}
	} catch (error) {
        message = `Error retrieving team summaries: ${error.message}`;
        level = "error";
        status = 500;
	}

    return NextResponse.json({ data, message, level }, { status });
}