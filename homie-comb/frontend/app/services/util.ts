import axios from "axios";

const uploadImage = async (image) => {
  const config = {
    headers: { Authorization: localStorage.getItem("access_token") },
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/util/upload-image`,
    image,
    { ...config, "Content-Type": "multipart/form-data" },
  );

  return response.data;
};

const getImage = async (id: string) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings`);
};

const utilServices = {
  uploadImage,
  getImage,
};

export default utilServices;
