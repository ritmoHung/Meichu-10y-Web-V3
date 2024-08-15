// # api/teams/[id]
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";



// # Get info of a certain team
export async function GET(req, { params }) {
	let message, level, status;
	let data = {};

	try {
		// Get params
		const teamId = params.teamId;
		const summaryOnly = req.nextUrl.searchParams.get("summary_only") === "true";

		// Get data from Firestore, filter keys if summary_only
		const teamDoc = firestore.collection("teams").doc(teamId);
		const fields = ["cover_img_url", "introduction", "team_name", "title"];
		const snapshot = summaryOnly ? await teamDoc.get({ fields }) : await teamDoc.get();

		// Return data with status
		if (!snapshot.exists) {
			message = `Info of team ${teamId} not found.`;
            level = "warning";
            status = 404;
        } else {
			data = { id: snapshot.id, ...snapshot.data() };
            message = `Info of team ${teamId} retrieved successfully.`;
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