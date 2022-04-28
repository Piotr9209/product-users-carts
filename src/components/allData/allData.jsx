import React, { useState, useEffect } from "react";
import { AvailableProductsAndTotalValue } from "../availableProductsAndTotalValue/AvailableProductsAndTotalValue";
import { FurthestAwayFromEachOther } from "../furthestAwayFromEachOther/FurthestAwayFromEachOther";
import { HighestValueCart } from "../highestValueCart/HighestValueCart";

export const AllData = () => {
  const [loading, setLoading] = useState(false);
  const [apiDataProducts, setApiDataProducts] = useState([]);
  const [apiDataCarts, setApiDataCarts] = useState([]);
  const [apiDataUsers, setApiDataUsers] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const arrayData = [
      "https://fakestoreapi.com/products",
      "https://fakestoreapi.com/carts",
      "https://fakestoreapi.com/users",
    ];
    const promises = arrayData.map((url) =>
      fetch(url).then((res) => res.json())
    );
    Promise.all(promises)
      .then((result) => {
        return (
          setApiDataProducts(result[0]),
          setApiDataCarts(result[1]),
          setApiDataUsers(result[2])
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <AvailableProductsAndTotalValue products={apiDataProducts} />
      <HighestValueCart
        products={apiDataProducts}
        users={apiDataUsers}
        carts={apiDataCarts}
      />
      <FurthestAwayFromEachOther users={apiDataUsers} />
    </>
  );
};
