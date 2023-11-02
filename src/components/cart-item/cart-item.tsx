import React from "react";
import { CartItemProps } from "./cart-item.props";

const CartItem = ({ item, addToCart, removFromCart }: CartItemProps) => {
  return (
    <div>
      <li key={item.id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{item.title}</h3>
              <p className="ml-4">${item.price}</p>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">
              Total price: ${item.amount * item.price}
            </p>
            <div>x{item.amount}</div>

            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => removFromCart(item.id)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
