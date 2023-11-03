import React from "react";

const ProductCard = ({ featured, addToBasket }) => {
  return (
    <>
      <div className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={featured.image}
            alt={featured.description}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{featured.description}</h3>
        <div className="flex items-center justify-between">
          <p className="mt-1 text-lg font-medium text-gray-900">
            ${featured.price}
          </p>
          <button
            onClick={() => addToBasket(featured)}
            className="bg-green-600 text-white py-1 px-3 rounded"
          >
            BUY
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
