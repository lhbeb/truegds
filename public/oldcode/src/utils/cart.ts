import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export const CART_STORAGE_KEY = 'happydeel_cart';

export function addToCart(product: Product): void {
  const cartItem: CartItem = {
    product,
    quantity: 1,
    addedAt: new Date().toISOString()
  };
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItem));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function getCartItem(): CartItem | null {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return null;
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function getCartCount(): number {
  const cartItem = getCartItem();
  return cartItem ? cartItem.quantity : 0;
} 