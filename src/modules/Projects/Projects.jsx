import { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import ProjectItem from './ProjectItem';
import Header from '../../Components/Header/Header';
import { useFakeProjects } from '../shared/useFakeProjects';
import { FaFilter } from 'react-icons/fa';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import rek from '../../assets/images/reklama.webp'

const PRODUCT_TYPES = ['Компьютеры', 'Мониторы', 'Клавиатуры', 'Видеокарты', 'Корпуса', 'Ноутбуки', 'Мыши'];

export default function Projects() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [shuffledProjects, setShuffledProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const { builds, monitors, keyboards, gpus, cases, note_books, mouse, loading } = useFakeProjects();

  useEffect(() => {
    const allProjects = [...builds, ...monitors, ...keyboards, ...gpus, ...cases, ...note_books, ...mouse];
    const shuffled = [...allProjects].sort(() => Math.random() - 0.5);
    setShuffledProjects(shuffled);
  }, [builds, monitors, keyboards, gpus, cases, note_books, mouse]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Фильтрация с учетом поиска и выбранных типов
  const filteredProjects = shuffledProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(project.type);
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Header />

      <section className="projects">
        <div className="container" data-aos="fade-up">
          <h2>Наши Продукты</h2>
          <p className="projects-subtitle">
            Примеры компьютеров, которые мы собрали для клиентов — сбалансированные, мощные и проверенные.
          </p>
          <div className="projects-controls">
            <input
              type="text"
              placeholder="Поиск продуктов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <div className="dropdown">
              <button onClick={() => setShowDropdown(!showDropdown)} className="dropdown-button">
                <FaFilter />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={selectedTypes.length === 0}
                      onChange={() => setSelectedTypes([])} // Сброс фильтра
                    />
                    Все продукты
                  </label>

                  {PRODUCT_TYPES.map((type) => (
                    <label key={type} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <div className="loading-indicator">Загрузка данных...</div>
          ) : (
            <ul className="projects-grid">
              {filteredProjects.map((project, index) => (
                <li key={project.id} data-aos="fade-up" data-aos-delay={index * 1}>
                  <ProjectItem
                    id={project.id}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    price={project.price}
                    rating={project.rating}
                  />
                </li>
              ))}
            </ul>
          )}
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
