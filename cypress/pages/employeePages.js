import { employeeLocators } from "../locators/employeeLocators";

const employeePage = {
  menu() {
    cy.xpath(employeeLocators.menu).click();
  },

  addEmployee() {
    cy.xpath(employeeLocators.addEmployee).click();
  },

  fillFormEmployee(firstName, middleName, lastName, id) {
    cy.xpath(employeeLocators.firstName)
      .should("be.visible")
      .click()
      .type(firstName);
    cy.xpath(employeeLocators.middleName)
      .should("be.visible")
      .click()
      .type(middleName);
    cy.xpath(employeeLocators.lastName)
      .should("be.visible")
      .click()
      .type(lastName);

    cy.xpath(employeeLocators.employeeId).should("be.visible").click().clear().type(id);
  },

  fillFormAccount(username, password) {
    cy.xpath(employeeLocators.toggle).click();
    cy.xpath(employeeLocators.username)
      .should("be.visible")
      .clear()
      .click()
      .type(username, { log: false });
    cy.xpath(employeeLocators.password)
      .should("be.visible")
      .clear()
      .click()
      .type(password, { log: false });
    cy.xpath(employeeLocators.confirm)
      .should("be.visible")
      .clear()
      .click()
      .type(password, { log: false });
  },

  save() {
    cy.xpath(employeeLocators.buttonSave).click();
  },
};
export default employeePage;
