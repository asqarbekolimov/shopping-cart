import { useQuery } from "react-query";
import { CartItemType } from "./types/app.type";
import { Loader } from "./components";
import ProductCard from "./components/product-card/product-card";
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Cart from "./components/cart/cart";

const getProduct = async (): Promise<CartItemType[]> => {
  // Since the API returns an array of CartItemType
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );
  const [open, setOpen] = useState(false);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const addToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prev, { ...clickedItem, amount: 1 }];
      }
    });
  };

  const removFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center">Something went wrong!!!</div>;

  return (
    <div>
      <div
        onClick={() => setOpen((state) => !state)}
        className="fixed right-8 top-10 border p-2 rounded cursor-pointer bg-slate-50 hover:bg-slate-50/50"
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 pb-2 text-center text-red-500 bg-white border z-30 rounded-full">
          {getTotalItems(cartItems)}
        </div>
        <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          removFromCart={removFromCart}
          show={open}
          onClose={setOpen}
        />
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  ">
          {data &&
            data.map((item) => (
              <ProductCard key={item.id} item={item} addToCart={addToCart} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
