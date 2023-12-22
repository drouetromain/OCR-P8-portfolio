import { gsap } from "gsap";

function Hero({ title, anchorId, imageUrl, alt, subTitle }) {
    document.onload = function () {

    }

    return (
        <div id={anchorId}>
            <div class='content'>
                <div class='visible'>
                    <p>
                    This
                    </p>
                    <ul>
                    <li>Static</li>
                    <li>Pure</li>
                    <li>Awesome</li>
                    <li>CSS</li>
                    </ul>
                </div>
            </div>

            <img src='http://localhost:4000/images/hero-drouet-romain-1920px-couleurs-transparent-1703172051320.webp' alt={alt} className="hp-hero-img" />
            <img src={imageUrl} alt={alt} className="hp-hero-img" />
            <div className="background-container">
                <div className="stars"></div>
                
                <div className="twinkling"></div>
            </div>
            <h1 className="hp-h1">{title}</h1>
            <div>{subTitle}</div>
        </div>
    )
}

export default Hero;