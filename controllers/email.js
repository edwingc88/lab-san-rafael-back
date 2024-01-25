/* import { Resend } from 'resend'

const resend = new Resend('re_av2LdUZy_2vUQXEX5h31eKN6y5oTWFKYF')

const sendEmail = async function () {
  try {
    const dataEmail = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['edwingc88@gmail.com'],
      subject: 'Hello World',
      html: '<strong>It works!</strong>'
    })
    console.log(dataEmail)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export default sendEmail */

/* import nodemailer from 'nodemailer'

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'XXXXXXXXXXXXXXXXXXX',
      pass: 'XXXXXXXXXXXXXXXXXXX'
    }
  })

  return transport
}
 */

/* {
  "client_id": 5,
  "client_dni": "9999888",
  "client_email": "adminas98@gmail.comaw",
  "client_username": "pruebaaaa8",
  "client_password": "1234312",
  "client_firstname": "prueba",
  "client_lastname": "andminlast",
  "client_gender": "Masculino",
  "client_address": "core 8",
  "client_firstphone": "04143621",
  "client_secondphone": "041256",
  "client_birthdate": "2019-12-31T04:00:00.000Z",
  "client_bloodtyping": null,
  "client_type_relationship": "No Aplica",
  "client_name_relationship": "",
  "client_created": "2020-01-01T04:00:00.000Z",
  "client_abatar": "localhost:1234/sources/images/public/pnG-sIqIPK7e3Q3WCthJH9bQ.png",
  "client_id_role": 4
}

[{"key":"firstname","value":"pepito","description":"","type":"text","enabled":true},
{"key":"lastname","value":"rodriguez","description":"","type":"text","enabled":true},
{"key":"username","value":"pepito","description":"","type":"text","enabled":true},
{"key":"password","value":"1234","description":"","type":"text","enabled":true},
{"key":"email","value":"pepito@gmail.com","description":"","type":"text","enabled":true},
{"key":"firstphone","value":"04141234","description":"","type":"text","enabled":true},
{"key":"created","value":"5/5/2024","description":"","type":"text","enabled":true},
{"key":"birthdate","value":"5/6/1990","description":"","type":"text","enabled":true}
]

*/
