import React from "react";
import styles from "./CardVideogame.module.css";
import { useNavigate } from "react-router-dom";


const CardVideogame = (props) => {


  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/home/${props.id}`)
  }
  return (


    <div className={styles.container}>
      <div className={styles.genres}>

        <button className={styles.detail} onClick={handleNavigate}>
          {props.name.toUpperCase()}
        </button>

        <div className={styles.text}>
          <ul>
            {props.genres?.map((genre) => (
              <li key={genre}> {genre}</li>
            ))}
          </ul>
        </div>
      </div>
      <img
        src={props.background_image}
        alt="error"
        className={styles.img}
      />
    </div>


  );
};

export default CardVideogame;