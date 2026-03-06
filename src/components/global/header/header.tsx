import header from "./header.module.css";

export default function Header({ children }: { children: React.ReactNode }) {

  return (

    <nav className={header.root}>
      <div className={header.menuContainer}>

      </div>
      <div className={header.menuContainer}>
        
      </div>
      <div className={header.menuContainer}>
        
      </div>
      <div className={header.menuContainer}>
        
      </div>
      {/* {children} */}
    </nav>

  )

}