import { ref } from "firebase/storage";
import { storage } from "./config.js";
import { v4 } from "uuid";

const getLinks = async (values) => {
  const uploadPromises = values.imgUrl.map((image) => {
    const imgPath = `product_images/${values.title + v4()}`;
    const imageRef = ref(storage, imgPath);
    return uploadBytes(imageRef, image);
  });

  const res = await Promise.all(uploadPromises);

  const links = await Promise.all(res.map((r) => getDownloadURL(r.ref)));
  return links;
};

export default getLinks;
