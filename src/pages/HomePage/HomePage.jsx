import { useEffect, useState} from "react";
import {Link , useLocation} from 'react-router-dom'
import { getTrendFilm } from "../../feach-api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from './HomePage.module.css'

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setLoader(true);
    setError(false);
    async function getFilm()  {
      try {
        const data = await getTrendFilm();
        setFilms(data.results)
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getFilm();
  } , [])
  return (
    <div className={css.box}>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {!loader && !error && films && (
      <div>
        <h1>Trend Film</h1>
        <ul>
          {films.map((film) => {
            return (
              <li key={film.id}>
                <Link to={`/movies/${film.id}`} state={location}>
                  {film.original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>)}
    </div>
  );
}