import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
    getStarsArray,
    useFakeProjects,
} from "../shared/useFakeProjects";
import { FaStar } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProjectItem from "./ProjectItem"; // импорт твоей карточки

export default function ProductSingle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        builds,
        monitors,
        keyboards,
        gpus,
        cases,
        note_books,
        mouse,
        user,
    } = useFakeProjects();

    const [product, setProduct] = useState(null);
    const hasToken = Boolean(localStorage.getItem("token"));

    const buyProduct = (item) => {
        toast.success(`Вы купили: ${item.title}`);
    };

    useEffect(() => {
        AOS.init({ duration: 700, easing: "ease-in-out", once: true });
    }, []);

    useEffect(() => {
        const allProducts = [
            ...builds,
            ...monitors,
            ...keyboards,
            ...gpus,
            ...cases,
            ...mouse,
            ...note_books,
            ...user,
        ];

        const found = allProducts.find((p) => String(p.id) === String(id));
        setProduct(found);
    }, [id, builds, monitors, keyboards, gpus, cases, note_books, mouse, user]);

    if (!product) {
        return <div style={{ padding: 32 }}>Продукт не найден...</div>;
    }

    const handleBuy = () => {
        if (!hasToken) return;
        buyProduct(product);
    };

    const allProducts = [
        ...builds,
        ...monitors,
        ...keyboards,
        ...gpus,
        ...cases,
        ...mouse,
        ...note_books,
        ...user,
    ];

    // Фильтруем рекомендованные по типу, исключая текущий товар
    const recommended = allProducts
        .filter(
            (p) =>
                p.type === product.type &&
                String(p.id) !== String(product.id)
        )
        .slice(0, 4);

    return (
        <>
            <ToastContainer />

            <button
                className="back"
                onClick={() => navigate(-1)}
                data-aos="fade-right"
            >
                ← Назад
            </button>

            <div className="container" data-aos="fade-up">
                <div className="product-single">
                    <img
                        src={product.image || "/default-image.jpg"}
                        alt={product.title || "Продукт"}
                    />

                    <div className="product-single-text-wrapper">
                        <h1>{product.title || "Название недоступно"}</h1>
                        <p>{product.description || "Описание отсутствует."}</p>

                        <div className="product-price">{product.price} ₽</div>

                        {product.specs && (
                            <div className="product-specs">
                                <strong>Характеристики:</strong>
                                <ul>
                                    {product.specs.map((spec, i) => (
                                        <li key={i}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="product-rating">
                            <div className="product-starts-wrapper">
                                <strong>Рейтинг:</strong>
                                {getStarsArray(Number(product.rating)).map(
                                    (type, i) => (
                                        <FaStar
                                            key={i}
                                            color={
                                                type === "full"
                                                    ? "#ffc107"
                                                    : type === "half"
                                                        ? "#ffd966"
                                                        : "#ccc"
                                            }
                                        />
                                    )
                                )}
                                <span>{product.rating}</span>
                            </div>

                            <button
                                className="project-buy-button"
                                onClick={handleBuy}
                                disabled={!hasToken}
                                style={{
                                    cursor: hasToken ? "pointer" : "not-allowed",
                                    opacity: hasToken ? 1 : 0.5,
                                }}
                            >
                                Купить
                            </button>
                        </div>
                    </div>
                </div>

                {recommended.length > 0 && (
                    <div className="recommended-products" data-aos="fade-up">
                        <h2>Рекомендуемые товары</h2>
                        <ul className="recommended-list">
                            {recommended.map((item, idx) => (
                                <ProjectItem
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    rating={item.rating}
                                    aosDelay={idx * 100}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
