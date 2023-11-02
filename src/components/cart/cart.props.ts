import { CartItemType } from "../../types/app.type";

export interface CartProps {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removFromCart: (id: number) => void;
  show: boolean;
  onClose: (arg: boolean) => void;
}
