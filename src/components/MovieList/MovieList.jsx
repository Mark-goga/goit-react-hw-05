import {Link} from 'react-router-dom'
import css from './MovieList.module.css'

export default function MovieList({films , location}) {
  return (
    <div>
      <ul>
        {films.map((film) => {
          return(
            <li key={film.id} className={css.item}>
              <Link to={`/movies/${film.id}`} state={location}>
                  {film.original_title}
                </Link>      
            </li>
          )
        })}
      </ul>
    </div>
  );
}