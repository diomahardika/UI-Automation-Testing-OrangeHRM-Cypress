import loginPage from "../../pages/loginPages";
import employeePage from "../../pages/employeePages";
import leavePage from "../../pages/leavePages";

let employeeData;
before(() => {
  cy.fixture("employeeData.json").then((data) => {
    employeeData = data;
    expect(employeeData).to.have.all.keys(
      "firstName",
      "middleName",
      "lastName",
      "employeeId",
      "username",
      "password",
      "unvalidName"
    );
  });
});

describe("Add New Employee and User Account", () => {
  beforeEach(() => {
    loginPage.loginAdmin(Cypress.env("username"), Cypress.env("password"));
  });

  it("Positive Case - Should successfully add a new employee in PIM", () => {
    employeePage.menu();
    employeePage.addEmployee();

    // Mengisi form
    employeePage.fillFormEmployee(
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName,
      employeeData.employeeId
    );
    employeePage.fillFormAccount(employeeData.username, employeeData.password);

    // // Simpan
    employeePage.save();

    // // Assertion: Pastikan pesan sukses muncul dan kita dialihkan ke halaman detail personal
    cy.contains("Successfully Saved").should("be.visible");
    cy.contains("Personal Details").should("be.visible");
  });
  it.only("Negative Case - Should show an error when adding an employee with empty required fields", () => {
    employeePage.menu();
    employeePage.addEmployee();

    // // Langsung Simpan
    employeePage.save();

    // Assertion: Pastikan pesan error "Required" muncul untuk First Name dan Last Name
    cy.xpath('//span[contains(@class, "input-group__message")]')
      .should("contain", "Required")
      .and("have.length", 2);
  });
});

describe("Add Leave Entitlement", () => {
  beforeEach(() => {
    loginPage.loginAdmin(Cypress.env("username"), Cypress.env("password"));
  });

  it("Positive Case - Should add leave entitlement for the new employee", () => {
    leavePage.menu();
    leavePage.addEntitlements();
    leavePage.fillForm(
      `${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName}`
    );

    cy.contains("Successfully Saved").should("be.visible");
  });

  it('Negative Case - Should show "No Records Found" for a non-existent employee', () => {
    leavePage.menu();
    leavePage.addEntitlements();
    leavePage.unvalidFillForm(`${employeeData.unvalidName}`);

    // Assertion: Pastikan pesan "No Records Found" muncul di dropdown
    cy.contains(".oxd-autocomplete-option", "No Records Found").should(
      "be.visible"
    );
  });
});

describe("Leave Request and Approval Cycle", () => {
  it("Positive Case - Should allow employee to request, admin to approve, and employee to see approved status", () => {
    loginPage.loginAsEmployee(employeeData.username, employeeData.password);

    leavePage.reqLeave();

    // --- Langkah: Admin Approve Cuti ---
    loginPage.loginAdmin(Cypress.env("username"), Cypress.env("password"));

    leavePage.approveLeave(
      `${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName}`
    );

    // --- Langkah: Karyawan Baru Melihat Status Cuti ---
    loginPage.loginAsEmployee(employeeData.username, employeeData.password);

    leavePage.statusLeave();
  });

  it("Negative Case - Should show an error when requesting leave with insufficient balance", () => {
    loginPage.loginAsEmployee(employeeData.username, employeeData.password);

    leavePage.negatifCase();
  });
});
