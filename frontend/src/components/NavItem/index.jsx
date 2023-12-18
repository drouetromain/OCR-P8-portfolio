import '../Hp.css'

function NavItem({ _id, link, target, label }) {
  return (
      <div className='hp-nav-item'>
        <a key={_id} href={link} target={target}>{label}</a>
      </div>
      
    )
  }
  
  export default NavItem;