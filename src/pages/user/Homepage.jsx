import "./Homepage.css";
import "../../styles/main.css";
import { ArrowRight } from "lucide-react";

function Homepage() {
    return (
        <section className="homepage">
            <div className="hero-section container">
                <span>Curated skincare from asia</span>
                <h1>A Calmer routine starts here.</h1>
                <p>Effective, gentle formulas selected to make daily skincare feel clear and considered.</p>

                <div className="btn-row">
                    <button className="btn btn-primary">Shop all skincare</button>
                    <button className="btn btn-secondary">Meet Cherry Cheeks <ArrowRight /></button>
                </div>
            </div>
        </section>
    )
}

export default Homepage;