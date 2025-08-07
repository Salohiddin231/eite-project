import React, { useState, useEffect } from "react";
import {
  useFakeProjects,
  addUserProduct,
  removeUserProduct,
  clearUserProducts,
} from "../shared/useFakeProjects";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const MyProductsPage = () => {
  const { user: myProducts, refreshUserProducts } = useFakeProjects();
  const [products, setProducts] = useState(myProducts || []);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    setProducts(myProducts || []);
  }, [myProducts]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = ev.target.result;
        setForm((f) => ({ ...f, image: img }));
        setImgPreview(img);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const { title, price, image } = form;
    if (!title.trim() || !price.trim() || !image) return;
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) return;

    addUserProduct({ ...form, price: numericPrice });
    setForm({ title: "", price: "", description: "", image: "" });
    setImgPreview("");
    setShowForm(false);


    refreshUserProducts();
  };

  const handleRemove = (id) => {
    removeUserProduct(id);
    refreshUserProducts();
  };

  const handleClear = () => {
    clearUserProducts();
    refreshUserProducts();
  };

  return (
    <>
      <button
        className="back"
        onClick={() => navigate(-1)}
        data-aos="fade-right"
      >
        ← Назад
      </button>

      <div className="purchases-page container" data-aos="fade-up">
        <h2>Мои продукты на продажу</h2>
        <div className="purchased-list">
          {(!products || products.length === 0) && (
            <div style={{ color: "#aaa", fontSize: "1.1rem", marginBottom: 20 }}>
              Здесь появятся ваши продукты, выставленные на продажу.
            </div>
          )}

          {products &&
            products.map((prod) => (
              <div
                className="purchased-item"
                key={prod.id}
                data-aos="fade-up"
                data-aos-delay={prod.id * 50}
              >
                {prod.image && (
                  <img
                    src={prod.image}
                    alt={prod.title}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginRight: 20,
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h4>{prod.title}</h4>
                  <p style={{ fontSize: "1rem", color: "#fff" }}>{prod.description}</p>
                  <div className="project-price">{prod.price} $</div>
                </div>
                <button className="btn-secondary" onClick={() => handleRemove(prod.id)}>
                  Удалить
                </button>
              </div>
            ))}

          {products && products.length > 0 && (
            <button className="btn-secondary" style={{ marginTop: 16 }} onClick={handleClear}>
              Очистить всё
            </button>
          )}

          {showForm ? (
            <form
              onSubmit={handleAdd}
              style={{
                width: "100%",
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              data-aos="fade-up"
            >
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Название продукта"
                required
                style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Цена"
                type="number"
                required
                min={0}
                step="0.01"
                style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Описание"
                rows={2}
                style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ padding: 8, borderRadius: 6 }}
              />
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    margin: "8px 0",
                  }}
                />
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button className="project-buy-button" type="submit">
                  Добавить
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <button
              className="project-buy-button"
              style={{ width: 220, marginTop: 24 }}
              onClick={() => setShowForm(true)}
              data-aos="fade-up"
            >
              + Добавить продукт
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProductsPage;
