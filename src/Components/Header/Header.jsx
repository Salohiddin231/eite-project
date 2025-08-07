import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { useAuthStore } from '../../store/authStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Login from '../../layout/Login/Login';
import SignUp from '../../layout/SingUp/SignUp';
import ProfileModal from './ProfileModal';
import logo from '../../assets/icons/logo.png';

export default function Header() {
  const hasToken = !!localStorage.getItem('token');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState('');
  const [showHeader, setShowHeader] = useState(true);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const { auth, authLogout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useCallback((e) => {
    if ((e.key === 'Enter' || e.type === 'click') && search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  }, [search, navigate]);

  const openLogin = () => { setShowLogin(true); setOpenDropdown(false); };
  const openSignUp = () => { setShowSignUp(true); setOpenDropdown(false); };
  const openProfile = () => { setShowProfile(true); setOpenDropdown(false); };
  const logout = () => { authLogout(); localStorage.removeItem('currentUser'); setOpenDropdown(false); navigate('/'); };

  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className={`header ${showHeader ? 'show' : 'hide'}`}>
      <div className="container">
        <div className="header-wrapper">
          <div className="header-logo-wrapper">
            <img src={logo} alt="" />
          </div>

          <nav>
            <ul className="header-list">
              <NavLink to={"/"}>Главная</NavLink>
              <NavLink to={"/projects"}>Продукты</NavLink>
              {hasToken && (
                <li className="header-item">
                  <NavLink to="/purchases" className="header-link">
                    <div className="header-link-content">
                      корзинка
                      <FaShoppingCart />
                    </div>
                  </NavLink>
                </li>
              )}
              {hasToken && (
                <li className="header-item">
                  <NavLink to="/favorites" className="header-link">
                    <div className="header-link-content">
                      избранные
                      <FaHeart />
                    </div>
                  </NavLink>
                </li>
              )}
              <NavLink to={"/about"}>О нас</NavLink>
              <NavLink to={"/contact"}>Контакты</NavLink>
            </ul>
          </nav>

          <div className="header-login">
            <div className="header-mini-logo" ref={dropdownRef}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <RxAvatar
                className="header-svg"
              />
              <span className="header-username">
                {hasToken ? (currentUser?.name?.length > 0 ? currentUser.name : 'login') : 'login'}
              </span>

              {openDropdown && (
                <ul className="dropdown-menu">
                  {auth ? (
                    <>
                      <li onClick={openProfile}>Профиль</li>
                      <li onClick={logout}>Выйти</li>
                    </>
                  ) : (
                    <>
                      <li onClick={openLogin}>Войти</li>
                      <li onClick={openSignUp}>Регистрация</li>
                    </>
                  )}
                </ul>
              )}
              {showLogin && <Login onClose={() => setShowLogin(false)} />}
              {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
              {showProfile && (
                <ProfileModal
                  user={currentUser}
                  onClose={() => setShowProfile(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
