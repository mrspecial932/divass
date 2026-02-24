"use client";

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) =>
          i.id === action.payload.id &&
          i.length === action.payload.length &&
          i.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, length, color, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.id === id && i.length === length && i.color === color)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id && i.length === length && i.color === color
            ? { ...i, quantity }
            : i
        ),
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.id === action.payload.id &&
              i.length === action.payload.length &&
              i.color === action.payload.color
            )
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const updateQuantity = (payload) =>
    dispatch({ type: "UPDATE_QUANTITY", payload });
  const removeItem = (payload) => dispatch({ type: "REMOVE_ITEM", payload });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const subtotal = state.items.reduce(
    (sum, i) => sum + (i.price || 0) * i.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
