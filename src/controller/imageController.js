import imageService from "../service/imageService.js";

const getImage = async (req, res) => {
  const { url } = req.query;

  try {
    const { contentType, data } = await imageService.getImageData(url);

    res.set("Content-Type", contentType);
    res.send(data);
  } catch (error) {
    res.status(500).send("Error retrieving image");
  }
};

export default { getImage };
