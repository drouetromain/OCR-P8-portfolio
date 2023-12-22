function Presentation({ _id, title, description, anchorId }) {
    return (
      <div key={_id} id={anchorId}>
        <h2 className="hp-h2 gradient-text">{title}</h2>
        <div className="hp-description">{description}</div>
      </div>
    )
  }
  
  export default Presentation;