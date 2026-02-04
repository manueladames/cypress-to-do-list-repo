# 🧪 Cypress Automation – To Do List Application

This repository contains end-to-end automated tests written in **Cypress** for the To Do List web application:

🔗 https://todolist.james.am/#/

The purpose of this project is to demonstrate real QA Automation practices including:

- Functional UI testing
- Validation and edge case coverage
- Test case traceability
- Smoke vs Regression tagging
- Clean and maintainable Cypress structure

---

## 🚀 Tech Stack

- Cypress
- JavaScript
- Node.js
- Chrome / Electron browsers

---

## 📂 Project Structure

```
cypress/
 ├── e2e/
 ├── fixtures/
 ├── support/
cypress.config.js
package.json
TESTCASES.md
```

---

## ▶️ How to Run the Tests

### Install dependencies

```bash
npm install
```

### Open Cypress Test Runner (UI)

```bash
npx cypress open
```

### Run Headless (CI style)

```bash
npx cypress run
```

### Run with visible Chrome window (headed)

```bash
npx cypress run --browser chrome --headed
```

---

## ✅ Automated Test Coverage

The following test cases were automated from manual test scenarios.

### 🧩 Task Management

| ID | Title | Tag |
|----|-------|-----|
| TC-007 | User can add a new task with valid title | smoke |
| TC-008 | User can edit an existing task title | regression |
| TC-009 | User can delete a task | smoke |
| TC-010 | User can mark a task as completed | smoke |
| TC-011 | User can change task status to In Progress | regression |
| TC-012 | User can change task status to Urgent | regression |
| TC-013 | User can change task status to Delegated | regression |
| TC-014 | User can add multiple tasks in sequence | regression |

---

### 🔎 Filters / List Behavior

| ID | Title | Tag |
|----|-------|-----|
| TC-015 | Filter shows only completed tasks | regression |
| TC-016 | Filter shows only active (non-completed) tasks | regression |
| TC-017 | All filter shows every task | regression |

---

### ⚠️ Validation / Errors

| ID | Title | Tag |
|----|-------|-----|
| TC-018 | Cannot add task with empty title | regression |
| TC-019 | Task title accepts normal text | regression |
| TC-020 | Long task title is handled correctly | regression |
| TC-021 | Task title with special characters | regression |

---

### 🧠 Edge / UX Cases

| ID | Title | Tag |
|----|-------|-----|
| TC-022 | Empty list shows appropriate message/state | regression |
| TC-023 | Completed task can be marked incomplete | regression |
| TC-024 | Deleting a task does not affect other tasks | regression |

---

## 🏷️ Test Tagging Strategy

- **Smoke tests** → Core functionality
- **Regression tests** → Full behavior coverage, validations, UX, and edge cases

This mirrors how test suites are structured in real QA teams.

---

## 🎯 Purpose of This Project

This project showcases:

- Practical Cypress automation skills
- Translating manual test cases into automated tests
- QA mindset for validation, UX, and edge cases
- Professional test organization and documentation

---

## 👨‍💻 Author

**Manuel Adames**  
QA Automation Engineer
