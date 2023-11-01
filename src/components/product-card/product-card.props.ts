import { CartItemType } from "../../types/app.type";

export interface ProductCardProps {
  item: CartItemType;
  handleAddToCart?: (clickedItem: CartItemType) => void;
}
