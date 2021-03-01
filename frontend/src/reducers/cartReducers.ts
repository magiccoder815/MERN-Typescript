import { CartItem } from "./../types";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { CartAction, CartState } from "../types/";

/**
 * Initial state for cart
 */

const cartInitialState: CartState = {
  cartItems: [],
};

/**
 * Reducer used for cart related logic
 */

export const cartReducer = (
  state: CartState = cartInitialState,
  action: CartAction
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Check if item already exists in the cart
      const itemExists = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      )!;

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === itemExists.product ? item : cartItem
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
