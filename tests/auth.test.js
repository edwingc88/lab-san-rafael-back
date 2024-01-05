import request from 'supertest'
import createApp from '../server-with-pg.js'

/* import { ClientModel, RoleModel, PatientModel, LabModel, ExamModel, ExamCategoryModel, InvoiceModel, InvoiceExamModel, CompousedModel, ResultModel, CategoryModel, SubCategoryModel, AuthModel } from '../models/postgres/laboratory.js'

const appTest = createApp({ clientModel: ClientModel, roleModel: RoleModel, patientModel: PatientModel, labModel: LabModel, examModel: ExamModel, examCategoryModel: ExamCategoryModel, invoiceModel: InvoiceModel, invoiceExamModel: InvoiceExamModel, compousedModel: CompousedModel, resultModel: ResultModel, categoryModel: CategoryModel, subcategoryModel: SubCategoryModel, authModel: AuthModel })
*/
const requestTest = request(createApp)

console.log(createApp)
// eslint-disable-next-line no-undef
describe('auth', function () {
  // eslint-disable-next-line no-undef
  describe('POST', function () {
    // eslint-disable-next-line no-undef
    it('Should return JSON response with JSON content type', function (done) {
      requestTest.post('/auth/signin', {
        json: true,
        body: {
          username: 'michelle',
          password: '12345678'
        }
      })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })
})
