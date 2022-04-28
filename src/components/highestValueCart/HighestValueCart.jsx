import React from "react";

//HELPER

const getCartValue = (cart, productPriceById) => {
  const productValues = cart.products.map(
    ({ productId, quantity }) => (productPriceById[productId] || 0) * quantity
  );

  const totalValue = productValues.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return totalValue;
};

export const HighestValueCart = ({ products, carts, users }) => {
  const productPriceById = products.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.price,
    }),
    {}
  );

  const calculatedCarts = carts
    .map((cart) => ({
      ...cart,
      cartValue: getCartValue(cart, productPriceById),
    }))
    .sort((a, b) => b.cartValue - a.cartValue);

  const userNameById = users.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: `${cur.name.firstname} ${cur.name.lastname}`,
    }),
    {}
  );

  return (
    <div>
      <h1>Highest value cart:</h1>
      {products.length >= 1 && carts.length >= 1 && users.length >= 1 && (
        <div>
          <p>
            <b>Highest Value Cart:</b>{" "}
            <span>
              {" "}
              {calculatedCarts[0].cartValue}, user is:{" "}
              {userNameById[calculatedCarts[0].userId]}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
