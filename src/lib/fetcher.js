import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "噢不。出事了阿伺";
const NO_RESPONSE_MESSAGE = "噢不。阿伺你怎麼沒感覺";



const fetcher = async (url, { baseUrl = "", params = {}, method = "GET", contentType = "application/json", data = null } = {}) => {
	const options = {
		method,
		url: baseUrl + url,
		headers: {
			"Content-Type": contentType,
		},
		params,
		data,
	};

	try {
		const response = await axios(options);
		const { level, message } = response.data;
		if (message) {
			switch (level) {
				case "error":
					console.error(message);
					break;
				case "warning":
					console.warn(message);
					break;
				case "info":
				default:
					console.log(message);
					break;
			}
		}

		return { ...response.data, status: response.status }
	} catch (error) {
		let serverError, status;

		if (error.response) {
			// Handle errors from the server
			status = error.response.status;
			serverError = new Error(`[${status}] ${DEFAULT_ERROR_MESSAGE}`);
		} else if (error.request) {
			// Handle errors due to no response received
			status = 500;
			serverError = new Error(`[${status}] ${NO_RESPONSE_MESSAGE}`);
		} else {
			// Handle other errors
			status = 0;
			serverError = new Error(`[${status}] ${DEFAULT_ERROR_MESSAGE}`);
		}

		serverError.status = status;
		throw serverError;
	}
}

export default fetcher;