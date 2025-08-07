import { useEffect, useState } from 'react';
import { usePurchase } from '../shared/usePurchase';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function PurchasesPage() {
  const { purchased, clearPurchases } = usePurchase();
  const [purchasedItems, setPurchasedItems] = useState(purchased);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    setPurchasedItems(purchased);
  }, [purchased]);

  function removeItem(idx) {
    const updated = purchasedItems.filter((_, i) => i !== idx);
    localStorage.setItem('purchasedProducts', JSON.stringify(updated));
    setPurchasedItems(updated);
  }

  function handleClear() {
    clearPurchases();
    setPurchasedItems([]);
  }

  return (
    <>
      <Header />

      <main className="purchases-page container">
        <h2 data-aos="fade-up">Купленные товары</h2>
        {purchasedItems.length === 0 ? (
          <p style={{ color: '#888', fontSize: '1.2rem', marginTop: '40px' }} data-aos="fade-up">
            Нет купленных товаров.
          </p>
        ) : (
          <>
            <ul className="purchased-list">
              {purchasedItems.map((item, idx) => (
                <li
                  key={idx}
                  className="purchased-item"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <img src={item.image} alt={item.title} />
                  <div style={{ flex: 1 }}>
                    <h4>{item.title}</h4>
                    <p>{item.price}</p>
                  </div>
                  <button className="btn-secondary" onClick={() => removeItem(idx)}>
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="btn-secondary"
              style={{ marginTop: 30 }}
              onClick={handleClear}
              data-aos="fade-up"
            >
              Очистить покупки
            </button>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}