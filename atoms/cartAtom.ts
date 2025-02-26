import { atomWithStorage } from "jotai/utils";
type CartItem = {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

// cartatom localstorage persstence
export const cartAtom = atomWithStorage<CartItem[]>("cart", []);
