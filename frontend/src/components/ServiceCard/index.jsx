import Tag from '../../components/Tag/'

function ServiceCard({ _id, title, description, anchorId }) {
    return (
      <div key={_id} id={anchorId}>
        <h3 className="hp-h3">{title}</h3>
        <div>{description}</div>
      </div>
    )
  }

export default ServiceCard