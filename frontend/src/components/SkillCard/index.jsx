function SkillCard({ title, anchorId, imageUrl, alt, description }) {
    const colorImageUrl = 'https://api.romaindrouet.com/images/color-' + imageUrl.split('/').slice(-1);
    // color-http://localhost:4000/images/logo-html-1703229710433.webp
    return (
        <div id={anchorId}>
            <div>
                <h3 className="hp-h3">{title}</h3>
                <div className="panel">
                    <div className="front card hp-skillcard-img-container">
                        <img src={`https://api.romaindrouet.com${imageUrl}`} alt={alt} className="hp-skillcard-img"/>
                    </div>
                    <div className="back card hp-skillcard-img-container">
                        <img src={colorImageUrl} alt={alt} className="hp-skillcard-img"/>
                    </div>
                </div>

            </div>
            
            <div>{description}</div>
        </div> 
        
    )
}

export default SkillCard