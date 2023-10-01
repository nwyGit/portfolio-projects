import axios from "axios";

import { config } from "./auth";

const uploadImage = async (image: any) => {
  const updatedConfig = {
    headers: {
      ...config()?.headers,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/util/upload-image`,
    image,
    updatedConfig,
  );

  return response.data;
};

const utilServices = {
  uploadImage,
};

export default utilServices;
