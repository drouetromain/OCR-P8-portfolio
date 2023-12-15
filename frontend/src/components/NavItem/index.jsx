function NavItem({ _id, link, target, label }) {
    return (
      <a key={_id} href={link} target={target}>{label}</a>
    )
  }
  
  export default NavItem;