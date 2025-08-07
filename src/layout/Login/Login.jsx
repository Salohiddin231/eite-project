import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const tryLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      const token = `${email}-token`;
      setAuth(token);
      setMessage("✅ Успешный вход!");

      localStorage.setItem("currentUser", JSON.stringify({
        email: foundUser.email,
        name: foundUser.name || "",
        password: foundUser.password,
        type: "local"
      }));

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1000);
    } else {
      setMessage("❌ Неверный email или пароль.");
    }
  };

  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

    if (isValidEmail && isValidPassword) {
      tryLogin(email, password);
    }
  }, [email, password]);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const token = credentialResponse.credential;

      setAuth(token);
      setMessage(`👋 Добро пожаловать, ${decoded.name || decoded.email}!`);

      localStorage.setItem("currentUser", JSON.stringify({
        email: decoded.email,
        name: decoded.name,
        type: "google"
      }));

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Ошибка при декодировании токена:", err);
      setMessage("❌ Ошибка при входе через Google.");
    }
  };

  return (
    <div className="modal">
      <div className="login">
        <form className="login_form" onSubmit={(e) => e.preventDefault()}>
          <h1 className="login_title">Вход</h1>

          <input
            className="login_inp"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Введите корректный email"
          />


          <input
            className="login_inp"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            title="Пароль должен содержать минимум 6 символов, включая буквы и цифры"
          />

          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setMessage("❌ Ошибка входа через Google")}
              useOneTap
            />
          </div>

          {message && <p className="login_message">{message}</p>}

          <button className="login-signup" type="button" onClick={onClose}>
            Закрыть
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
