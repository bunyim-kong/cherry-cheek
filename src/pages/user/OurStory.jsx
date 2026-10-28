import Button from '../../components/Button';
import storyImage from '../../assets/images/our-story-1.jpg';
import './OurStory.css';

function OurStory() {
    return (
        <div className="about-page">
            <section className="container about-hero">
                <div>
                    <p className="eyebrow">About Cherry Cheek</p>
                    <h1>
                        <span>Skincare</span>
                        <span>should feel</span>
                        <span>easier to</span>
                        <span>understand.</span>
                    </h1>
                </div>
                <p>
                    We curate a focused collection of formulas with a clear role in
                    real routines. Each product is selected for comfort, clarity and
                    consistent use.
                </p>
            </section>

            <section className="container editorial editorial--reverse">
                <div className="editorial__image">
                    <img
                        src={storyImage}
                        alt="A skincare ritual in soft natural light"
                        width="1300"
                        height="1500"
                    />
                </div>

                <div className="editorial__copy">
                    <p className="eyebrow">Our approach</p>
                    <h2>A considered shelf, not an endless one.</h2>
                    <p>
                        We organize products by routine step, skin type and concern so
                        you can compare what matters. Clear descriptions and practical
                        directions come before trends.
                    </p>
                    <Button to="/shop">
                        Explore the collection
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default OurStory;
