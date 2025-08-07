import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaEnvelope, FaClock, FaArrowUp } from 'react-icons/fa';
import logo from '../../assets/icons/logo.png';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

        const onScroll = () => {
            setShowScrollTop(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', onScroll);

        // Проверим сразу при монтировании
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-top">
                        <div className="footer-brand" data-aos="fade-up">
                            <img src={logo} alt="Logo" />
                            <p className="footer-description">
                                Elite — это качество, надежность и стиль в каждом продукте. Мы стремимся сделать вашу жизнь лучше.
                            </p>
                        </div>

                        <div className="footer-links" data-aos="fade-up" data-aos-delay="100">
                            <h4>Навигация</h4>
                            <ul>
                                <NavLink to="/">Главная</NavLink>
                                <NavLink to="/about">О нас</NavLink>
                                <NavLink to="/contact">Контакты</NavLink>
                                <NavLink to="/projects">Продукты</NavLink>
                            </ul>
                        </div>

                        <div className="footer-contact" data-aos="fade-up" data-aos-delay="200">
                            <h4>Контакты</h4>
                            <p><FaEnvelope /> hodjaber40@mail.ru</p>
                            <p>Телефон: +996 555 459 645</p>
                            <p>Адрес: Улица 165, Массив Каленина, Дом 32</p>
                            <p><FaClock /> Время работы: Пн–Сб,  08:00–18:00</p>
                        </div>
                    </div>

                    <div className="footer-bottom" data-aos="fade-up">
                        <div className="footer-socials">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaTelegramPlane /></a>
                        </div>
                        <p className="footer-copy">
                            © {new Date().getFullYear()} Elite. Все права защищены.
                        </p>
                    </div>
                    <button
                        className={`scroll-top-btn ${showScrollTop ? 'visible' : 'hidden'}`}
                        onClick={scrollToTop}
                        aria-label="Наверх"
                    >
                        <FaArrowUp /> Наверх
                    </button>
                </div>
            </div>
        </footer>
    );
}
