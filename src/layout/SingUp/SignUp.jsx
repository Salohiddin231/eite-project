import { useState } from "react";

function SignUp({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setMessage("❌ Email уже зарегистрирован");
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("✅ Успешная регистрация!");
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="modal">
      <div className="signup">
        <form className="signup_form" onSubmit={handleRegister}>
          <h1 className="signup_title">Регистрация</h1>

          <input
            className="signup_inp"
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="signup_inp"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Введите корректный email"
          />

          <input
            className="signup_inp"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            title="Пароль должен содержать минимум 6 символов, включая буквы и цифры"
          />

          <button className="signup_btn_form" type="submit">
            Зарегистрироваться
          </button>

          {message && <p className="signup_message">{message}</p>}

          <button className="login-signup" type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
