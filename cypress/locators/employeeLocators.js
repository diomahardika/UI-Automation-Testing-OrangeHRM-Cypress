export const employeeLocators = {
  menu: '//span[text()="PIM"]/ancestor::li',
  addEmployee: '//nav[@class="oxd-topbar-body-nav"]/ul/li[3]',
  firstName: '//input[@name="firstName"]',
  middleName: '//input[@name="middleName"]',
  lastName: '//input[@name="lastName"]',
  employeeId: '(//input[@class="oxd-input oxd-input--active"])[2]',
  toggle: '//div[@class="oxd-switch-wrapper"]',
  username: "//label[contains(text(),'Username')]/ancestor::div[contains(@class,'oxd-input-group')]//input",
  password: "(//label[contains(text(),'Password')]/ancestor::div[contains(@class,'oxd-input-group')]//input)[1]",
  confirm: "(//label[contains(text(),'Password')]/ancestor::div[contains(@class,'oxd-input-group')]//input)[2]",  
  buttonSave: '//div[@class="oxd-form-actions"]/button[2]',
};
