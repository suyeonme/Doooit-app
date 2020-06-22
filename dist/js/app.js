var unique = require('uniq');

'use strict';

/******  QUOTE CONTROLLER ******/

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Quote = /*#__PURE__*/function () {
  function Quote() {
    _classCallCheck(this, Quote);
  }

  _createClass(Quote, [{
    key: "getQuote",
    value: function () {
      var _getQuote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch("http://quotes.stormconsultancy.co.uk/random.json");

              case 3:
                _context.next = 5;
                return _context.sent.json();

              case 5:
                res = _context.sent;
                this.author = res.author;
                this.quote = res.quote;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                alert('Sorry. Something is wrong with quote.. :(');

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function getQuote() {
        return _getQuote.apply(this, arguments);
      }

      return getQuote;
    }()
  }, {
    key: "renderQuote",
    value: function renderQuote(parent) {
      var markup = "\n            <div class=\"header-quote\">\n                <p>\n                    <q>".concat(this.quote, "</q>\n                    <address>by ").concat(this.author, "</address>\n                </p>\n            </div>\n        ");
      parent.insertAdjacentHTML('beforeend', markup);
    }
  }]);

  return Quote;
}();

;
/******  UI CONTROLLER ******/

var UIController = function () {
  var elements = {
    todoInput: document.querySelector('.todo-input'),
    todoBtn: document.querySelector('.todo-btn'),
    todoContainer: document.querySelector('.todo-container'),
    todoList: document.querySelector('.todo-list'),
    todoItem: document.querySelector('.todo'),
    filterOption: document.querySelector('.filter-todo'),
    removeBtn: document.querySelector('.btn-delete'),
    dateContainer: document.querySelector('.header-quote')
  };
  return {
    DOMstrings: elements,
    clearField: function clearField(field) {
      field.value = '';
    },
    addTodo: function addTodo() {
      var markup = "\n            <div class=\"todo\">\n                <li class=\"todo-item\">".concat(elements.todoInput.value, "</li>\n                <button class=\"btn-complete btn\"><i class=\"far fa-check-square icon\" ></i></button>\n                <button class=\"btn-delete btn\"><i class=\"far fa-trash-alt icon\"></i></button>\n            </div>\n            ");
      elements.todoList.insertAdjacentHTML('beforeend', markup);
    },
    filterTodo: function filterTodo(e) {
      var todos = Array.from(elements.todoList.childNodes);
      todos.forEach(function (todo) {
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
    renderDate: function renderDate() {
      var now, year, months, month, day, markup;
      now = new Date();
      year = now.getFullYear();
      months = ['January', 'Fubruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocober', 'November', 'December'];
      month = months[now.getMonth()].toUpperCase();
      day = now.getDate();
      markup = "\n                <h3 class=\"header-date\">".concat(month, " ").concat(day, ", ").concat(year, "</h3> \n            ");
      elements.dateContainer.insertAdjacentHTML('afterbegin', markup);
    }
  };
}();
/******  LOCAL STORAGE CONTROLLER ******/


var storageController = function () {
  var todos;

  var checkStorage = function checkStorage() {
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    ;
    return todos;
  };

  return {
    saveStorage: function saveStorage(todo) {
      // CHECK TODO EXIST IN LOCAL STORAGE
      checkStorage(); // SAVE TODO TO LOCAL STORAGE

      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    },
    getStorage: function getStorage(e) {
      if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(function (todo) {
          var todoList = document.querySelector('.todo-list');
          var markup = "\n                        <div class=\"todo\">\n                            <li class=\"todo-item\">".concat(todo, "</li>\n                            <button class=\"btn-complete btn\"><i class=\"far fa-check-square icon\" ></i></button>\n                            <button class=\"btn-delete btn\"><i class=\"far fa-trash-alt icon\"></i></button>\n                        </div>\n                    ");
          todoList.insertAdjacentHTML('beforeend', markup);
        });
      }

      ;
    },
    removeTodo: function removeTodo(todo) {
      checkStorage();
      var todoIndex = todo.children[0].innerText; // Improve

      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  };
}();
/******  CONTROLLER ******/


var controller = function (UICtrl, storageCtrl) {
  var string = UICtrl.DOMstrings;
  window.addEventListener('DOMContentLoaded', storageCtrl.getStorage); // CLICK TODO BUTTON

  string.todoBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Add todo to UI

    UICtrl.addTodo(); // Save todo in local storage

    storageCtrl.saveStorage(string.todoInput.value); // Clear field

    UICtrl.clearField(string.todoInput);
  });
  string.todoList.addEventListener('click', function (e) {
    var item = e.target;
    var todo = item.parentElement;

    if (item.matches('.btn-complete, .btn-complete *')) {
      // Click complete button
      todo.classList.toggle('completed'); // Click remove button  
    } else if (item.matches('.btn-delete, .btn-delete *')) {
      todo.classList.add('fall');
      todo.addEventListener('transitionend', function () {
        return todo.remove();
      });
      storageCtrl.removeTodo(todo);
    }

    ;
  });
  string.filterOption.addEventListener('change', UICtrl.filterTodo);
  return {
    init: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var quote;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('Application is started.');
                UICtrl.renderDate();
                quote = new Quote();
                _context2.prev = 3;
                _context2.next = 6;
                return quote.getQuote();

              case 6:
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](3);
                console.log(_context2.t0);

              case 11:
                quote.renderQuote(string.dateContainer);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 8]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  };
}(UIController, storageController); // Init


controller.init();

