'use strict'

/**
 *  STRING
 */
const elements = {
    todoInput: document.querySelector('.todo-input'),
    todoBtn: document.querySelector('.todo-btn'),
    todoContainer: document.querySelector('.todo-container'),
    todoList: document.querySelector('.todo-list'),
    todoItem: document.querySelector('.todo'),
    filterOption: document.querySelector('.filter-todo')
};

/**
 *  FUNCTIONS
 */
const clearField = field => field.value = '';

const addTodo = e => {
    const markup = `
    <div class="todo">
        <li class="todo-item">${elements.todoInput.value}</li>
        <button class="btn-complete btn"><i class="far fa-check-square icon" ></i></button>
        <button class="btn-delete btn"><i class="far fa-trash-alt icon"></i></button>
    </div>
    `
    elements.todoList.insertAdjacentHTML('beforeend', markup);
};

const filterTodo = e => {
    const todos = elements.todoList.childNodes;

    todos.forEach(todo => {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });
};


/**
 * EVENT HANDLER
 */
elements.todoBtn.addEventListener('click', e => {
    e.preventDefault();

    // Add item to UI
    addTodo();

    // Clear field
    clearField(elements.todoInput);
});


elements.todoList.addEventListener('click', e => {
    const item = e.target;

    if (e.target.matches('.btn-complete, .btn-complete *')) {
        // Click complete button
        item.parentElement.classList.toggle('completed');

        // Click remove button  
    } else if (item.matches('.btn-delete, .btn-delete *')) {
        item.parentElement.classList.add('fall');
        item.parentElement.addEventListener('transitionend', e => {
            item.remove();
        });
    }
});

elements.filterOption.addEventListener('change', filterTodo);