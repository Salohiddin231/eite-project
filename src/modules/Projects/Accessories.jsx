import { useEffect } from 'react';
import Header from '../../Components/Header/Header';
import ProjectItem from './ProjectItem';
import { useFakeProjects } from '../shared/useFakeProjects';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Accessories() {
    const { gpus: projectList, keyboards: projectKlava, cases: projectKorpus, loading } = useFakeProjects();

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    return (
        <>
            <Header/>
            <section className="projects">
                <div className="container" data-aos="fade-up">
                    <h2>Наши Комплектующие</h2>
                    <p className="projects-subtitle">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi enim, molestias cupiditate maxime molestiae fuga laborum voluptas incidunt doloribus facere!
                    </p>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.3rem', color: '#888' }}>Загрузка...</div>
                    ) : (
                        <>
                            <h3 className="project-section" data-aos="fade-up">Видеокарты</h3>
                            <ul className="projects-grid" data-aos="fade-up" data-aos-delay="100">
                                {projectList.map((project, index) => (
                                    <ProjectItem key={index} {...project} />
                                ))}
                            </ul>

                            <h3 className="project-section" data-aos="fade-up">Клавиатуры</h3>
                            <ul className="projects-grid" data-aos="fade-up" data-aos-delay="200">
                                {projectKlava.map((project, index) => (
                                    <ProjectItem key={index} {...project} />
                                ))}
                            </ul>

                            <h3 className="project-section" data-aos="fade-up">Корпусы</h3>
                            <ul className="projects-grid" data-aos="fade-up" data-aos-delay="300">
                                {projectKorpus.map((project, index) => (
                                    <ProjectItem key={index} {...project} />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
