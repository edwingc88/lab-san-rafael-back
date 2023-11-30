import { createApp } from './app.js'

import { PersonModel, RoleModel, AuthModel } from './models/postgres/laboratory.js'

createApp({ personModel: PersonModel, roleModel: RoleModel, authModel: AuthModel })
