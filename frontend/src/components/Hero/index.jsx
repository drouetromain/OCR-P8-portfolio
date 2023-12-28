function Hero({ title, anchorId, imageUrl, alt, subTitle }) {


    return (
        <div id={anchorId}>
            <div className="sp-container">
            <div className="sp-content">
                {/* <div class="sp-globe"></div> */}
                <div className="hp-hero-h1-block">
                    <div className="frame-1 hp-hero-subtitle">HELLO.</div>
                    <div className="frame-2 hp-hero-subtitle">I'M ROMAIN</div>
                    <div className="frame-3 hp-hero-subtitle">FREELANCE WEB DEVELOPER</div>
                </div>
                
                <div className="hp-hero-subtitle-block">
                    <h2 className="frame-5">
                        <span>Think, </span>
                        <span>Design, </span>
                        <span>Develop !</span>
                    </h2>
                </div>
                
            </div>
            </div>
            {/* <img src='https://api.romaindrouet.com/images/hero-drouet-romain-1920px-couleurs-transparent-1703172051320.webp' alt={alt} className="hp-hero-img" /> */}
            {/* <img src={`https://api.romaindrouet.com${imageUrl}`} alt={alt} className="hp-hero-img" id="js-hero-img"/> */}
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