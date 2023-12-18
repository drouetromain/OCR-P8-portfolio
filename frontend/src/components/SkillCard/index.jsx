function SkillCard({ title, anchorId, imageUrl, alt, description }) {
    return (
           <article id={anchorId}>
            <h3>{title}</h3>
            <img src={imageUrl} alt={alt} />
            <div>{description}</div>
        </article> 
        
    )
}

export default SkillCard