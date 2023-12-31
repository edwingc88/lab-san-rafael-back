import request from 'supertest'
import createApp from '../server-with-pg.js'

/* import { ClientModel, RoleModel, PatientModel, LabModel, ExamModel, ExamCategoryModel, InvoiceModel, InvoiceExamModel, CompousedModel, ResultModel, CategoryModel, SubCategoryModel, AuthModel } from '../models/postgres/laboratory.js'

const appTest = createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, examCategoryModel: ExamCategoryModel, invoiceModel: InvoiceModel, invoiceExamModel: InvoiceExamModel, compousedModel: CompousedModel, resultModel: ResultModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })
*/
const requestTest = request('http://localhost:1234')

console.log(createApp)
// eslint-disable-next-line no-undef
describe('api', function () {
  // eslint-disable-next-line no-undef
  describe('GET', function () {
    // eslint-disable-next-line no-undef
    it('Should return HTML response with text/html content type', function (done) {
      requestTest.get('/')
        .set('Accept', 'text/plain')
        .expect('Content-Type', /html/)
        .expect(200, done)
    })
  })
})
