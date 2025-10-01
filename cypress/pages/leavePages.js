import { leaveLocators } from "../locators/leaveLocators";

const LEAVE_CONSTANTS = {
  LEAVE_TYPE: "CAN - Vacation",
  ENTITLEMENT_DAYS: 20,
  PARTIAL_DAYS: "All Days",
  DURATION_DAYS: "Half Day - Morning",
  MESSAGES: {
    SUCCESS_SAVED: "Successfully Saved",
    SUCCESS_UPDATED: "Successfully Updated",
    FAILED_SUBMIT: "Failed to Submit",
  },
};

// Helper functions untuk format date
const formatDate = (date) => {
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${day}-${month}`;
};

const getDates = () => {
  const today = new Date();
  const fromDate = formatDate(today);
  const futureDate = formatDate(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );
  return { fromDate, futureDate };
};

// Fill form bagian apply leave
const fillDateAndDuration = () => {
  const { fromDate, futureDate } = getDates();

  cy.xpath(leaveLocators.fromDate).clear().type(fromDate);
  cy.xpath(leaveLocators.toDate).clear().type(futureDate);
  cy.get("body").click({ force: true });

  cy.xpath(leaveLocators.leaveForm).click();
  cy.xpath(leaveLocators.listLeave)
    .contains(LEAVE_CONSTANTS.PARTIAL_DAYS)
    .click();

  cy.xpath(leaveLocators.leaveForm).click();
  cy.xpath(leaveLocators.listLeave)
    .contains(LEAVE_CONSTANTS.DURATION_DAYS)
    .click();
};

// Fill form bagain pilih tipe leave
const selectLeaveType = () => {
  cy.xpath(leaveLocators.leaveForm).click();
  cy.xpath(leaveLocators.listLeave)
    .contains(LEAVE_CONSTANTS.LEAVE_TYPE)
    .click();
};

// Logout user
const logoutUser = () => {
  cy.xpath(leaveLocators.profile).click();
  cy.xpath(leaveLocators.logout).click();
};

const leavePage = {
  menu() {
    cy.xpath(leaveLocators.menu).click();
  },

  addEntitlements() {
    cy.xpath(leaveLocators.entitilement).click();
    cy.xpath(leaveLocators.addEntitlements).click();
  },

  fillForm(fullName) {
    cy.xpath(leaveLocators.employeeName).type(fullName);
    cy.xpath(leaveLocators.listName).contains(fullName).click();

    selectLeaveType();
    cy.xpath(leaveLocators.totalEntitilement).type(
      LEAVE_CONSTANTS.ENTITLEMENT_DAYS
    );

    cy.xpath(leaveLocators.buttonSave).click();
    cy.xpath(leaveLocators.confirm).click();
  },

  unvalidFillForm(unvalidName) {
    cy.xpath(leaveLocators.employeeName).type(unvalidName);
    cy.wait(2000); // Consider using cy.get().should() instead of wait
  },

  //proses request
  reqLeave() {
    cy.xpath(leaveLocators.menu).click();
    cy.xpath(leaveLocators.apply).click();

    selectLeaveType();
    fillDateAndDuration();

    cy.xpath(leaveLocators.buttonSave).click();

    // assertion pastikan muncul notifikasi Successfully Saved
    cy.contains(LEAVE_CONSTANTS.MESSAGES.SUCCESS_SAVED).should("be.visible"); // Fixed typo: "Save" -> "Saved"

    logoutUser();
  },

  // proses approve
  approveLeave(fullName) {
    cy.xpath(leaveLocators.menu).click();
    cy.xpath(leaveLocators.leaveList).click();

    cy.xpath(leaveLocators.employeeName).type(fullName);
    cy.xpath(leaveLocators.listName).contains(fullName).click();

    cy.xpath(leaveLocators.buttonSave).click();
    cy.xpath(leaveLocators.approve).click();

    // assertion pastikan muncul notifikasi Successfully Updated
    cy.contains(LEAVE_CONSTANTS.MESSAGES.SUCCESS_UPDATED).should("be.visible");

    logoutUser();
  },

  statusLeave(firstName, middleName, lastName) {
    cy.xpath(leaveLocators.menu).click();
    cy.xpath(leaveLocators.myLeave).click();

    // pastikan ada data 
    cy.contains("Record Found").should("be.visible");

    // cek apakah data sesuai dengan request
    cy.xpath(leaveLocators.table)
      .should("be.visible")
      .and("contain.text", firstName, middleName, lastName) 
      .and("contain.text", LEAVE_CONSTANTS.LEAVE_TYPE) 
      .and("contain.text", "Scheduled");

    // Check apakah ada button cancel
    cy.xpath(leaveLocators.cancel).should("be.visible");
  },

  negatifCase() {
    cy.xpath(leaveLocators.menu).click();
    cy.xpath(leaveLocators.apply).click();

    selectLeaveType();
    fillDateAndDuration();

    cy.xpath(leaveLocators.buttonSave).click();

    // assertion pastikan muncul notifikasi Failed to Submit
    cy.contains(LEAVE_CONSTANTS.MESSAGES.FAILED_SUBMIT).should("be.visible");

    logoutUser();
  },
};

export default leavePage;
