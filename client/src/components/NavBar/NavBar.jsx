import React from "react";
import styles from "./NavBar.module.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {

 

  return (

    <div className={styles.container}>
      <NavLink to="/form" className={styles.link}>
        <div className={styles.div}>Create </div>
      </NavLink>

      <div className={styles.logo}>
        <NavLink to="/home"
        >
          {" "}
          
          <img
            className={styles.img} src="https://imgs.search.brave.com/JnyGgYl68rZ0_E4hWgSQm2C4jEuIEKYRuSn4-O0AHdg/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/aEwyQ09yeXdrQW9q/M0lxRTNKdW1BSGFG/aiZwaWQ9QXBp"
            alt="image" />
        </NavLink>
      </div> 

    </div>



  )

}
export default NavBar;
