import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";



if (!getApps().length) {
	const serviceAccount = {
		type: "service_account",
		project_id: "meichu-10y-web",
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://oauth2.googleapis.com/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_CLIENT_EMAIL)}`,
		universe_domain: "googleapis.com"
	};
	initializeApp({
		credential: cert(serviceAccount),
		storageBucket: "meichu-10y-web.appspot.com",
	});
}

const firestore = getFirestore();
const storage = getStorage().bucket();
export { firestore, storage };