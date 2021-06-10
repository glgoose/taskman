const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('db/db.taskman', err => {
  if (err) throw err
  console.log('Connected to the DB')
})

function create (req, res) {
  const task = req.body

  db.run(
    'INSERT INTO task (title, isDone) VALUES  (?, ?)',
    [task.title, task.isDone],
    function (err) {
      if (err) throw err
      task.id = this.lastID
      console.log(`Success: created task with id ${task.id}`)
      res.json(task)
    }
  )
}

const readAll = (req, res) =>
  db.all('SELECT * from task', (err, rows) => {
    if (err) throw err
    console.log('Success: read all tasks from DB')
    res.json(rows)
  })

const updateDone = (req, res) =>
  db.run(
    `UPDATE task SET isDone = ${req.body.isDone} WHERE id = ${req.body.id}`,
    err => {
      if (err) throw err
      console.log(`Success: updated task with id ${req.body.id}`)
      res.sendStatus(200)
    }
  )

const deleteTask = (req, res) =>
  db.run(`DELETE from task WHERE id = ${req.body.id}`, err => {
    if (err) throw err
    console.log(`Success: deleted task with id ${req.body.id}`)
    res.sendStatus(200)
  })

exports.create = create
exports.readAll = readAll
exports.updateDone = updateDone
exports.deleteTask = deleteTask
