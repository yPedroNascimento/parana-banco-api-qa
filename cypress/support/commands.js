
const BASE_URL = Cypress.env('baseUrl')

Cypress.Commands.add('getUsers', () => {
  cy.request({
    method: 'GET',
    url: `${BASE_URL}/users`
  }).as('response')
})

Cypress.Commands.add('getUserById', (userId) => {
  cy.request({
    method: 'GET',
    url: `${BASE_URL}/users/${userId}`
  }).as('response')
})

Cypress.Commands.add('createUser', (userData) => {
  cy.request({
    method: 'POST',
    url: `${BASE_URL}/users`,
    body: userData,
  });
});

Cypress.Commands.add('updateUser', (userId, userData) => {
  cy.request({
    method: 'PUT',
    url: `${BASE_URL}/users/${userId}`,
    body: userData,
  });
});

Cypress.Commands.add("deleteUserById", (userId) => {
  cy.request({
    method: "DELETE",
    url: `${BASE_URL}/users/${userId}`,
  })
}); 