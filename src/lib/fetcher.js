import axios from "axios";



export const fetcher = async (url, { baseUrl = "", params = {}, method = "GET", contentType = "application/json", data = null } = {}) => {
	const queryString = Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : "";
	const finalUrl = baseUrl + url + queryString;

	const options = {
		method,
		url: finalUrl,
		headers: {
			"Content-Type": contentType,
		},
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
		if (error.response) {
			// Handle errors from the server
			throw { 
				message: error.response.data.message || "An error occurred.",
				level: error.response.data.level || "error",
				status: error.response.status,
			};
		} else if (error.request) {
			// Handle errors due to no response received
			throw {
				message: "No response from server.",
				level: "error",
				status: null,
			};
		} else {
			// Handle other errors
			throw {
				message: error.message,
				level: "error",
				status: null,
			};
		}
	}
}