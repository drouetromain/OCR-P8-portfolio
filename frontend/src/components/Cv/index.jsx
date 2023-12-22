function Cv({ _id, title, description, linkLabel, documentUrl, anchorId }) {
    return (
      <div key={_id} id={anchorId} className='hp-cv-block hp-div'>
        <h2 className="hp-h2 gradient-text">{title}</h2>
        <div className="hp-description">{description}</div>
        <div>
          <a href={documentUrl} target="_blank" rel="noreferrer" className="hp-btn">{linkLabel}</a>
        </div>
        
      </div>
    )
  }
  
  export default Cv;