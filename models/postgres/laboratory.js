import pkg from 'pg'
import 'dotenv/config'
import bc from 'bcrypt'
// const bcrypt = require('bcrypt')

const { Pool } = pkg
let conn
if (!conn) {
  conn = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
}

/* if (!conn) {
  conn = new Pool({
    connectionString: process.env.DATABASE_URL
    // ssl: true
  })
}
 */
export class ClientModel {
  static async getAll () {
    try {
      //  console.log(role)
      /*   if (role) {
        const loweCaseRole = role.toLowerCase()
        const result = await conn.query('SELECT id,name FROM role WHERE LOWER(name) = $1;', [loweCaseRole])
        const roles = result.rows

        if (roles.length === 0) {
          // console.log(roles.length)
          return []
        }
        const [{ id }] = roles

        const resultRoles = await conn.query('SELECT * FROM client INNER JOIN role ON client.client_id_role = role.id WHERE role.id = $1;', [id])
        const clients = resultRoles.rows
        return clients
      } */
      const res = await conn.query('SELECT * FROM client;')
      // console.log(res.rows)
      return res.rows
    } catch (e) {
      throw new Error('ERRO')
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM client WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { dni, email, password, firstname, lastname, address, mobilephone, created, picture_url, id_role } = input

    const passwordHash = await bc.hash(password, 10)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO client( client_id,client_dni , client_password,client_firstname,client_lastname ,client_email ,client_address,client_mobilephone,client_created, client_picture_url,client_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *;', [uuid, dni, passwordHash, firstname, lastname, email, address, mobilephone, created, picture_url, id_role])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE client SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM client WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class RoleModel {
  static async getAll () {
    const res = await conn.query('SELECT * FROM role;')
    // console.log(res.rows)
    return res.rows
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM role WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO role( id,name ) VALUES ($1, $2 ) RETURNING *;', [id, name])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE role SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM role WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class PatientModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM patient;')
      // console.log(res.rows)
      return res.rows
    } catch (e) {
      throw new Error('ERRO')
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM patient WHERE id = $1;', [id])
      const [patients] = result.rows

      if (patients.length === 0) return null
      return patients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input

    const passwordHash = await bc.hash(password, 10)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO patient( id,dni , password,firstname,lastname ,email ,birthdate,gender,address,mobilephone,homephone, blood_typing, created, picture_url,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 , $13, $14 , $15  ) RETURNING *;', [uuid, dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating patient')
    }
  }

  static async update ({ id, input }) {
    // eslint-disable-next-line camelcase
    const { dni, password, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id } = input
    const passwordHash = await bc.hash(password, 10)
    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE patient SET dni = $1, password = $2 , firstname= $3 , lastname= $4, email= $5, birthdate=$6, gender=$7 , address=$8 , mobilephone=$9, homephone=$10, blood_typing=$11, created=$12 , picture_url=$13 , role_id=$14  WHERE id = $15 RETURNING *;', [dni, passwordHash, firstname, lastname, email, birthdate, gender, address, mobilephone, homephone, blood_typing, created, picture_url, role_id, id])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM patient WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class LabModel {
  static async getAll () {
    const res = await conn.query('SELECT * FROM lab;')
    // console.log(res.rows)
    return res.rows
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM lab WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    console.log(input)
    console.log('en el  DB LAB entro, INPUT ARRIBA')
    // eslint-disable-next-line camelcase
    const { name, rif, slogan, description, email, address, phone, objetive, mission, vision, logo } = input

    try {
      // eslint-disable-next-line camelcase
      const result = await conn.query('INSERT INTO lab(name,rif,slogan,description,email,address,phone,objetive,mission, vision,logo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;', [name, rif, slogan, description, email, address, phone, objetive, mission, vision, logo])
      console.log('en el  DB LAB entro tambien')
      // console.log(input)
      return (result.rows)
      // return ({ input })
    } catch (e) {
      throw new Error('Error DB creating Lab')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE lab SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM lab WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class ExamModel {
  static async getAll ({ _category }) {
    try {
      if (_category) {
        const loweCaseCategoryID = _category.toLowerCase()
        const result = await conn.query('SELECT * FROM exam WHERE exam_id_category = $1;', [loweCaseCategoryID])

        return result.rows
      }
      const res = await conn.query('SELECT * FROM exam INNER JOIN category ON exam.exam_id_category = category.category_id INNER JOIN sub_category ON category.category_id_sub_category = sub_category.sub_category_id;')
      // const res = await conn.query('SELECT * FROM exam;')
      console.log(res.rows)
      console.log('entro a Exam Model')
      return res.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM exam WHERE id_exam = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { name, id_category } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO exam( name ,id_category ) VALUES ($1, $2 ) RETURNING *;', [name, id_category])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE exam SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM exam WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class CategoryModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM category;')
      console.log(res.rows)
      return res.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM category WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO category( id,name ) VALUES ($1, $2 ) RETURNING *;', [id, name])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE category SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM category WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class SubCategoryModel {
  static async getAll () {
    try {
      const res = await conn.query('SELECT * FROM sub_category;')
      console.log(res.rows)
      return res.rows
    } catch (e) {
      return null
    }
  }

  static async getById (id) {
    try {
      const result = await conn.query('SELECT * FROM sub_category WHERE id = $1;', [id])
      const [clients] = result.rows

      if (clients.length === 0) return null
      return clients
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO sub_category( id,name ) VALUES ($1, $2 ) RETURNING *;', [id, name])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async update ({ idupdate, input }) {
    // eslint-disable-next-line camelcase
    const { id, name } = input

    // eslint-disable-next-line camelcase
    const result = await conn.query('UPDATE sub_category SET id = $1, name = $2  WHERE id = $3 RETURNING *;', [id, name, idupdate])
    console.log(result.rows)
    return result.rows
  }

  static async delete ({ id }) {
    console.log(id)
    const result = await conn.query('DELETE FROM sub_category WHERE id = $1 returning *;', [id])

    console.log(result.rows)

    return result.rows
  }
}

export class AuthModel {
  static async create ({ input }) {
    // eslint-disable-next-line camelcase
    const { firstname, lastname, email, password, dni, mobilephone, created, id_role } = input

    const passwordHash = await bc.hash(password, 10)

    const result = await conn.query('SELECT uuid_generate_v4() uuid;')

    const [{ uuid }] = result.rows
    console.log(uuid)

    try {
      // eslint-disable-next-line camelcase
      const resultID = await conn.query('INSERT INTO client( client_id, client_password,client_firstname,client_lastname ,client_email ,client_dni, client_mobilephone, client_created,client_id_role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *;', [uuid, passwordHash, firstname, lastname, email, dni, mobilephone, created, id_role])
      return (resultID.rows)
    } catch (e) {
      throw new Error('Errro creating client')
    }
  }

  static async find (email) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT * FROM client WHERE client_email = $1 ;', [email])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find')
    }
  }

  static async findRol ({ idrole }) {
    // eslint-disable-next-line camelcase
    try {
      const result = await conn.query('SELECT id FROM role WHERE id = $1 ;', [idrole])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find')
    }
  }

  static async getByID (id) {
    // eslint-disable-next-line camelcase
    // console.log(id)
    try {
      const result = await conn.query('SELECT id FROM client WHERE id = $1 ;', [id])
      // console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find ID')
    }
  }

  static async getRolByID (id) {
    try {
      console.log(id)
      const result = await conn.query('SELECT role_id FROM client WHERE id = $1 ;', [id])
      console.log(result.rows)
      return (result.rows)
    } catch (e) {
      throw new Error('Errro en Modelo Find Role')
    }
  }
}
