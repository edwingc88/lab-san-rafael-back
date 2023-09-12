import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '281240',
  database: 'moviesdb',
  port: 3306
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      console.log(genre)
      const loweCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query('SELECT id,name FROM genre WHERE LOWER(name) = ?;', [loweCaseGenre])

      if (genres.length === 0) {
        return []
      }

      const [{ id }] = genres

      const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie INNER JOIN movie_genres ON movie.id = movie_genres.movie_id WHERE movie_genres.genre_id = ?;', [id])

      return movies
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie; ')
    return movies
  }

  static async getById (id) {
    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?;', [id])

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const { genre: genreInput, title, year, director, duration, poster } = input

    console.log(genreInput)
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?);`, [title, year, director, duration, poster])
    } catch (e) {
      throw new Error('Errro creating movie')
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [uuid])

    return movies[0]
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
