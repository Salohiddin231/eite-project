import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { useFakeProjects } from "../shared/useFakeProjects";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaLaptop, FaAward } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from "../../Components/Footer/Footer";
import cartochka1 from '../../assets/images/cartochka.png';
import cartochka3 from '../../assets/images/cartinka-2.png';
import cartochka4 from '../../assets/images/cartinka-3.png';
import cartochka5 from '../../assets/images/cartinka-5.png';
import cartochka6 from '../../assets/images/cartinka-6.png';
import rek from '../../assets/images/reklama.webp';
import { Link } from "react-router-dom";

export default function About() {
    const { services: projectList, loading } = useFakeProjects();

    const advantages = [
        { icon: <FaShippingFast />, text: 'Быстрая доставка' },
        { icon: <FaShieldAlt />, text: 'Гарантия качества' },
        { icon: <FaHeadset />, text: 'Круглосуточная поддержка' },
        { icon: <FaLaptop />, text: 'Современное оборудование' },
        { icon: <FaAward />, text: 'Лидер отрасли' },
    ];

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    // 🧠 Хуки для отзывов
    const [reviews, setReviews] = useState(() => {
        const stored = localStorage.getItem('custom-reviews');
        return stored ? JSON.parse(stored) : [];
    });

    const [reviewName, setReviewName] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!reviewName.trim() || !reviewText.trim()) return;

        const newReview = {
            name: reviewName.trim(),
            text: reviewText.trim(),
        };

        const updated = [...reviews, newReview];
        setReviews(updated);
        localStorage.setItem('custom-reviews', JSON.stringify(updated));

        setReviewName('');
        setReviewText('');
    };

    return (
        <>
            <Header />
            <section className="about">
                <div className="container">
                    <h2 className="about-title" data-aos="fade-up">О нас!</h2>

                    <div className="about-info" data-aos="fade-up">
                        <div className="about-info-text">
                            <h3 className="about-info-title">Наше местоположение</h3>
                            <p className="about-info-subtitle">
                                Мы находимся по адресу, который вы можете увидеть на карте ниже. Заходите в наш магазин, чтобы получить консультацию или протестировать технику перед покупкой!
                            </p>
                        </div>
                        <div className="about-map" data-aos="zoom-in">
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3A69f0d30c3d05fcd62398e940798506394662adbeae7724923a87558ceffe0226&amp;source=constructor"
                                width="400"
                                height="300"
                                frameBorder="0"
                                title="Местоположение"
                            ></iframe>
                        </div>
                    </div>

                    <div className="about-text-wrapper">
                        <div>
                            <h3 className="about--title" data-aos="fade-up">О Компании Elite</h3>
                            <p className="about--subtitle" data-aos="fade-up">
                                Компания <strong>Elite</strong> — это ведущий поставщик техники, специализирующийся на продаже персональных компьютеров, ноутбуков, а также комплектующих и аксессуаров...
                            </p>
                            <hr data-aos="fade-up" />
                            <p className="about--subtitle" data-aos="fade-up">
                                Наша цель — обеспечить вас качественной техникой, будь то мощный игровой ПК, надёжный ноутбук для работы или новейшие комплектующие для апгрейда вашего устройства.
                                Мы гарантируем честные цены, профессиональную консультацию и высокий уровень сервиса.
                            </p>
                        </div>

                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={true}
                            allowTouchMove={false}
                            className="about-img-wrapper"
                            data-aos="fade-up"
                        >
                            {[cartochka1, cartochka3, cartochka4, cartochka5, cartochka6].map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} alt={`about-slide-${index}`} className="about-image" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="about-advantages-swiper" data-aos="fade-up">
                        <h3>Наши преимущества</h3>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            spaceBetween={10}
                            slidesPerView={1}
                            breakpoints={{
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {advantages.map((adv, index) => (
                                <SwiperSlide key={index} className="advantage-slide">
                                    <div className="advantage-card">
                                        <div className="advantage-icon">
                                            {adv.icon}
                                        </div>
                                        <p>{adv.text}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <h3 data-aos="fade-up">Наши услуги</h3>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.3rem', color: '#888' }}>
                            Загрузка...
                        </div>
                    ) : (
                        <Swiper
                            spaceBetween={160}
                            slidesPerView={1.2}
                            breakpoints={{ 640: { slidesPerView: 3 } }}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="services-swiper"
                        >
                            {projectList.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <SwiperSlide key={service.id || service.title}>
                                        <div className="service-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                                                {Icon && <Icon className="about-icon" />}
                                                <h3>{service.title}</h3>
                                            </div>
                                            <p>{service.desc}</p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                            <SwiperSlide style={{ width: '0' }} />
                        </Swiper>
                    )}

                    <div className="about-reviews" style={{ marginTop: 40 }} data-aos="fade-up">
                        <h3>Отзывы наших клиентов</h3>

                        {/* Статичные отзывы */}
                        <blockquote>
                            “Отличный магазин! Купил тут себе игровой ПК — всё собрали, доставили и подключили. Рекомендую!”
                            <br /> <span>— Дмитрий К.</span>
                        </blockquote>
                        <blockquote>
                            “Очень довольна обслуживанием. Приятные ребята, всё рассказали и помогли выбрать ноутбук для работы.”
                            <br /> <span>— Елена М.</span>
                        </blockquote>

                        {/* Отзывы из localStorage */}
                        {reviews.map((r, index) => (
                            <blockquote key={index}>
                                “{r.text}”
                                <br /> <span>— {r.name}</span>
                            </blockquote>
                        ))}

                        {/* Форма добавления отзыва */}
                        <form onSubmit={handleAddReview} style={{ marginTop: 30 }}>
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                                style={{
                                    padding: '10px',
                                    marginRight: '10px',
                                    width: '200px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Ваш отзыв"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                style={{
                                    padding: '10px',
                                    marginRight: '10px',
                                    width: '300px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Добавить
                            </button>
                        </form>
                    </div>

                    <Link to={'https://computercaredubai.ae/?srsltid=AfmBOopeJyOJX_rD5zz9TDwagPuV1nEHmP1Fbej6EmMagbMriRvSrdIF'}>
                        <div className="container" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                            <img className='reklama' src={rek} alt="Реклама" />
                        </div>
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
