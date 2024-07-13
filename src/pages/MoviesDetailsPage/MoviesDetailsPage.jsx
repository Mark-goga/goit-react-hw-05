import { Outlet, useParams, useLocation, Link } from "react-router-dom";
import { getFilmById } from "../../feach-api";
import {NavLink} from 'react-router-dom'
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useEffect, useState  , useRef, Suspense} from "react";
import css from "./MoviesDetailsPage.module.css";

export default function MoviesDetailsPage() {
  const [film, setFilm] = useState(null);
  const { moviesId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLink = useRef(location.state ?? '/');

  useEffect(() => {
    async function fetchFilm() {
      setLoader(true);
      setError(false); 
      try {
        const data = await getFilmById(moviesId);
        setFilm(data);
      } catch (error) {
        setError(true);

      } finally {
        setLoader(false);
      }
    }
    fetchFilm();
  }, [moviesId]);

  return (
    <div>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {!loader && !error && film && (
        <div className={css.container}>
          <div>
            <Link to={backLink.current}>Go back</Link>
            <div className={css.wrapFilm}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${film.poster_path}`}
                alt={film.title}
                className={css.filmImg}
              />
              <div className={css.wrapInf}>
                <h2>{film.title}</h2>
                <p>User Score: {film.vote_average}</p>
                <h3>Overview</h3>
                <p>{film.overview}</p>
                <h4>Genres</h4>
                <p>
                  {film.genres &&
                    film.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className={css.wrapInformation}>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Suspense fallback={<div>loading child route component</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
