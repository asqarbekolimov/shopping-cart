import { CartItemType } from "../../types/app.type";

export interface CartItemProps {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removFromCart: (id: number) => void;
}
