import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { getFilmReviews } from "../../feach-api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [film, setFilm] = useState(null);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFilm() {
      setLoader(true);
      setError(false);
      try {
        const data = await getFilmReviews(movieId);
        setFilm(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchFilm();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {!loader && !error && film && film.results.length > 0 ? (
        <div>
          <ul>
            {film.results.map((review) => {
              return (
                <li key={review.id} className={css.item}>
                  <p>Author: {review.author}</p>
                  <p>Review: {review.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>We dont have any reviews for this movie</p>
      )}
    </div>
  );
}
