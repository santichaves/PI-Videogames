import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Landing.module.css'
import { useDispatch } from 'react-redux'
import { getAllVideogames, getGenres } from '../../redux/actions/actions'

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllVideogames())
    dispatch(getGenres())
  }, [])

  const handlerStart = (e) => {
    e.preventDefault();
    return navigate
  }

  return (

    <div className={styles.container}>
      <div>
        <p className={styles.text}>
        Welcome to my web site realized at the stage of individual project of the educational academy SoyHenry.
         In this page, you can learn information about Videogames, as well as access to filtering
          and sorting features to facilitate your search for the information you need, enjoy it. 
          Done by Santiago Chaves.
        </p>
      </div>
      <Link to="/home">
        <input type="button" className={styles.button} onClick={(e) => handlerStart} />
      </Link>
    </div>


  )
}
export default Landing;