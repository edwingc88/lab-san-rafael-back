import { createApp } from './app.js'

import { /* ClientsDbModel, */ ClientModel, PatientModel, ExamModel, ExamCategoryModel, InvoiceModel, InvoiceExamModel, CompousedModel, ResultModel, CategoryModel, SubCategoryModel, AuthModel } from './models/postgres/laboratory.js'

import { RoleModel } from './models/postgres/roles.js'
import { LabModel } from './models/postgres/labs.js'
import { GenderModel } from './models/postgres/genders.js'
import { RelationshipModel } from './models/postgres/relationships.js'

/*
try {
  await ClientsDbModel.create()
} catch (error) {
  console.log(error)
} */

createApp({ /* clientsDbModel: ClientsDbModel, */ relationshipModel: RelationshipModel, genderModel: GenderModel, clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, examCategoryModel: ExamCategoryModel, invoiceModel: InvoiceModel, invoiceExamModel: InvoiceExamModel, compousedModel: CompousedModel, resultModel: ResultModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })

export default createApp
