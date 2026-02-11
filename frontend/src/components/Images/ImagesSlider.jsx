import React, { useState } from "react";
import { useState } from "react";

const ImagesSlider = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    images?.length > 0 &&
    images?.map((img, index) => <img key={index} src={img} />)
  );
};

export default ImagesSlider;
