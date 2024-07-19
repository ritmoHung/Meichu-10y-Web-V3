// # api/about/[year]
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/firebase-admin";



// # Get info of a certain year
export async function GET(req, { params }) {
	let message, level, status;
	let data = {};

	try {
		// Get params
		const year = params.year;
		const summaryOnly = req.nextUrl.searchParams.get("summary_only") === "true";
		if (!Number.isInteger(Number(year))) {
			throw new Error("Invalid year.");
		}

		// Get data from Firestore, filter keys if summary_only
		const aboutCollection = firestore.collection("about");
		let query = aboutCollection.where("year", "==", Number(year));
		if (summaryOnly) {
			query = query.select("year", "summary", "bannerUrl");
		}
		const snapshot = await query.get();

		// Return data with status
		if (snapshot.empty) {
			message = `Info of year ${year} not found.`;
            level = "info";
            status = 200;
        } else {
			data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
            message = `Info of year ${year} retrieved successfully.`;
            level = "info";
            status = 200;
		}
	} catch (error) {
        message = `Error retrieving info of year: ${error.message}`;
        level = "error";
        status = 500;
	}

    return NextResponse.json({ data, message, level }, { status });
}