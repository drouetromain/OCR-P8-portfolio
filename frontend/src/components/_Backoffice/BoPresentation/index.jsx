function BoPresentation({ _id, title, description, anchorId }) {

  return (
    <div id={_id}>
      <div>Titre de la description : {title}</div>
      <div>Description : {description}</div>
      <div>Ancre : {anchorId}</div>
    </div>
  )
}

export default BoPresentation;
