# Test Cases – Todo List App (todolist.james.am)

App has no login; tests open the app directly. Each test is independent and includes explicit assertions.

Data does not persist between tests. Each test creates whatever data it needs (e.g. add a task before deleting or editing) in the same test.

---

## Task CRUD

### TC-007 – User can add a new task with valid title [smoke]
- **Steps:** 1. Open app. 2. Enter a task title in the add-task input. 3. Submit (e.g. Enter).
- **Expected:** New task appears in the list with the given title.

### TC-008 – User can edit an existing task title [regression]
- **Steps:** 1. Open app. 2. Add a task. 3. Edit the task title to a new value. 4. Save.
- **Expected:** Task displays the updated title.

### TC-009 – User can delete a task [smoke]
- **Steps:** 1. Open app. 2. Add a task. 3. Delete the task.
- **Expected:** Task is removed from the list.

### TC-010 – User can mark a task as completed [smoke]
- **Steps:** 1. Open app. 2. Add a task. 3. Mark the task as completed.
- **Expected:** Task is shown as completed (e.g. checked or completed status).

### TC-011 – User can change task status to In Progress [regression]
- **Steps:** 1. Open app. 2. Add a task (default e.g. pending). 3. Change status to "In Progress".
- **Expected:** Task status is "In Progress".

### TC-012 – User can change task status to Urgent [regression]
- **Steps:** 1. Open app. 2. Add a task. 3. Change status to "Urgent".
- **Expected:** Task status is "Urgent".

### TC-013 – User can change task status to Delegated [regression]
- **Steps:** 1. Open app. 2. Add a task. 3. Change status to "Delegated".
- **Expected:** Task status is "Delegated".

### TC-014 – User can add multiple tasks in sequence [regression]
- **Steps:** 1. Open app. 2. Add task A. 3. Add task B. 4. Add task C.
- **Expected:** All three tasks appear in the list.

---

## Filters / List

### TC-015 – Filter shows only completed tasks [regression]
- **Steps:** 1. Open app. 2. Add two tasks; mark one completed. 3. Apply "Completed" filter.
- **Expected:** Only the completed task is visible.

### TC-016 – Filter shows only active (non-completed) tasks [regression]
- **Steps:** 1. Open app. 2. Add two tasks; mark one completed. 3. Apply "Active" or "Pending" filter.
- **Expected:** Only the non-completed task is visible.

### TC-017 – All filter shows every task [regression]
- **Steps:** 1. Open app. 2. Add multiple tasks with mixed statuses. 3. Apply "All" filter.
- **Expected:** All tasks are visible.

---

## Validation / Errors

### TC-018 – Cannot add task with empty title [regression]
- **Steps:** 1. Open app. 2. Leave task title empty. 3. Attempt to add task.
- **Expected:** Task is not added; validation message or button disabled.

### TC-019 – Task title accepts normal text [regression]
- **Steps:** 1. Open app. 2. Add a task with title "Meeting at 3pm".
- **Expected:** Task is added and displays "Meeting at 3pm".

### TC-020 – Long task title is handled [regression]
- **Steps:** 1. Open app. 2. Add a task with a very long title (e.g. 200+ characters).
- **Expected:** Task is added; UI handles long text (truncation or wrap) without breaking.

### TC-021 – Task title with special characters [regression]
- **Steps:** 1. Open app. 2. Add a task with title "Test <script> & \"quotes\"".
- **Expected:** Task is added; special characters are stored/displayed safely.

---

## Edge / UX

### TC-022 – Empty list shows appropriate message or state [regression]
- **Steps:** 1. Open app (or delete all tasks). 2. View task list.
- **Expected:** Empty state message or empty list is shown; no errors.

### TC-023 – Completed task can be marked incomplete [regression]
- **Steps:** 1. Open app. 2. Add a task and mark it completed. 3. Mark it incomplete/pending again.
- **Expected:** Task shows as not completed.

### TC-024 – Delete does not affect other tasks [regression]
- **Steps:** 1. Open app. 2. Add tasks A and B. 3. Delete task A.
- **Expected:** Task B remains in the list; only A is removed.

---

## Spec mapping (for implementation)

| Spec file | Test case IDs |
|-----------|----------------|
| e2e/todo-list.cy.js | All (TC-007 through TC-024), grouped by describe: Add task, Delete task, Edit task, Status, Filters, Empty state |
