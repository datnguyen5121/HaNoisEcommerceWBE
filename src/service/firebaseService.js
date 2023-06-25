import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config.js";
import { v4 } from "uuid";

const getLinks = async (values) => {
  // try {
  //   const uploadPromises = Object.values(values).map(async (imageArray) => {
  //     const image = imageArray[0];
  //     console.log(image);
  //     const fileExtension = image.originalname.split(".").pop();
  //     const fileName = `${v4()}.${fileExtension}`;
  //     const storageRef = ref(storage, fileName);
  //     await uploadBytes(storageRef, image.buffer);
  //     const downloadURL = await getDownloadURL(storageRef);
  //     return downloadURL;
  //   });

  //   const imageUrls = await Promise.all(uploadPromises);
  //   return imageUrls;
  // } catch (error) {
  //   console.error("Error uploading images to Firebase:", error);
  //   throw error;
  // }
  return values;
};

export default getLinks;
