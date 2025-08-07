import { FaStar, FaHeart } from 'react-icons/fa';
import { useFavorite } from '../shared/useFavorite';
import { usePurchase } from '../shared/usePurchase';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import { useEffect } from 'react';

export default function ProjectItem({ id, image, title, description, price, rating, aosDelay }) {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const hasToken = !!localStorage.getItem('token');
    const { buyProduct } = usePurchase();
    const navigate = useNavigate();

    const favItem = { id, image, title, description, price, rating };
    const { isFavorite, addFavorite, removeFavorite } = useFavorite(favItem);

    // Проверяем токен при покупке
    const handleBuy = () => {
        if (!hasToken) return;  // Если нет токена - ничего не делаем
        buyProduct(favItem);
    };
    const handleCardClick = () => navigate(`/product/${id}`);

    return (
        <li className="project-card" onClick={handleCardClick} style={{ cursor: 'pointer' }} data-aos-delay={aosDelay}>
            <div className="project-img-wrapper">
                <img src={image} alt={title} className="project-image" />
            </div>

            <div className="project-text-wrapper">
                <p className="project-price">{price}</p>
            </div>

            <h4 className="project-text">{title}</h4>
            <p className="project-description">{description}</p>

            <div className="project-stars">
                <FaStar className="star_icon" />
                <span>{rating}</span>
            </div>

            <div
                className="project-actions"
                onClick={(e) => e.stopPropagation()}
            >
                {hasToken && (
                    <button
                        className={`project-fav-button ${isFavorite ? 'favorited' : ''}`}
                        onClick={isFavorite ? removeFavorite : addFavorite}
                    >
                        <FaHeart color={isFavorite ? "#ff0055" : "#aaa"} />
                    </button>
                )}

                <button
                    className="project-buy-button"
                    onClick={handleBuy}
                    disabled={!hasToken}
                    style={{
                        cursor: hasToken ? 'pointer' : 'not-allowed',
                        opacity: hasToken ? 1 : 0.5, 
                    }}
                >
                    Купить
                </button>
            </div>
        </li>
    );
}
