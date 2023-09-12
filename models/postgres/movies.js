import pkg from 'pg'
import 'dotenv/config'

const { Pool } = pkg
let conn

/*
// CODIGO INTERNO con .ENV

if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
}
*/

if (!conn) {
  conn = new Pool({
    connectionString: process.env.DATABASE_URL
    // ssl: true
  })
}

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      console.log(genre)
      const loweCaseGenre = genre.toLowerCase()
      console.log(loweCaseGenre)
      const result = await conn.query('SELECT id,name FROM genre WHERE LOWER(name) = $1;', [loweCaseGenre])
      const genres = result.rows

      if (genres.length === 0) {
        console.log(genres.length)
        return []
      }
      const [{ id }] = genres
      const resultMovies = await conn.query('SELECT title, year, director, duration, poster, rate, id FROM movie INNER JOIN movie_genres ON movie.id = movie_genres.movie_id WHERE movie_genres.genre_id = $1;', [id])
      const movies = resultMovies.rows
      return movies
    }
    // const res = await conn.query('SELECT NOW()')
    const res = await conn.query('SELECT title, year, director, duration, poster, rate, id FROM movie;')
    console.log(res.rows)
    return res.rows
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id = $1;', [id])
      const [movies] = result.rows

      if (movies.length === 0) return null
      return movies
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    const { genre: genreInput, title, year, director, duration, poster } = input
    console.log(genreInput, title)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows
    console.log(uuid)

    try {
      const resultID = await conn.query('INSERT INTO movie(id, title, year, director, duration, poster) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;', [uuid, title, year, director, duration, poster])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating movie')
    }
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM movie WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }

  static async update ({ id, input }) {
    const { title, year, director, duration, poster, rate } = input

    const result = await conn.query('UPDATE movie SET title = $1, year = $2, director = $3, duration = $4, poster = $5, rate = $6  WHERE id = $7 RETURNING *;', [title, year, director, duration, poster, rate, id])
    console.log(result.rows)
    return result.rows
  }
}
