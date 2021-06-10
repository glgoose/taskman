// lib and imports
const express = require('express')
const app = express()

app.use(express.json())
app.use('/static', express.static('public'))

app.get('/', (req, res) =>
  res.sendFile('/public/index.html', { root: __dirname })
)

const task = require('./controllers/task')

app.post('/api/task/create', task.create)
app.get('/api/task/read/all', task.readAll)
app.post('/api/task/update/done', task.updateDone)
app.post('/api/task/delete', task.deleteTask)

app.listen(8080, () => console.log('Server running at port 8080'))
