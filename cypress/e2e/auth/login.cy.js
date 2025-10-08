import { validateSchema } from '../../support/helpers/schemaValidator';
import loginSchema from '../../fixtures/loginSchema.json';
import { decodeJWT, validateJWTClaims } from '../../support/helpers/jwtValidator';
import { logResponse } from '../../support/helpers/logger';

describe('Autenticação de Login', () => {
  it('Deve autenticar com credenciais válidas (status 201) e retornar tokens', () => {
    cy.login().then((response) => {
      logResponse('Login com credenciais válida', response);
      expect(response.status).to.be.eq(201);
      expect(response.body).to.have.any.keys('accessToken', 'refreshToken', 'token');

      const token = response.body.accessToken || response.body.token;
      expect(token).to.exist;
      Cypress.env('authToken', token);
    });
  });

  it('Deve validar todos os campos obrigatórios no login via JSON Schema', () => {
    cy.login().then((response) => {
      logResponse('Validação de schema de login', response);
      validateSchema(loginSchema, response.body);
    });
  });

  it('Deve validar que o accessToken (JWT) contém claims esperadas', () => {
    cy.login().then((response) => {
      logResponse('Validação de claims JWT', response);

      const token = response.body.accessToken || response.body.token;
      expect(token).to.exist;

      const decoded = decodeJWT(token);
      validateJWTClaims(decoded, {
        username: response.body.username,
        email: response.body.email
      });

      expect(decoded).to.have.property('iat');
      expect(decoded).to.have.property('exp');
    });
  });

  it('Deve falhar com credenciais inválidas', () => {
    const invalidCreds = { username: 'invalid_user', password: 'invalid_pass' };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/auth/login`,
      body: invalidCreds,
      failOnStatusCode: false
    }).then((response) => {
      logResponse('Login com credenciais inválidas', response);
      expect([400, 401]).to.include(response.status);
    });
  });
});