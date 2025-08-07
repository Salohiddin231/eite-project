import { useState } from 'react';
import { toast } from 'react-toastify';

// Хук для управления покупками
export function usePurchase() {
  const [purchased, setPurchased] = useState(() => {
    // Сохраняем покупки в localStorage
    const saved = localStorage.getItem('purchasedProducts');
    return saved ? JSON.parse(saved) : [];
  });

  // Купить продукт
  function buyProduct(product) {
    setPurchased(prev => {
      const updated = [...prev, product];
      localStorage.setItem('purchasedProducts', JSON.stringify(updated));
      toast.success('Покупка успешно совершена!', { position: 'top-left', autoClose: 2000 });
      return updated;
    });
  }

  // Очистить покупки
  function clearPurchases() {
    setPurchased([]);
    localStorage.removeItem('purchasedProducts');
  }

  return { purchased, buyProduct, clearPurchases };
}
