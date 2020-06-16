'use strict'

/**
 *  STRING
 */
const elements = {
    todoInput: document.querySelector('.todo-input'),
    todoBtn: document.querySelector('.todo-btn'),
    todoList: document.querySelector('.todo-list'),
    todoItem: document.querySelector('.todo'),
};



const clearField = field => field.value = '';

const addTodo = e => {
    const markup = `
    <div class="todo">
        <li class="todo-item">${elements.todoInput.value}</li>
        <button class="btn-complete btn"><i class="far fa-check-square" icon></i></button>
        <button class="btn-delete btn"><i class="far fa-trash-alt" icon></i></button>
    </div>
    `
    elements.todoList.insertAdjacentHTML('beforeend', markup);
};

const deleteTodo = e => {
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) deleteBtn.parentElement.remove(elements.todoItem);
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
};


/**
 * EVENT HANDLER
 */
elements.todoBtn.addEventListener('click', controller);
elements.todoList.addEventListener('click', deleteTodo);