import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function FavoriteProduct() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 800, once: true });
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(favs);
    }, []);

    function handleRemove(itemId) {
        const updated = favorites.filter(fav => fav.id !== itemId);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    }

    return (
        <>
            <Header />
            <section className="projects">
                <div className="container" data-aos="fade-up">
                    <h2>Избранные товары</h2>
                    {favorites.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888' }}>
                            Нет избранных товаров
                        </p>
                    ) : (
                        <ul className="projects-grid">
                            {favorites.map((item, index) => (
                                <li
                                    className="project-card"
                                    key={item.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="project-img-wrapper">
                                        <img src={item.image} alt={item.title} className="project-image" />
                                    </div>
                                    <div className="project-text-wrapper">
                                        <p className="project-price">{item.price}</p>
                                    </div>
                                    <h4 className="project-text">{item.title}</h4>
                                    <p className="project-description">{item.description}</p>
                                    <div className="project-stars">
                                        <span>★ {item.rating}</span>
                                    </div>
                                    <button
                                        className="project-fav-button favorited"
                                        onClick={() => handleRemove(item.id)}
                                        title="Убрать из избранного"
                                    >
                                        Убрать из избранного
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}
