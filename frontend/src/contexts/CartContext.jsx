// frontend/src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  total: 0,
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Cargo carrito desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem("cafearoma_cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Cada vez que cartItems cambie, recalculo total y guardo en localStorage
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const suma = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(suma);
    localStorage.setItem("cafearoma_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agrega ítem (o incrementa si ya existe)
  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (it) =>
          it.name === newItem.name &&
          it.size === newItem.size &&
          JSON.stringify(it.toppings) === JSON.stringify(newItem.toppings)
      );
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += newItem.qty;
        copy[idx].subtotal = copy[idx].unitPrice * copy[idx].qty;
        return copy;
      } else {
        return [
          ...prev,
          {
            key: Date.now() + Math.random(),
            ...newItem,
          },
        ];
      }
    });
  };

  // Actualiza cantidad (delta = +1 o -1)
  const updateQty = (key, delta) => {
    setCartItems((prev) => {
      const updated = prev
        .map((it) => {
          if (it.key === key) {
            const nuevaQty = it.qty + delta;
            if (nuevaQty <= 0) return null;
            return {
              ...it,
              qty: nuevaQty,
              subtotal: it.unitPrice * nuevaQty,
            };
          }
          return it;
        })
        .filter(Boolean);
      return updated;
    });
  };

  // Limpia carrito (por ejemplo, después del pago)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
