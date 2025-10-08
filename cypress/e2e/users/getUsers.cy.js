import { UserService } from '../../support/api/userService';
import { ENDPOINTS } from '../../config/endpoints';
import { validateSchema } from '../../support/helpers/schemaValidator';
import usersSchema from '../../fixtures/usersSchema.json';
import { logResponse } from '../../support/helpers/logger';

describe('Verificação de Usuários', () => {

  it('Deve retornar status 200 OK', () => {
    const testName = 'Verificação de status 200 OK';
    UserService.getUsers().then((response) => {
      logResponse(testName, response);
      expect(response.status).to.eq(200);
    });
  });

  it('Deve retornar até 30 usuários por página', () => {
    const testName = 'Limite de 30 usuários por página';
    UserService.getUsers().then((response) => {
      logResponse(testName, response);
      expect(response.body.users).to.have.length.of.at.most(30);
    });
  });

  it('Cada usuário deve conter os campos obrigatórios válidos', () => {
    const testName = 'Validação de schema dos usuários';
    UserService.getUsers().then((response) => {
      logResponse(testName, response);
      const users = response.body.users;
      users.forEach((user) => {
        validateSchema(usersSchema, user);
      });
    });
  });

  it('Paginação deve funcionar corretamente (página 1 e 2 não devem ter os mesmos usuários)', () => {
    const testName = 'Verificação de Paginação';

    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}${ENDPOINTS.USERS}?limit=30&skip=0`
    }).then((res1) => {
      logResponse(`${testName} - Página 1`, res1);

      cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}${ENDPOINTS.USERS}?limit=30&skip=30`
      }).then((res2) => {
        logResponse(`${testName} - Página 2`, res2);

        const idsPage1 = res1.body.users.map((u) => u.id);
        const idsPage2 = res2.body.users.map((u) => u.id);
        expect(idsPage1).to.not.deep.equal(idsPage2);
      });
    });
  });
});
