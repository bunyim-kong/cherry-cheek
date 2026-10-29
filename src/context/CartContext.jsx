import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../service/storage";
import { CartContext } from "./cart";

const CART_STORAGE_KEY = "cc_cart";

function loadStoredCart() {
  const storedCart = readStorage(CART_STORAGE_KEY, []);

  if (!Array.isArray(storedCart)) {
    return [];
  }

  return storedCart.filter(
    (item) =>
      item?.id &&
      typeof item.price === "number" &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0,
  );
}

function clampQuantity(quantity, stockQuantity) {
  const availableStock = Math.max(0, Number(stockQuantity) || 0);
  const requestedQuantity = Math.max(1, Number(quantity) || 1);

  return Math.min(requestedQuantity, availableStock);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadStoredCart);

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  function addToCart(product, quantity = 1) {
    const quantityToAdd = clampQuantity(quantity, product.stockQuantity);

    if (quantityToAdd === 0) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...currentItems, { ...product, quantity: quantityToAdd }];
      }

      return currentItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              ...product,
              quantity: clampQuantity(
                item.quantity + quantityToAdd,
                product.stockQuantity,
              ),
            }
          : item,
      );
    });
  }

  function updateQuantity(productId, quantity) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: clampQuantity(quantity, item.stockQuantity),
            }
          : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const value = {
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
