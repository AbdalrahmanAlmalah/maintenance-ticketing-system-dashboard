import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const TicketImage = ({ ticketID }) => {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(ticketID);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("/ticket/" + ticketID + "/img", {
          responseType: "arraybuffer",
        });
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;
        setImageURL(imageSrc);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [ticketID]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!imageURL) {
    return <h1>No photo available</h1>;
  }

  return (
    <img
      src={imageURL}
      alt="Ticket Image"
      style={{ width: "50%", height: "50%" }}
    />
  );
};

export default TicketImage;
