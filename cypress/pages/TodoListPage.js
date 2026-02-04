/**
 * Page Object for the Todo List (todolist.james.am)
 * Selectors are generic and can be refined per app DOM.
 */
class TodoListPage {
  static get newTaskInput() {
    return cy.get('input[placeholder*="task"], input[placeholder*="todo"], input[placeholder*="need"], input[placeholder*="add"], input[type="text"]').first();
  }

  static addButton() {
    return cy.get('[data-cy="add-task"]').first().then($el => $el.length ? $el : cy.contains('button', /add|submit|create/i).first());
  }

  static get taskItems() {
    return cy.get('[data-cy="task-item"], [class*="task-item"], li, .todo-item, [role="listitem"]');
  }

  static get emptyMessage() {
    return cy.get('[class*="empty"], [data-cy="empty"], .no-tasks, .empty-state');
  }

  static visit() {
    cy.visit('/#/');
    return this;
  }

  static addTask(title) {
    this.newTaskInput.clear().type(title + '{enter}');
    return this;
  }

  static getTaskItems() {
    return this.taskItems;
  }

  static getTaskByTitle(title) {
    return this.taskItems.contains(title).first();
  }

  static editTask(oldTitle, newTitle) {
    const item = this.getTaskByTitle(oldTitle);
    item.then(($el) => {
      const $edit = $el.find('input, [contenteditable], .edit').first();
      if ($edit.length) {
        cy.wrap($edit).click({ force: true }).clear().type(newTitle + '{enter}');
      } else {
        item.dblclick({ force: true });
        cy.focused().clear().type(newTitle + '{enter}');
      }
    });
    return this;
  }

  static deleteTask(title) {
    const item = this.getTaskByTitle(title);
    item.trigger('mouseover');
    item.then(($el) => {
      const $btn = $el.find('.destroy, .delete, [aria-label*="delete"], [data-cy="delete"], button');
      if ($btn.length) {
        cy.wrap($btn.last()).click({ force: true });
      } else {
        this.deleteTaskByClearingTitle(title);
      }
    });
    return this;
  }

  static deleteTaskByClearingTitle(title) {
    const item = this.getTaskByTitle(title);
    item.dblclick({ force: true });
    cy.focused().clear().type('{enter}');
    return this;
  }

  static markCompleted(title) {
    const item = this.getTaskByTitle(title);
    item.then(($el) => {
      const $toggle = $el.find('input[type="checkbox"], .toggle, [aria-label*="complete"], input').first();
      if ($toggle.length) {
        cy.wrap($toggle).click({ force: true });
      }
    });
    return this;
  }

  static setStatus(title, status) {
    const item = this.getTaskByTitle(title);
    item.then(($el) => {
      const $control = $el.find('select, [role="combobox"], .status-dropdown, [class*="status"], button').first();
      if ($control.length) {
        cy.wrap($control).click({ force: true });
        cy.contains(status).click();
      }
    });
    return this;
  }

  static getFilter(name) {
    return cy.contains(name);
  }

  static applyFilter(name) {
    this.getFilter(name).click();
    return this;
  }

  static getEmptyMessage() {
    return this.emptyMessage;
  }
}

export default TodoListPage;
