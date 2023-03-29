import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NabVar from "../NavBar/NavBar";
import { getAllVideogames, orderByName, orderByRating, findVideogames, getGenres } from "../../redux/actions/actions";
import FilterGenre from '../FilterGenre/FilterGenre';
import OriginFilter from '../OriginFilter/OriginFilter';
import CardVideogame from '../CardVideogames/CardVideogame'
import styles from './Home.module.css';



const Home = () => {
  const videogames = useSelector((state) => state.videogamesAux);
  
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState('');
  const [orderRating, setOrderRating] = useState('');
  const [page, setPage] = useState(1);
  const videogamesPerPage = 15;
  const pages = [];
  const lastIndex = page * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;
  const pageVideogames = videogames?.slice(firstIndex, lastIndex);
  console.log(pageVideogames);
  const pagesNumber = Math.ceil(videogames?.length / 15);
  
  for (let i = 1; i <= pagesNumber; i++) {
    pages.push([i]);
  }

  useEffect(() => {
    dispatch(getAllVideogames())
    dispatch(getGenres())
  }, [])

  const handlerPageChanges = (newPage, paging) => {
    if (newPage) {
      setPage(newPage[0]);
    } else if (page !== pagesNumber && paging === "+") {
      setPage(page + 1);
    } else if (page !== 1 && paging === "-") {
      setPage(page - 1);
    }
  };

  const handlerOrderName = (e) => {
    setOrderName(e.target.id);
    dispatch(orderByName(e.target.id));
  };
  const handlerOrderRating = (e) => {
    setOrderRating(e.target.id);
    dispatch(orderByRating(e.target.id));
  }
  const handlerOnSearch = (e) => {
    if (e.target.value) {
      dispatch(findVideogames(e.target.value));
      setPage(1);
    } else {
      dispatch(getAllVideogames())
    }
    console.log(e.target.value)
  };


  return (
    <div className={styles.container}>
      <NabVar />
      <div style={{
        display: "flex",
        justifyContent: "space-between",
      }}>

        <nav>
          <div className={styles.navLat}>

            <label htmlFor="search">
              Search Videogames:
              <input id="search" type="search" placeholder="Videogames name ..." onChange={(e) => handlerOnSearch(e)} className={styles.var} />
            </label>
          </div>
          <div className={styles.fil}>
            <div className={styles.filters}>
              <h4>Filters</h4>

              <OriginFilter setPage={setPage} />
              <FilterGenre setPage={setPage} />
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.order}>

              <div className={styles.tittle}>
                <h4>Orders:</h4></div>
              <h4>Name</h4>
              <div className={styles.order}>
                <label htmlFor="as" className={styles.input}>
                  <input type="radio" name="orderName" id="as" checked={orderName === "as"} onChange={(e) => handlerOrderName(e)} />
                  A - Z
                </label>
                <label htmlFor="des" className={styles.input}>
                  <input type="radio" name="orderName" id="des" checked={orderName === "des"} onChange={(e) => handlerOrderName(e)} />
                  Z - A
                </label>
              </div>
              <h4 >
                Rating
              </h4>
              <div className={styles.order}>
                <label htmlFor="up">
                  <input type="radio" name="Order Rating" id="up" checked={orderRating === "up"} onChange={(e) => handlerOrderRating(e)} />
                  Ascending
                </label>
                <label htmlFor="down">
                  <input type="radio" name="Order Rating" id="down" checked={orderRating === "down"} onChange={(e) => handlerOrderRating(e)} />
                  Descending
                </label>

              </div>
            </div>
          </div>
        </nav>

        {videogames?.length > 0 ?
          <div>

            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexWrap: 'wrap',

            }}>
              {pageVideogames.map((game) => {
                return <CardVideogame
                  id={game?.id}
                  key={game?.id}
                  name={game?.name}
                  background_image={game?.background_image}
                  genres={game?.genres}
                />
              })}
            </div>
          </div>
          :
          <div className={styles.all}>

          </div>
        }
      </div>
      <div className={styles.number}>
        {videogames?.length > 0 && (
          <div className={styles.paging}>
            {pages.length > 1 && (
              <button id="-" onClick={(e) => handlerPageChanges(null, e.target.id)} className={styles.font} >
                PREV
              </button>
            )}
            {pages.map((newPage) => (
              <button
                key={newPage}
                onClick={() => handlerPageChanges(newPage)}
                className={styles.font}
              >
                {newPage}
              </button>
            ))}
            {pages.length > 1 && (
              <button
                id="+"
                onClick={(e) => handlerPageChanges(null, e.target.id)}
                className={styles.font}
              >
                NEXT
              </button>
            )}
          </div>
        )}
      </div>
    </div>



  );
};
//---------------------------------------------------------------------
export default Home;
