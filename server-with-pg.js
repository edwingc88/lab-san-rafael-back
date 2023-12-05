import { createApp } from './app.js'

import { ClientModel, RoleModel, PatientModel, LabModel, ExamModel, AuthModel } from './models/postgres/laboratory.js'

createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, authModel: AuthModel })
