import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../Components/Header/Header';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import rek from '../../assets/images/reklama.webp'

export default function Contact() {
    const elName = useRef(null);
    const elNum = useRef(null);
    const elNik = useRef(null);
    const elMessage = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const name = elName.current.value.trim();
        const num = elNum.current.value.trim();
        const nik = elNik.current.value.trim();
        const messageText = elMessage.current.value.trim();

        if (!name) return toast.error('Введите имя');
        if (!nik) return toast.error('Введите Telegram ник');
        if (!num) return toast.error('Введите номер телефона');
        if (!messageText) return toast.error('Введите сообщение');

        const message = `Имя: ${name}\nНомер: ${num}\nTelegram: @${nik}\nСообщение: ${messageText}`;

        const token = '7569321984:AAGX2XeMCOKocRo5Rbe6cCLrtotvhLlXLuA';
        const chatId = '5313153677';
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Сообщение успешно отправлено!');
                elName.current.value = '';
                elNum.current.value = '';
                elNik.current.value = '';
                elMessage.current.value = '';
            })
            .catch(() => toast.error('Не удалось отправить сообщение!'));
    };

    return (
        <>
            <Header />
            <section className="contact">
                <div className="container">

                    <div className="contact_text_wrapper" data-aos="fade-up">
                        <h2>Свяжитесь с нами</h2>
                        <p className="contact-subtitle">
                            Остались вопросы? Напишите нам — мы свяжемся с вами в ближайшее время.
                        </p>
                    </div>

                    <div className="contact_wrapper">
                        <div className="contact-content">
                            <div className="contact-info" data-aos="fade-right">
                                <h3>Контактная информация</h3>
                                <ul>
                                    <li><strong>Адрес:</strong> Улица 165 Массив Каленина, Дом 32</li>
                                    <li><strong>Телефон:</strong> +996 555 459 645</li>
                                    <li><strong>Mail:</strong> hodjaber40@mail.ru</li>
                                    <li><strong>Режим работы:</strong> Пн–Сб, 08:00–18:00</li>
                                </ul>
                            </div>

                            <div className="contact-form" data-aos="fade-left">
                                <h3>Форма обратной связи</h3>
                                <form onSubmit={handleSubmit}>
                                    <input ref={elName} type="text" placeholder="Ваше имя" />
                                    <input ref={elNik} type="text" placeholder="Телеграм ник" />
                                    <input ref={elNum} type="tel" placeholder="Телефон" />
                                    <textarea ref={elMessage} rows="5" placeholder="Ваше сообщение..." />
                                    <button type="submit">Отправить</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="contact-map" data-aos="zoom-in">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A69f0d30c3d05fcd62398e940798506394662adbeae7724923a87558ceffe0226&amp;source=constructor"
                            width="100%"
                            height="400"
                            frameBorder="0"
                            title="Карта"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Link to={'https://computercaredubai.ae/?srsltid=AfmBOopeJyOJX_rD5zz9TDwagPuV1nEHmP1Fbej6EmMagbMriRvSrdIF'}>
                <div className="container" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                    <img className='reklama' src={rek} alt="" />
                </div>
            </Link>

            <Footer />
        </>
    );
}
