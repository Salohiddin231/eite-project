import { useState } from 'react';
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { FaBoxOpen } from 'react-icons/fa';
import { FaDesktop } from 'react-icons/fa';
import { FaMicrochip } from 'react-icons/fa';
import { IoClose, IoMenu } from 'react-icons/io5';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaBoxes, FaChevronDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';
import { MdComputer } from 'react-icons/md';
import { PiMouseSimpleFill } from 'react-icons/pi';

export default function SideBar({ isOpen, setIsOpen }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleProducts = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsProductsOpen(false);
    } else {
      setIsProductsOpen(prev => !prev);
    }
  };
  const hasToken = !!localStorage.getItem('token')


  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        {/* Logo */}
        <li className="sidebar-logo">
          {isOpen ? (
            <div className="sidebar-logo-full">
              <img src={logo} alt="Logo" className="sidebar-logo-img" />
              <span>Elite</span>
            </div>
          ) : (
            <img src={logo} alt="Logo" className="sidebar-logo-img" />
          )}

        </li>


        <li className="sidebar-item">
          <NavLink to="/" className="sidebar-link">
            <div className="sidebar-link-content">
              <FaHome />
              {isOpen && <span>Главная</span>}
            </div>
          </NavLink>
        </li>

        {/* Услуги
        <li className="sidebar-item">
          <NavLink to="/services" className="sidebar-link">
            <div className="sidebar-link-content">
              <FaTools />
              {isOpen && <span>Услуги</span>}
            </div>
          </NavLink>
        </li> */}

        {/* Контакты */}
        <li className="sidebar-item">
          <NavLink to="/about" className="sidebar-link">
            <div className="sidebar-link-content">
              <FaInfoCircle />
              {isOpen && <span>О нас</span>}
            </div>
          </NavLink>
        </li>

        {/* Продукты */}
        <li className="sidebar-item">
          <a className="sidebar-link" onClick={toggleProducts}>
            <div className="sidebar-link-content">
              <FaBoxOpen />
              {isOpen && (
                <>
                  <span>Продукты</span>
                  <FaChevronDown
                    style={{
                      marginLeft: 'auto',
                      transition: 'transform 0.3s',
                      transform: isProductsOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </>
              )}
            </div>
          </a>

          {/* Подменю */}
          {isOpen && (
            <ul className={`sidebar-submenu ${isProductsOpen ? 'open' : ''}`}>
              <li className="sidebar-item">
                <NavLink to="/products/monitors" className="sidebar-link">
                  <FaDesktop className='sidebar-icon' />
                  {isOpen && <span>Мониторы</span>}
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/products/components" className="sidebar-link">
                  <FaMicrochip className='sidebar-icon' />
                  {isOpen && <span>Части</span>}
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/projects" className="sidebar-link">
                  <FaProjectDiagram className='sidebar-icon' />
                  {isOpen && <span>Сборки</span>}
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to='/products/notebooks' className="sidebar-link">
                  <MdComputer className='sidebar-icon' />
                  {isOpen && <span>Ноутбуки</span>}
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to='/products/mouse' className="sidebar-link">
                  <PiMouseSimpleFill className='sidebar-icon' />
                  {isOpen && <span>Мышки</span>}
                </NavLink>
              </li>
            </ul>
          )}
        </li>


        {hasToken && (
          <>
            <li className="sidebar-item">
              <NavLink to="/my-products" className="sidebar-link">
                <div className="sidebar-link-content">
                  <FaBoxes />
                  {isOpen && <span>Мои продукты</span>}
                </div>
              </NavLink>
            </li>
          </>
        )}


        {/* Контакты */}
        <li className="sidebar-item">
          <NavLink to="/contact" className="sidebar-link">
            <div className="sidebar-link-content">
              <FaEnvelope />
              {isOpen && <span>Контакты</span>}
            </div>
          </NavLink>
        </li>

        {/* Кнопка сворачивания */}
        <li className={`sidebar-toggle ${isOpen ? 'open' : ''}`}>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <IoMenu />
            {isOpen && <span>Скрыть</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}
