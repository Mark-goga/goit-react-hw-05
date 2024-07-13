import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { getFilmActor } from "../../feach-api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import css from './MovieCast.module.css'

export default function MovieCast() {
  const [film, setFilm] = useState(null);
  const { moviesId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFilm() {
      setLoader(true);
      setError(false);
      try {
        const data = await getFilmActor(moviesId);
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
        <div>
          <ul>
            {film.cast.map((cast) => {
              return (
                <li key={cast.id} className={css.item}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${cast.profile_path}`}
                    alt=""
                    width='100px'
                    
                  />
                  <p>{cast.name}</p>
                  <p>Character: {cast.character}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
