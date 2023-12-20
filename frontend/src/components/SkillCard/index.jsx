function SkillCard({ title, anchorId, imageUrl, alt, description }) {
    return (
        <div id={anchorId}>
            <div>
                <h3 className="hp-h3">{title}</h3>
                <div className="hp-skillcard-img-container">
                    <img src={imageUrl} alt={alt} className="hp-skillcard-img"/>
                </div>
            </div>
            
            <div>{description}</div>
        </div> 
        
    )
}

export default SkillCard