'use strict'

/**
 *  STRING
 */
const elements = {
    todoInput: document.querySelector('.todo-input'),
    todoBtn: document.querySelector('.todo-btn'),
    todoList: document.querySelector('.todo-list'),
};



const clearField = field => field.value = '';

const addTodo = e => {
    const markup = `
    <div class="todo">
        <li class="todo-item">${elements.todoInput.value}</li>
        <button class="btn-complete btn"><i class="far fa-check-square"></i></button>
        <button class="btn-delete btn"><i class="far fa-trash-alt"></i></button>
    </div>
    `
    elements.todoList.insertAdjacentHTML('beforeend', markup);
};


/**
 *  CONTROLLER
 */
const controller = e => {
    e.preventDefault();

    // Add item to UI
    addTodo();

    // Clear field
    clearField(elements.todoInput);

    // Delete item from UI
};


/**
 * EVENT HANDLER
 */
elements.todoBtn.addEventListener('click', controller);