function ServiceCard({ _id, title, description, anchorId, tags }) {
    const displayTags = tags ? tags.map(({ _id, tag }) => <span key={_id} className="hp-services-tag">{tag}</span>) : <h1>Vide</h1>;
    return (
      <div key={_id} id={anchorId}>
        <h3 className="hp-h3">{title}</h3>
            <div className="hp-services-description">{description}</div>
            <div className="hp-services-tags-block">
                {displayTags}
            </div>
            
      </div>
    )
  }

export default ServiceCard