// # api/teams
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/firebase-admin";



// #
export async function GET() {
	return NextResponse.json({ data: {}, message: "To be developed", level: "warning" }, { status: 200 });
}