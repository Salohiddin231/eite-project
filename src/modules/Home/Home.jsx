import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';
import 'swiper/css';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaLaptop, FaAward } from 'react-icons/fa';
import { FaCrown, FaKeyboard, FaDesktop } from 'react-icons/fa';
import { useFakeProjects } from '../shared/useFakeProjects';
import { Navigation, Pagination } from 'swiper/modules';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Autoplay } from 'swiper/modules';
import cartochka1 from '../../assets/images/cartochka.png'
import cartochka3 from '../../assets/images/cartinka-2.png'
import cartochka4 from '../../assets/images/cartinka-3.png'
import cartochka5 from '../../assets/images/cartinka-5.png'
import cartochka6 from '../../assets/images/cartinka-6.png'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ProjectItem from '../Projects/ProjectItem';
import video from '../../video/hero-bg.mp4'
import Aos from 'aos';
import rek from '../../assets/images/reklama.webp'
export default function Home() {
  const { builds, keyboards, monitors, loading } = useFakeProjects();

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

  return (
    <>
      <Header />

      <main className="home">
        <section className="hero-banner" data-aos="zoom-in">
          <div className="video-background-wrapper">
            <video
              className="video-background"
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            ></video>
          </div>
          <div className="container hero-content">
            <div className="hero-text" data-aos="fade-right">
              <h1>
                Добро пожаловать в <span className="highlight">Elite</span>
              </h1>
              <p>Соберите свой идеальный ПК или выберите из готовых решений</p>
              <Link to="/contact" className="btn-primary">
                Подобрать сборку
              </Link>
            </div>
          </div>
        </section>

        <section className="about">
          <div className="container">
            <div className="about-text-wrapper">
              <div>
                <h3 className="about--title" data-aos="fade-up">О Компании Elite</h3>
                <p className="about--subtitle" data-aos="fade-up">Компания <strong>Elite</strong> — это ведущий поставщик техники, специализирующийся на продаже персональных компьютеров, ноутбуков, а также комплектующих и аксессуаров...</p>
                <hr data-aos="fade-up" />
                <p className="about--subtitle" data-aos="fade-up">Наша цель — обеспечить вас качественной техникой...</p>
              </div>
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                allowTouchMove={false}
                className="about-img-wrapper"
                data-aos="fade-up"
              >
                {[cartochka1, cartochka3, cartochka4, cartochka5, cartochka6, cartochka1, cartochka3, cartochka4, cartochka5, cartochka6].map((img, index) => (
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
          </div>
        </section>

        {!loading && (
          <>
            <section className="projects-preview" data-aos="fade-up">
              <div className="container">
                <div className="project-text-wrapper" data-aos="fade-up">
                  <h2>
                    <FaCrown /> Популярные сборки
                  </h2>
                  <button className="project-link">
                    <Link to={'/projects'}>Посмотреть больше <FaArrowRightLong /></Link>
                  </button>
                </div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {builds.map((item) => (
                    <SwiperSlide key={item.id}>
                      <ProjectItem {...item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </>
        )}

        <Link to={'https://computercaredubai.ae/?srsltid=AfmBOopeJyOJX_rD5zz9TDwagPuV1nEHmP1Fbej6EmMagbMriRvSrdIF'}>
          <div className="container" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
            <img className='reklama' src={rek} alt="" />
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
