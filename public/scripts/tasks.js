// FRONT END FILE TO INTERACT WITH THE DOM
const btn = document.getElementById('btn')
const list = document.getElementById('list')

function getAllTasks () {
  fetch('http://localhost:8080/api/task/read/all')
    .then(res => res.json())
    .then(tasks => tasks.forEach(task => displayTask(task)))
}

const postToDb = async (endpoint, body) =>
  fetch(`http://localhost:8080${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

async function createTask () {
  const input = document.getElementById('taskInput')
  const task = { title: input.value, isDone: 0 }

  const res = await postToDb('/api/task/create', task)
  if (res.ok) {
    const createdTask = await res.json()
    displayTask(createdTask)
  }
}

async function updateDone () {
  const taskEl = this.parentNode
  taskEl.dataset.isDone = 1 - taskEl.dataset.isDone
  await postToDb('/api/task/update/done', taskEl.dataset)
}

async function deleteTask () {
  const taskEl = this.parentNode
  const res = await postToDb('/api/task/delete', taskEl.dataset)
  if (res.ok) taskEl.remove()
}

function displayTask (task) {
  const listItem = document.createElement('li')

  listItem.classList.add('task')
  listItem.dataset.id = task.id
  listItem.dataset.isDone = task.isDone

  // create title text el
  const titleEl = document.createElement('span')
  titleEl.innerText = task.title
  titleEl.classList.add('title')
  listItem.append(titleEl)

  // create checkbox el
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.classList.add('checkbox')
  checkbox.addEventListener('click', updateDone)
  if (task.isDone) checkbox.checked = true
  listItem.prepend(checkbox)

  // create delete el
  const deleteEl = document.createElement('span')
  deleteEl.innerText = 'x'
  deleteEl.classList.add('delete')
  deleteEl.addEventListener('click', deleteTask)
  listItem.append(deleteEl)

  list.append(listItem)
}

getAllTasks()
btn.addEventListener('click', createTask)
