import { ENDPOINTS } from '../../config/endpoints';
import { validateSchema } from '../../support/helpers/schemaValidator';
import createProductSchema from '../../fixtures/createProductSchema.json';
import { logResponse } from '../../support/helpers/logger';
import '../../support/commands';
describe('Criação de Produto', () => {
  let authToken;
  
const productPayload = {
    title: 'Perfume Oil',
    description: 'Mega Discount, Impression of A...',
    price: 13,
    discountPercentage: 8.4,
    rating: 4.26,
    stock: 65,
    brand: 'Impression of Acqua Di Gio',
    category: 'fragrances',
    thumbnail: 'https://i.dummyjson.com/data/products/11/thumnail.jpg',
  };

  before(() => {
    cy.login().then((response) => {
      logResponse('Login - Criação de Produto', response);

      expect(response.status, 'Falha no login').to.be.oneOf([200, 201]);
      const token = response.body.token || response.body.accessToken;
      expect(token, 'Token de autenticação deve existir').to.exist;
      authToken = token;
    });
  });

  it('Deve criar um produto e validar os campos retornados corretamente', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}${ENDPOINTS.CREATE_PRODUCT}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: productPayload,
      failOnStatusCode: false,
    }).then((response) => {
      logResponse('Criação de Produto', response);

      expect(response.status, 'Status HTTP incorreto').to.be.oneOf([200, 201]);
      validateSchema(createProductSchema, response.body);

      expect(response.body).to.include({
        title: productPayload.title,
        price: productPayload.price,
        category: productPayload.category,
      });

      expect(response.body).to.have.property('id').that.is.a('number');
      expect(response.body.id, 'ID retornado incorreto').to.equal(101);
    });
  });
});
