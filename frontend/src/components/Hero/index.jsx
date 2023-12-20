function Hero({ title, anchorId, imageUrl, alt, subTitle }) {
    return (
        <div id={anchorId}>
            <img src={imageUrl} alt={alt} className="hp-hero-img"/>
            <h1 className="hp-h1">{title}</h1>
            <div>{subTitle}</div>
            
            
        </div>
    )
}

export default Hero;