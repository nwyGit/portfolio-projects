import axios from "axios";

const uploadImage = async (image: any) => {
	const config = {
		headers: { Authorization: localStorage.getItem("access_token") },
		"Content-Type": "multipart/form-data",
	};

	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/util/upload-image`,
		image,
		{ ...config }
	);

	return response.data;
};

const utilServices = {
	uploadImage,
};

export default utilServices;
