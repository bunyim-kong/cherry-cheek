import { Link } from 'react-router-dom';
import cleanserImage from '../../assets/images/cleanser.jpg';
import moisturizeImage from '../../assets/images/moisturize.jpg';
import './About.css';

const projectValues = [
    {
        number: '01',
        title: 'A focused collection',
        copy: 'Products are grouped by routine step and skin concern, making the shop easier to explore without an overwhelming catalog.',
    },
    {
        number: '02',
        title: 'Clear product details',
        copy: 'Useful descriptions, simple directions and familiar categories help shoppers understand where each formula belongs.',
    },
    {
        number: '03',
        title: 'A calm experience',
        copy: 'Warm colors, readable type and straightforward navigation keep the focus on choosing a routine with confidence.',
    },
];

function About() {
    return (
        <div className="project-about">
            <section className="project-about__hero container">
                <div className="project-about__intro">
                    <p className="project-about__eyebrow">About the project</p>
                    <h1>A simpler way to discover everyday skincare.</h1>
                </div>

                <div className="project-about__summary">
                    <p>
                        Cherry Cheek is a modern skincare shopping project designed
                        around clear choices, useful product information and routines
                        that feel easy to follow.
                    </p>
                    <Link className="project-about__link" to="/shop">
                        Visit the shop <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>

            <section className="project-about__feature container" aria-labelledby="project-heading">
                <div className="project-about__portrait">
                    <img
                        src={cleanserImage}
                        alt="Skincare products arranged in soft natural light"
                        width="1200"
                        height="1797"
                    />
                </div>

                <div className="project-about__feature-copy">
                    <p className="project-about__eyebrow">Our current focus</p>
                    <h2 id="project-heading">Built for thoughtful, consistent routines.</h2>
                    <p>
                        The project brings product discovery, routine categories and
                        a clean shopping experience into one place. Every part of the
                        interface is shaped to help people move from browsing to a
                        routine that makes sense for them.
                    </p>

                    <div className="project-about__landscape">
                        <img
                            src={moisturizeImage}
                            alt="A moisturizer shown in a warm minimal setting"
                            width="1000"
                            height="770"
                        />
                    </div>
                </div>
            </section>

            <section className="project-about__values container" aria-labelledby="values-heading">
                <div className="project-about__values-heading">
                    <p className="project-about__eyebrow">What guides us</p>
                    <h2 id="values-heading">Designed around what shoppers need.</h2>
                </div>

                <div className="project-about__value-list">
                    {projectValues.map((value) => (
                        <article className="project-about__value" key={value.number}>
                            <span>{value.number}</span>
                            <h3>{value.title}</h3>
                            <p>{value.copy}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;
