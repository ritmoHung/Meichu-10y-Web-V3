// # api/teams/[id]
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/firebase-admin";



// # Get info of a certain team
export async function GET({ params }) {
	let message, level, status;
	let data = {};

	try {
		// Get params
		const teamId = params.id;

		// Get data from Firestore
		const teamCollection = firestore.collection("about");
		let query = teamCollection.where("id", "==", teamId);

		// Return data with status
	} catch (error) {
		message = `Error retrieving info of team: ${error.message}`;
		level = "error";
		status = 500;
	}

	return NextResponse.json({ data, message: "To be developed", level: "warning" }, { status: 200 });
}