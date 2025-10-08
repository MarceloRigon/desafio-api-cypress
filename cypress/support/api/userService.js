export const UserService = {
  getUsers(page = 1) {
    return cy.request({
      method: 'GET',
      url: `/users?limit=30&skip=${(page - 1) * 30}`,
      failOnStatusCode: false,
    });
  },
};
