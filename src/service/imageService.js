import axios from "axios";

const getImageData = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    const contentType = response.headers["content-type"];
    const data = response.data;

    return { contentType, data };
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving image");
  }
};

export default { getImageData };
