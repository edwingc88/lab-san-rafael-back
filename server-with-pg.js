import { createApp } from './app.js'

import { PersonModel } from './models/postgres/persons.js'

createApp({ personModel: PersonModel })
