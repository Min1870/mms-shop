import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

import { useStateContext } from "../context/StateContext";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();

  const nav = useNavigate();

  const [total, setTotal] = useState(0);

  const checkoutHandler = () => {
    dispatch({ type: "CART_EMPTY" });
    nav("/success");
  };

  const increasePrice = price => {
    setTotal(total + price)
  }

  const decreasePrice = price => {
    setTotal(total  - price)
  }

  

  useEffect(() => {
    setTotal(cart.reduce((initial, current) => initial + current.price, 0))
  }, []);

  return (
    <>
      {cart.length > 0 ? (
        <div className="grid grid-cols-4">
          <div className=" col-span-3 flex flex-col gap-5">
            {cart?.map((item) => <CartItem key={item.id} item={item} increasePrice={increasePrice} decreasePrice={decreasePrice}/>)}
          </div>
          <div className="col-span-1 ">
            <div className="bg-gray-50 p-10 rounded shadow-lg">
              <h1 className="text-3xl text-info font-semibold">
                Total Price - ${total.toFixed(2)}
              </h1>
              <button
                onClick={checkoutHandler}
                className="my-5 px-5 py-2 bg-info text-primary rounded shadow-lg uppercase"
              >
                Checkout
              </button>
            </div>
            <button
              className="my-5 px-5 py-2 bg-danger text-primary rounded shadow-lg uppercase"
              onClick={() => dispatch({ type: "CART_EMPTY" })}
            >
              Cart Empty
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className=" bg-secondary p-20 rounded shadow-lg mt-20 animate__animated animate__backInDown">
            <h1 className="text-4xl font-semibold tracking-wider my-5 text-primary">
              Your Cart is Empty
            </h1>
            <button
              onClick={() => nav("/")}
              className="text-primary  bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105"
            >
              go shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
