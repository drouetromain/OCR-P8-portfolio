function Presentation({ _id, title, description, anchorId }) {
    return (
      <div key={_id} id={anchorId}>
        <h2>{title}</h2>
        <div>{description}</div>
      </div>
    )
  }
  
  export default Presentation;