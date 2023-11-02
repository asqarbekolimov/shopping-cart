import React from "react";
import { ProductCardProps } from "./product-card.props";

const ProductCard = ({ item, addToCart }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer border p-5 rounded">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-96 object-cover  group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 line-clamp-1">
        {item.title}
      </h3>
      <p className="mt-1  text-sm text-gray-700 line-clamp-3">
        {item.description}
      </p>
      <div className="mt-3">${item.price}</div>
      <button
        onClick={() => addToCart(item)}
        className="w-full p-2 bg-slate-100 mt-5 hover:bg-slate-300 transition duration-200 ease-linear uppercase"
      >
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;
