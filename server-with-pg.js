import { createApp } from './app.js'

import { ClientModel, RoleModel, PatientModel, LabModel, ExamModel, CategoryModel, SubCategoryModel, AuthModel } from './models/postgres/laboratory.js'

createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })
