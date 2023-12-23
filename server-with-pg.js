import { createApp } from './app.js'

import { /* ClientsDbModel, */ ClientModel, RoleModel, PatientModel, LabModel, ExamModel, InvoiceModel, InvoiceExamModel, ReferenceModel, ResultModel, CategoryModel, SubCategoryModel, AuthModel } from './models/postgres/laboratory.js'
/*
try {
  await ClientsDbModel.create()
} catch (error) {
  console.log(error)
} */

createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, invoiceModel: InvoiceModel, invoiceExamModel: InvoiceExamModel, referenceModel: ReferenceModel, resultModel: ResultModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })
