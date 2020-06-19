'use strict'

const elements = {
    todoInput: document.querySelector('.todo-input'),
    todoBtn: document.querySelector('.todo-btn'),
    todoContainer: document.querySelector('.todo-container'),
    todoList: document.querySelector('.todo-list'),
    todoItem: document.querySelector('.todo'),
    filterOption: document.querySelector('.filter-todo'),
    removeBtn: document.querySelector('.btn-delete')
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
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                default:
                    break;
            }
        }
        return;
    });
};

const checkLocalTodo = () => {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
};

const saveLocalTodos = todo => {
    let todos;

    // Check if having todo in local stroage
    checkLocalTodo();

    // Push todo to todos and local strage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => {
    let todos;
    console.log('tetTodo!');

    // Check if having todo in local stroage
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));

        todos.forEach(todo => {
            const markup = `
                <div class="todo">
                    <li class="todo-item">${todo}</li>
                    <button class="btn-complete btn"><i class="far fa-check-square icon" ></i></button>
                    <button class="btn-delete btn"><i class="far fa-trash-alt icon"></i></button>
                </div>
            `
            elements.todoList.insertAdjacentHTML('beforeend', markup);
        })
    }
};


/**
 * EVENT HANDLER
 */
elements.todoBtn.addEventListener('click', e => {
    e.preventDefault();

    // Add item to UI
    addTodo();

    // Save todo in local storage
    saveLocalTodos(elements.todoInput.value);

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

window.addEventListener('DOMContentLoaded', getTodos);







