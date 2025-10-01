# OrangeHRM UI Testing Automation

Automated End-to-End testing untuk aplikasi OrangeHRM menggunakan Cypress framework.

## 📋 Test Coverage

Project ini mencakup testing untuk complete employee management workflow:

### 🎯 Test Scenarios

1. **Employee Management**
   - ✅ Add new employee dengan login credentials
   - ✅ Validation untuk required fields

2. **Leave Entitlement Management**
   - ✅ Add leave entitlement untuk employee baru
   - ✅ Validation untuk non-existent employee

3. **Leave Request & Approval Workflow**
   - ✅ Employee request leave
   - ✅ Admin approve leave
   - ✅ Employee verify approved status
   - ✅ Insufficient balance validation

## 🛠️ Tech Stack

- **Framework**: Cypress v15.3.0
- **Language**: JavaScript (ES6+)
- **Pattern**: Page Object Model (POM)
- **Reporting**: Mochawesome Reporter
- **Locator Strategy**: XPath

## 📁 Project Structure

```
cypress/
├── e2e/
│   └── 1-ui-testing/
│       └── orangeHrm.cy.js       # Main test file
├── fixtures/
│   └── employeeData.json         # Test data
├── locators/
│   ├── employeeLocators.js       # Employee page locators
│   ├── leaveLocators.js          # Leave page locators
│   └── loginLocators.js          # Login page locators
├── pages/
│   ├── employeePages.js          # Employee page actions
│   ├── leavePages.js             # Leave page actions
│   └── loginPages.js             # Login page actions
└── support/
    ├── commands.js               # Custom commands
    └── e2e.js                    # Global configurations
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 atau higher)
- npm atau yarn

### Install Dependencies
```bash
npm install
```

### Environment Setup
1. Copy `.env.example` ke `.env`
2. Update environment variables:
```env
CYPRESS_BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
USERNAME_ENV=Admin
PASSWORD_ENV=admin123
```

## 🏃‍♂️ Running Tests

### Interactive Mode (Cypress GUI)
```bash
npm run cypress:open
```

### Headless Mode dengan HTML Report
```bash
npm run html-report
```

### Run Specific Test
```bash
npx cypress run --spec "cypress/e2e/1-ui-testing/orangeHrm.cy.js"
```

**Author**: dio  
**Version**: 1.0.0  
**License**: ISC
