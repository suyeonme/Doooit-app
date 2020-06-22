'use strict'
import axios from 'axios';


/******  QUOTE CONTROLLER ******/
class Quote {


};

/******  UI CONTROLLER ******/
const UIController = (function() {
    const elements = {
        todoInput: document.querySelector('.todo-input'),
        todoBtn: document.querySelector('.todo-btn'),
        todoContainer: document.querySelector('.todo-container'),
        todoList: document.querySelector('.todo-list'),
        todoItem: document.querySelector('.todo'),
        filterOption: document.querySelector('.filter-todo'),
        removeBtn: document.querySelector('.btn-delete'),
        headerLogo: document.querySelector('.header-logo')
    };

    return {
        DOMstrings: elements,

        clearField: function(field) {
            field.value = ''
        },

        addTodo: function() {
            const markup = `
            <div class="todo">
                <li class="todo-item">${elements.todoInput.value}</li>
                <button class="btn-complete btn"><i class="far fa-check-square icon" ></i></button>
                <button class="btn-delete btn"><i class="far fa-trash-alt icon"></i></button>
            </div>
            `
            elements.todoList.insertAdjacentHTML('beforeend', markup);
        },

        filterTodo: function(e) {
            const todos = Array.from(elements.todoList.childNodes);

            todos.forEach(todo => {
                if (todo.classList !== undefined) {
                    switch (e.target.value) {
                        case 'all':
                            todo.style.display = 'flex';
                            break;
                        case 'completed':
                            if (todo.classList.contains('completed')) {
                                todo.style.display = 'flex';
                            } else {
                                todo.style.display = 'none';
                            }
                            break;
                        case 'uncompleted':
                            if (!todo.classList.contains('completed')) {
                                todo.style.display = 'flex';
                            } else {
                                todo.style.display = 'none';
                            }
                        default:
                            break;
                    }
                }
                return;
            });
        },

        renderDate: function() {
            let now, year, months, month, day, markup;

            now = new Date();
            year = now.getFullYear();
            months = ['January', 'Fubruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocober', 'November', 'December'];
            month = months[now.getMonth()];
            day = now.getDate();
            markup = `
                <h3 class="header-date">${month} ${day}, ${year}</h3> 
            `;
            elements.headerLogo.insertAdjacentHTML('beforeend', markup);
        }
    }
})();


/******  LOCAL STORAGE CONTROLLER ******/
const storageController = (function() {
    let todos;

    const checkStorage = () => {
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        };
        return todos;
    };

    return {
            saveStorage: function(todo) {
                // CHECK TODO EXIST IN LOCAL STORAGE
                checkStorage();

                // SAVE TODO TO LOCAL STORAGE
                todos.push(todo);
                localStorage.setItem('todos', JSON.stringify(todos));
        },

        getStorage: function(e) {
            if (localStorage.getItem('todos') === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem('todos'));
        
                todos.forEach(todo => {
                    const todoList = document.querySelector('.todo-list');
                    const markup = `
                        <div class="todo">
                            <li class="todo-item">${todo}</li>
                            <button class="btn-complete btn"><i class="far fa-check-square icon" ></i></button>
                            <button class="btn-delete btn"><i class="far fa-trash-alt icon"></i></button>
                        </div>
                    `;
                    todoList.insertAdjacentHTML('beforeend', markup);
                })
            };
        }, 
        
        removeTodo: function(todo) {
            checkStorage();
            const todoIndex = todo.children[0].innerText; // Improve
            todos.splice(todos.indexOf(todoIndex), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }
})();


/******  CONTROLLER ******/
const controller = (function(UICtrl, storageCtrl) {
    const string = UICtrl.DOMstrings;

    window.addEventListener('DOMContentLoaded', storageCtrl.getStorage);

    // CLICK TODO BUTTON
    string.todoBtn.addEventListener('click', e => {
        e.preventDefault();

        // Add todo to UI
        UICtrl.addTodo();

        // Save todo in local storage
        storageCtrl.saveStorage(string.todoInput.value);

        // Clear field
        UICtrl.clearField(string.todoInput);
    });

    string.todoList.addEventListener('click', e => {
        const item = e.target;
        const todo = item.parentElement;

        if (item.matches('.btn-complete, .btn-complete *')) {
            // Click complete button
            todo.classList.toggle('completed');

        // Click remove button  
        } else if (item.matches('.btn-delete, .btn-delete *')) {
            todo.classList.add('fall');
            todo.addEventListener('transitionend', () => todo.remove()); 
            storageCtrl.removeTodo(todo);
        };
    });

    string.filterOption.addEventListener('change', UICtrl.filterTodo);

    return {
        init: function() {
            console.log('Application is started.');
            UICtrl.renderDate();
        }
    }
})(UIController,storageController);

// Init
controller.init();