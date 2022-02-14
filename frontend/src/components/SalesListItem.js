import { useEffect, useState } from "react";
import CONSTANTS from "../constants";
import ErrorMessage from "./ErrorMessage";
import LoadingState from "./LoadingState";

function SalesListItem({ productId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [tryaAgain, setTryAgain] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoaded(false);
    setError(null);

    fetch(`${CONSTANTS.apiUrl}/products/${productId}`, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Something went wrong getting the product, we are on it!"
          );
        }
      })
      .then((result) => {
        setProductDetail(result);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Sales list call successfully aborted");
        } else {
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });

    return () => {
      controller.abort();
    };
  }, [tryaAgain, productId]);

  if (error) {
    return (
      <ErrorMessage
        onErrorAction={() => setTryAgain(true)}
        message={error}
      ></ErrorMessage>
    );
  }

  if (!isLoaded) {
    return <LoadingState></LoadingState>;
  }

  return (
    <h3>
      <strong className="text-2xl block">{productDetail.name}</strong>
      <span className="bg-black font-light px-2 text-xs text-white">
        {" "}
        {productDetail.id}
      </span>
    </h3>
  );
}

export default SalesListItem;
