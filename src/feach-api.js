import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org";

const trendUrl = "/3/trending/movie/week?language=en-US";
const filmIdUrl = '/3/movie';
const searchUrl = '/3/search/movie?query='

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjA2Njk0NWY0M2U3YzhkYzJiZmI4YzAxM2RiZmE5ZiIsIm5iZiI6MTcyMDc3NzQ1My42MzY0MTUsInN1YiI6IjY2OTBmOTYxNDc0MzNiZjdhZThiMzc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EUzi-M9eyhptDVw4AVnjIzGxbfUtD09693jROHbo0Ik'
  }
};

export function getTrendFilm() {
  return axios.get(trendUrl, options)
    .then(response => response.data);
}

export const getFilmById = (filmID) => {
  const url = `${filmIdUrl}/${filmID}?language=en-US`;
  return axios.get(url, options)
    .then(response => response.data);
}
export const getFilmActor = (filmId) => {
  const url = `${filmIdUrl}/${filmId}/credits?language=en-US`; 
  return axios.get(url, options)
    .then(response => response.data);
}
export const getFilmReviews = (filmId) => {
  const url = `${filmIdUrl}/${filmId}/reviews?language=en-US`; 
  return axios.get(url, options)
    .then(response => response.data);
}
export const getFilmBySearch = (nameFilm) => {
  const url = `${searchUrl}${nameFilm}&language=en-US`; 
  return axios.get(url, options)
    .then(response => response.data);
}