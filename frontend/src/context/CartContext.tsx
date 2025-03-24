import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeAllFromCart: (bookId: number) => void;
  removeOneFromCart: (bookId: number) => void;
  addOneToCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId ? { ...c, quantity: c.quantity + 1 } : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeAllFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
  };

  const removeOneFromCart = (bookId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addOneToCart = (bookId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeAllFromCart,
        removeOneFromCart,
        addOneToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
