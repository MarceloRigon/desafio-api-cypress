export const logResponse = (testName, response) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    test: testName,
    status: response.status,
    body: response.body,
  };

  console.log(`\n[${testName}]`);
  console.log(`Status: ${response.status}`);
  console.log('Resposta:', response.body);

  cy.log(`${testName} | Status: ${response.status}`);
  cy.log(JSON.stringify(response.body, null, 2));

  cy.writeFile(`cypress/logs/${testName.replace(/\s+/g, '_')}_${Date.now()}.json`, logData);
};
