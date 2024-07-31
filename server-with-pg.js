import { createApp } from './app.js'

import { RoleModel } from './models/postgres/roles.js'
import { LabModel } from './models/postgres/labs.js'
import { StateModel } from './models/postgres/states.js'
import { UserModel } from './models/postgres/users.js'
import { AuthModel } from './models/postgres/auth.js'
import { ExamModel } from './models/postgres/exams.js'
import { ExamOrderResultModel } from './models/postgres/exam_order_results.js'
import { InvoiceModel } from './models/postgres/invoices.js'
import { OrderModel } from './models/postgres/orders.js'
import { ResultModel } from './models/postgres/results.js'
import { CategoryModel } from './models/postgres/categorys.js'

// import { seedDbModel } from './models/postgres/seeds.js'
// Seed para crear Db de useres inciales como el manager
/*
try {
  await UsersDbModel.create()
} catch (error) {
  console.log(error)
} */

createApp({ stateModel: StateModel, userModel: UserModel, roleModel: RoleModel, labModel: LabModel, examModel: ExamModel, examOrderResultModel: ExamOrderResultModel, invoiceModel: InvoiceModel, orderModel: OrderModel, resultModel: ResultModel, categoryModel: CategoryModel, authModel: AuthModel })

export default createApp
