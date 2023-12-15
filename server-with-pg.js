import { createApp } from './app.js'

import { ClientsDbModel, ClientModel, RoleModel, PatientModel, LabModel, ExamModel, CategoryModel, SubCategoryModel, AuthModel } from './models/postgres/laboratory.js'

try {
  await ClientsDbModel.create()
} catch (error) {
  console.log(error)
}

createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })
