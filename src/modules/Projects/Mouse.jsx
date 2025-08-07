import Header from '../../Components/Header/Header';
import ProjectItem from './ProjectItem';
import { useFakeProjects } from '../shared/useFakeProjects';

export default function Mouse() {
    const { mouse: projectList, loading } = useFakeProjects();

    return (
        <>
            <Header />
            <section className="projects">
                <div className="container" data-aos="fade-up">
                    <h2>Наши Мишки</h2>
                    <p className="projects-subtitle">
                        Наши Мишки прекрасно подходят для долгих работ за компьютером или игр за ним
                    </p>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.3rem', color: '#888' }}>
                            Загрузка...
                        </div>
                    ) : (
                        <ul className="projects-grid">
                            {projectList.map((project, index) => (
                                <li
                                    key={project.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
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
        </>
    );
}
