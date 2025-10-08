import { ENDPOINTS } from '../config/endpoints';
import { TEST_DATA } from '../config/testData';
import { AuthService } from './api/authService';

Cypress.Commands.add('getUsers', (page = 1) => {
  return cy.request({
    method: 'GET',
    url: `/users?limit=30&skip=${(page - 1) * 30}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('login', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  if (!username || !password) {
    throw new Error('Cypress.env("USERNAME") e Cypress.env("PASSWORD") devem estar definidos!');
  }

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE_URL')}/auth/login`,
    body: { username, password },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201]);
    return response;
  });
});







