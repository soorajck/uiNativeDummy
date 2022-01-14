import create from 'zustand';
import {CartItemType} from '../screens/home';

interface storeState {
  cartItems: CartItemType[];
  setCartItemsData: (cartItems: CartItemType[]) => void;
}

const useCartStore = create<storeState>(set => ({
  cartItems: [],
  setCartItemsData: cartItems => {
    set(state => ({
      cartItems: cartItems,
    }));
  },
}));
export default useCartStore;
