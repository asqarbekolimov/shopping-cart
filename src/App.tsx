import { useQuery } from "react-query";
import { CartItemType } from "./types/app.type";
import { Loader } from "./components";
import ProductCard from "./components/product-card/product-card";

const getProduct = async (): Promise<CartItemType[]> => {
  // Since the API returns an array of CartItemType
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProduct
  );
  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemovFromCart = () => null;

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center">Something went wrong!!!</div>;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  ">
          {data?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
