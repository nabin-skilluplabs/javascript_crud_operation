// Asynchronous Javascript

const API_ENDPOINT = 'https://todo-backend-seven-nu.vercel.app/v1/todos';
// Methods used for making API request
// GET - Get existing records
// POST - Create new record
// PUT - Update existing record
// DELETE - Delete existing record

async function getAllContacts() {
  const response = await fetch(API_ENDPOINT, {
    method: 'GET',
  });
  return response;
}

function populateTodos(data) {
  const todoListElement = document.getElementById('todo_list');
  const todoHtml = data
    .map((todo) => {
      return `<li>${todo.title}</li>`;
    })
    .join('');
  todoListElement.innerHTML = todoHtml;
}

async function createToDo(todo) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: todo,
    }),
  });
  const data = await response.json();
  return data;
}

async function addNewTodo(event) {
  event.preventDefault();

  const todoElement = document.getElementById('todo');
  const todo = todoElement.value;
  await createToDo(todo);
  await loadTodos();
}

async function loadTodos() {
  const response = await getAllContacts();
  const data = await response.json();
  populateTodos(data.data);
}

(async () => {
  await loadTodos();
})();
