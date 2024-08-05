// # api/teams/[id]
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";



// # Get info of a certain team
export async function GET(req, { params }) {
	let message, level, status;
	let data = {};

	try {
		// Get params
		const teamIndex = params.index;
		const summaryOnly = req.nextUrl.searchParams.get("summary_only") === "true";

		// Get data from Firestore, filter keys if summary_only
		const teamCollection = firestore.collection("teams");
		let query = teamCollection.where("index", "==", teamIndex);
		if (summaryOnly) {
			query = query.select("cover_img_url", "introduction", "team_name", "title");
		}
		const snapshot = await query.get();

		// Return data with status
		if (snapshot.empty) {
			message = `Info of team ${teamIndex} not found.`;
            level = "warning";
            status = 200;
        } else {
			data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
            message = `Info of team ${teamIndex} retrieved successfully.`;
            level = "info";
            status = 200;
		}
	} catch (error) {
		message = `Error retrieving info of team: ${error.message}`;
		level = "error";
		status = 500;
	}

    return NextResponse.json({ data, message, level }, { status });
}