import {Link , useLocation , useSearchParams} from 'react-router-dom'

import { useEffect, useId, useState } from "react";
import { getFilmBySearch } from "../../feach-api";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


export default function MoviesPage() {


  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("query") ?? "");
  const inputId = useId();
  const [film, setFilm] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  
  function handleChange(evn) {
    setSearch(evn.currentTarget.value)
    searchParams.set('query', evn.currentTarget.value);
    setSearchParams(searchParams);
  }
  
  function handleSubmit() {
    async function fetchFilm() {
      setLoader(true);
      setError(false);
      try {
        const data = await getFilmBySearch(search);    
        setFilm(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchFilm();
  }
  useEffect(() => {
    if (search !== "" && !film && !loader && !error) {
      handleSubmit();
    }
  } , [])
    return (
      <div>
        <label htmlFor={inputId}>Search film</label>
        <input
          type="text"
          id={inputId}
          value={search}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {!loader && !error && film && (
          <ul>
            {film.results.map((fil) => {
              return (
                <li key={fil.id}>
                  <Link to={`/movies/${fil.id}`} state={location}>
                    {fil.title}{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
}