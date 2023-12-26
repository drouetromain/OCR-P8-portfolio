import { gsap } from "gsap";

function Hero({ title, anchorId, imageUrl, alt, subTitle }) {

    return (
        <div id={anchorId}>
            <div class='content'>
                <div class='visible'>
                    <p>
                    {/* This */}
                    </p>
                    <ul>
                    <li>ROMAIN</li>
                    <li>DROUET</li>
                    <li>.COM</li>
                    {/* <li>CSS</li> */}
                    </ul>
                </div>
            </div>
            {/* <h1>
                <span>{title}</span>
                <div class="message">
                    <div class="word1">close</div>
                    <div class="word2">code</div>
                    <div class="word3">creating</div>
                </div>
            </h1> */}


            <div class="sp-container">
            <div class="sp-content">
                {/* <div class="sp-globe"></div> */}
                <div className="hp-hero-h1-block">
                    <div className="frame-1 hp-hero-subtitle">HELLO.</div>
                    <div className="frame-2 hp-hero-subtitle">I'M ROMAIN</div>
                    <div className="frame-3 hp-hero-subtitle">FREELANCE WEB DEVELOPER</div>
                    {/* <h2 class="frame-4">TEST IT!</h2> */}
                </div>
                
                <div className="hp-hero-subtitle-block">
                    <h2 class="frame-5">
                        <span>Think, </span>
                        <span>Design, </span>
                        <span>Develop !</span>
                    </h2>
                </div>
                
            </div>
            </div>


            <img src='http://localhost:4000/images/hero-drouet-romain-1920px-couleurs-transparent-1703172051320.webp' alt={alt} className="hp-hero-img" />
            <img src={imageUrl} alt={alt} className="hp-hero-img" />
            <div className="background-container">
                <div className="stars"></div>
                
                <div className="twinkling"></div>
            </div>
            {/* <h1 className="hp-h1">{title}</h1>
            <div>{subTitle}</div> */}
        </div>
    )
}

export default Hero;