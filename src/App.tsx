import { useQuery } from "react-query";
import { CartItemType } from "./types/app.type";
import { Loader } from "./components";

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
  const handleAddToCart = () => null;
  const handleRemovFromCart = () => null;

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <div className="text-center">Something went wrong!!!</div>;

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default App;
