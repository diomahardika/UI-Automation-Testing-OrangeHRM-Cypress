export const leaveLocators = {
  menu: '//span[text()="Leave"]/ancestor::li',
  entitilement: '//span[contains(text(),"Entitlements")]',
  addEntitlements: '//a[contains(text(),"Add Entitlements")]',
  employeeName: '//input[@placeholder="Type for hints..."]',
  listName:'//div[@role="listbox" and contains(@class,"oxd-autocomplete-dropdown")]',
  listLeave:'//div[@role="listbox" and contains(@class,"oxd-select-dropdown")]',
  leaveForm: '//div[contains(text(),"-- Select --")]',
  totalEntitilement: '(//input[@class="oxd-input oxd-input--active"])[2]',
  buttonSave: '//button[@type="submit"]',
  confirm: '(//button[@type="button"])[6]',

  apply:'//a[contains(text(),"Apply")]',
  fromDate:'(//input[@placeholder="yyyy-dd-mm"])[1]',
  toDate:'(//input[@placeholder="yyyy-dd-mm"])[2]',
  profile:'//span[@class="oxd-userdropdown-tab"]',
  logout:'//a[contains(text(),"Logout")]',
  leaveList:'//a[contains(text(),"Leave List")]',
  approve:'(//button[@type="button"])[5]',
  myLeave:'//a[contains(text(),"My Leave")]',
  tableRow:'(//div[contains(@role,"rowgroup")])[2]',
  tableCell:'(//div[@role="cell"])[7]',
  table:'(//div[contains(@role,"rowgroup")])[2]//div[@role="cell"][7]'
};
