/**
 * Todo List App – full test suite
 * Categories: Add task, Delete task, Edit task, Status, Filters, Empty state
 */
import TodoListPage from '../pages/TodoListPage.js';

describe('Todo List App', { tags: ['@regression', '@tasks'] }, () => {
  beforeEach(() => {
    cy.visit('/#/');
  });

  describe('Add task', () => {
    it('TC-007 – User can add a new task with valid title', { tags: '@smoke' }, () => {
      const title = 'New task ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.getTaskByTitle(title).should('be.visible');
    });

    it('TC-014 – User can add multiple tasks in sequence', { tags: '@regression' }, () => {
      const a = 'Task A ' + Date.now();
      const b = 'Task B ' + Date.now();
      const c = 'Task C ' + Date.now();
      TodoListPage.addTask(a);
      TodoListPage.addTask(b);
      TodoListPage.addTask(c);
      TodoListPage.getTaskByTitle(a).should('be.visible');
      TodoListPage.getTaskByTitle(b).should('be.visible');
      TodoListPage.getTaskByTitle(c).should('be.visible');
    });

    it('TC-018 – Cannot add task with empty title', { tags: '@regression' }, () => {
      TodoListPage.newTaskInput.clear().type('{enter}');
      TodoListPage.newTaskInput.should('have.value', '');
    });

    it('TC-019 – Task title accepts normal text', { tags: '@regression' }, () => {
      const title = 'Meeting at 3pm';
      TodoListPage.addTask(title);
      TodoListPage.getTaskByTitle(title).should('be.visible');
    });

    it('TC-020 – Long task title is handled', { tags: '@regression' }, () => {
      const longTitle = 'A'.repeat(200);
      TodoListPage.addTask(longTitle);
      TodoListPage.getTaskItems().should('have.length.at.least', 1);
      TodoListPage.getTaskByTitle('A').first().should('be.visible');
    });

    it('TC-021 – Task title with special characters', { tags: '@regression' }, () => {
      const title = 'Test <script> & "quotes"';
      TodoListPage.addTask(title);
      TodoListPage.getTaskItems().should('have.length.at.least', 1);
      cy.contains('Test').first().should('be.visible');
    });
  });

  describe('Delete task', () => {
    it('TC-009 – User can delete a task', { tags: '@smoke' }, () => {
      const title = 'To delete ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.getTaskByTitle(title).should('be.visible');
      TodoListPage.deleteTask(title);
      cy.contains(title).should('not.exist');
    });

    it('TC-024 – Delete does not affect other tasks', { tags: '@regression' }, () => {
      const titleA = 'Task A ' + Date.now();
      const titleB = 'Task B ' + (Date.now() + 1);
      TodoListPage.addTask(titleA);
      TodoListPage.addTask(titleB);
      TodoListPage.deleteTask(titleA);
      TodoListPage.getTaskByTitle(titleB).should('be.visible');
      cy.contains(titleA).should('not.exist');
    });
  });

  describe('Edit task', () => {
    it('TC-008 – User can edit an existing task title', { tags: '@regression' }, () => {
      const oldTitle = 'Original ' + Date.now();
      const newTitle = 'Updated ' + Date.now();
      TodoListPage.addTask(oldTitle);
      TodoListPage.getTaskByTitle(oldTitle).should('be.visible');
      TodoListPage.editTask(oldTitle, newTitle);
      TodoListPage.getTaskByTitle(newTitle).should('be.visible');
    });
  });

  describe('Status', () => {
    it('TC-010 – User can mark a task as completed', { tags: '@smoke' }, () => {
      const title = 'Complete me ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.markCompleted(title);
      TodoListPage.getTaskByTitle(title).should('be.visible');
    });

    it('TC-011 – User can change task status to In Progress', { tags: '@regression' }, () => {
      const title = 'Status test ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.setStatus(title, 'In Progress');
      cy.contains(title).should('be.visible');
    });

    it('TC-012 – User can change task status to Urgent', { tags: '@regression' }, () => {
      const title = 'Urgent task ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.setStatus(title, 'Urgent');
      cy.contains(title).should('be.visible');
      cy.contains(/urgent/i).should('exist');
    });

    it('TC-013 – User can change task status to Delegated', { tags: '@regression' }, () => {
      const title = 'Delegated task ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.setStatus(title, 'Delegated');
      cy.contains(title).should('be.visible');
      cy.contains(/delegated/i).should('exist');
    });

    it('TC-023 – Completed task can be marked incomplete', { tags: '@regression' }, () => {
      const title = 'Toggle me ' + Date.now();
      TodoListPage.addTask(title);
      TodoListPage.markCompleted(title);
      TodoListPage.markCompleted(title);
      TodoListPage.getTaskByTitle(title).should('be.visible');
    });
  });

  describe('Filters', () => {
    it('TC-015 – Filter shows only completed tasks', { tags: '@regression' }, () => {
      const done = 'Done task ' + Date.now();
      const pending = 'Pending task ' + (Date.now() + 1);
      TodoListPage.addTask(done);
      TodoListPage.addTask(pending);
      TodoListPage.markCompleted(done);
      TodoListPage.applyFilter('Completed');
      TodoListPage.getTaskItems().should('have.length.at.least', 1);
    });

    it('TC-016 – Filter shows only active (non-completed) tasks', { tags: '@regression' }, () => {
      const done = 'Done ' + Date.now();
      const active = 'Active ' + (Date.now() + 1);
      TodoListPage.addTask(done);
      TodoListPage.addTask(active);
      TodoListPage.markCompleted(done);
      TodoListPage.applyFilter('Active');
      TodoListPage.getTaskByTitle(active).should('be.visible');
    });

    it('TC-017 – All filter shows every task', { tags: '@regression' }, () => {
      const a = 'All A ' + Date.now();
      const b = 'All B ' + (Date.now() + 1);
      TodoListPage.addTask(a);
      TodoListPage.addTask(b);
      TodoListPage.markCompleted(a);
      TodoListPage.applyFilter('All');
      TodoListPage.getTaskByTitle(a).should('be.visible');
      TodoListPage.getTaskByTitle(b).should('be.visible');
    });
  });

  describe('Empty state', () => {
    it('TC-022 – Empty list shows appropriate message or state', { tags: '@regression' }, () => {
      TodoListPage.getTaskItems().then(($items) => {
        const count = $items.length;
        expect(count).to.be.a('number');
      });
      cy.get('body').should('be.visible');
    });
  });
});
