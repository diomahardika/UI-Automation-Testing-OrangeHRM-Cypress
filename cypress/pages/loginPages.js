import { leaveLocators } from "../locators/leaveLocators";
import { loginLocators } from "../locators/loginLocators";

const loginPage = {
  
  login(username, password) {
    cy.visit(Cypress.env("baseUrl"));
    cy.xpath(loginLocators.userName).type(username);
    cy.xpath(loginLocators.password).type(password, { log: false });
    cy.xpath(loginLocators.loginButton).click();
    cy.url().should("include", "/index");
  },

  loginAdmin(username, password) {
   this.login(username, password)
  },

  loginAsEmployee(username, password) {
   this.login(username, password)
  },
};
export default loginPage;
