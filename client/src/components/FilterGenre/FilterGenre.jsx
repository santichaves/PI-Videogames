import { React, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres,  } from "../../redux/actions/actions.js";
import styles from "./FilterGenre.module.css";
 
const FilterGenres = ({ setPage }) => {
  const errorFilter = useSelector((state) => state.errorFilter);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);


  
  const handleOnChange = (e) => {
    e.preventDefault();
    if (!filters.includes(e.target.value)) {
      let arr= filters.slice()
      arr.push(e.target.value);
      
      setFilters(arr)
      dispatch(filterByGenres(arr));

      console.log()
      
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setFilters([]);
    dispatch(filterByGenres([]));
  };

  return (
    <div>
      <label htmlFor="genres">
        Genres:
        <br />
        {errorFilter && <span>No videogames</span>}
        <select
          id="genres"
          onChange={(e) => handleOnChange(e)}
          className={styles.genres}
        >
          <option>All </option>
          {genres.map((genre,index) => (
            <option value={genre?.name} key={index}>
              {genre?.name}
            </option>
          ))}
        </select>
        <button className={styles.button} onClick={(e) => handleOnClick(e)}>
          x</button>
        <br />
        {filters.length > 0 &&
          filters.map((filter, index) => (
            <span key={index}>
              · {filter} <br />
            </span>
          ))}
      </label>
    </div>
  );
};

export default FilterGenres;

