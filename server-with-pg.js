import { createApp } from './app.js'

import { RoleModel } from './models/postgres/roles.js'
import { LabModel } from './models/postgres/labs.js'
import { GenderModel } from './models/postgres/genders.js'
import { RelationshipModel } from './models/postgres/relationships.js'
import { ClientModel } from './models/postgres/clients.js'
import { AuthModel } from './models/postgres/auth.js'
import { SubCategoryModel } from './models/postgres/subcategorys.js'
import { PatientModel } from './models/postgres/patients.js'
import { ExamModel } from './models/postgres/exams.js'
import { ExamCategoryModel } from './models/postgres/exams_categorys.js'
import { InvoiceModel } from './models/postgres/invoices.js'
import { InvoiceExamModel } from './models/postgres/invoices_exams.js'
import { CompousedModel } from './models/postgres/compouseds.js'
import { ResultModel } from './models/postgres/results.js'
import { CategoryModel } from './models/postgres/categorys.js'

// import { seedDbModel } from './models/postgres/seeds.js'
// Seed mpara crear Db de clientes inciales como el manager
/*
try {
  await ClientsDbModel.create()
} catch (error) {
  console.log(error)
} */

createApp({ relationshipModel: RelationshipModel, genderModel: GenderModel, clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, examCategoryModel: ExamCategoryModel, invoiceModel: InvoiceModel, invoiceExamModel: InvoiceExamModel, compousedModel: CompousedModel, resultModel: ResultModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })

export default createApp
