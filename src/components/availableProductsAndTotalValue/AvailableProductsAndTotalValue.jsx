import React, { useState } from "react";

export const AvailableProductsAndTotalValue = ({ products }) => {
  const [category, setCategory] = useState("");

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const categoriesValuesMap = categories.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: products
        .filter((product) => product.category === curr)
        .reduce((result, { price }) => (result += price), 0)
        .toFixed(2),
    }),
    {}
  );
  return (
    <div>
      {products.length >= 1 && (
        <div>
          <div>
            <h1>
              All available product categories and the total value of products
              of a given category
            </h1>
          </div>
          <div>
            <label htmlFor="category">Choose a category product: </label>
            <select onChange={(e) => setCategory(e.target.value)} id="category">
              <option value=""></option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            {category === "" ? (
              <p>Please choose a category product</p>
            ) : (
              <p>
                <b>Category: {category}: </b>
                <span>price: {categoriesValuesMap[category]}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
