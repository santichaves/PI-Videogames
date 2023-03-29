import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import{useDispatch, useSelector} from "react-redux"
import {videogamesDetail} from "../../redux/actions/actions"
import NavBar from "../NavBar/NavBar"
import styles from "./VideogameDetail.module.css"



const VideogameDetail = () => {
  const dispatch =useDispatch();
  const params = useParams();
  
  
  useEffect(()=>{
    dispatch(videogamesDetail(params.id))
    console.log(dispatch)
  },[ dispatch, params.id])

  const detail = useSelector((state)=> state.detail);
  console.log(detail);
  return(
    <>
    <div className={styles.page}>
    <NavBar/>
      
      

      <div className={styles.card}>
<div className={styles.game}>
  <div className={styles.detail}>
    <span className={styles.name}>{detail?.name?.toUpperCase()}</span>
    <div className={styles.items}>
      <div className={styles.list}>
        <span>Genres: </span>
        <br />
        <div>
          {detail?.genres?.map((genre) => (
            <div key={genre.id}>
              · {genre.name }
            </div>
          ))}
        </div>
      </div>
      <div className={styles.list}>
        <span>Platforms: </span>
        <br />
        <div className={styles.genres_platforms}>
          {detail.platforms?.map((platform) => (
            <div key={platform?.platform.id}>· {platform.platform.name} </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      Rating: {detail?.rating}
      <br />
      Released: {detail?.released}
    </div>
    <div className={styles.description}>
      <span>Description: </span>
      <br />
      <br />
      <span>
        {decodeURI(detail?.description)
          .split("<p>")
          .join(" ")
          .split("</p>")
          .join("")
          .split("<br />")
          .join("")}
      </span>
    </div>
  </div>
  <div>
    <img
      src={detail.background_image}
      alt="error"
      className={styles.img}
      />
  </div>
</div>
</div>

 

 </div>
 </>
  );
};
export default VideogameDetail;