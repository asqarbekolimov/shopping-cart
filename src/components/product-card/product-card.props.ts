import { CartItemType } from "../../types/app.type";

export interface ProductCardProps {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
}
