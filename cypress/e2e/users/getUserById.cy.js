import { ENDPOINTS } from '../../config/endpoints';
import { validateSchema } from '../../support/helpers/schemaValidator';
import { logResponse } from '../../support/helpers/logger';

describe('Consulta de Usuário por ID', () => {
  const userId = 1;

  it('Deve retornar status 200 e todos os dados completos do usuário especificado', () => {
    const testName = 'Consulta de Usuário por ID';

    cy.request({
      method: 'GET',
      url: ENDPOINTS.USER_BY_ID(userId),
      failOnStatusCode: false
    }).then((response) => {
      logResponse(testName, response);

      expect(response.status).to.eq(200);

      cy.fixture('userByIdSchema.json').then((schema) => {
        validateSchema(schema, response.body);
      });

      expect(response.body).to.include.keys(['id', 'firstName', 'lastName', 'email']);
      expect(response.body.id, 'ID incorreto retornado').to.eq(userId);

      cy.fixture('userByIdExpected.json').then((expectedUser) => {
        const diffs = [];

        const compareObjects = (actual, expected, path = '') => {
          Object.entries(expected).forEach(([key, expectedValue]) => {
            const currentPath = path ? `${path}.${key}` : key;
            const actualValue = actual ? actual[key] : undefined;

            if (typeof expectedValue === 'object' && expectedValue !== null && !Array.isArray(expectedValue)) {
              compareObjects(actualValue, expectedValue, currentPath);
            } else {
              if (actualValue !== expectedValue) {
                diffs.push(
                  `Campo divergente: ${currentPath}\n  Esperado: ${JSON.stringify(expectedValue)}\n  Obtido: ${JSON.stringify(actualValue)}`
                );
              }
            }
          });
        };

        compareObjects(response.body, expectedUser);

        if (diffs.length > 0) {
          throw new Error(`Foram encontradas divergências:\n\n${diffs.join('\n\n')}`);
        } else {
          cy.log('Todos os campos correspondem ao resultado esperado');
        }
      });
    });
  });
});

