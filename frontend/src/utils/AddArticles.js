import { useState } from "react";

import CONSTANTS from "../constants";

function AddArticles() {
  const [buttonText, setButtonText] = useState("Add articles");

  const addArticles = () => {
    setButtonText("...");

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          id: "0517f083-0e15-4876-8d1f-6fa45900431c",
          name: "Leg",
          amountInStock: 12,
        },
        {
          id: "addc65a8-c759-41d8-a18a-89fe446ad484",
          name: "Screw",
          amountInStock: 18,
        },
        {
          id: "831b92b8-677b-42cc-a585-335ea4ccccb6",
          name: "Seat",
          amountInStock: 24,
        },
        {
          id: "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
          name: "Table Top",
          amountInStock: 12,
        },
      ]),
    };

    fetch(`${CONSTANTS.apiUrl}/articles/`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Something went wrong substracting the article, we are on it"
          );
        }
      })
      .then((res) => {
        setButtonText("Added");
      })
      .catch((err) => {
        setButtonText("Error, try again", err);
      });
  };

  return (
    <button
      onClick={addArticles}
      className="absolute border p-2 right-5 rounded text-xs top-5"
      title="Add articles for test purposes"
    >
      {buttonText}
    </button>
  );
}

export default AddArticles;
