import React from "react";
import { Cart, ProductCard } from "./components";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { API_URL, API_KEY } from "./services/config";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";

const getProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data.featured;
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const { data, isLoading, error } = useQuery("products", getProducts);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState([]);

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
    }
  };
  return (
    <div className="bg-white">
      <div
        onClick={() => setOpen((state) => !state)}
        className="fixed right-8 top-10 border p-2 rounded cursor-pointer bg-slate-50 hover:bg-slate-50/50 z-10"
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 pb-2 text-center text-red-500 bg-white border z-30 rounded-full">
          {order.length}
        </div>
        <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
      </div>
      <Cart
        open={open}
        setOpen={setOpen}
        order={order}
        addToBasket={addToBasket}
      />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            data.map((item) => (
              <ProductCard
                key={item.id}
                featured={item}
                addToBasket={addToBasket}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
