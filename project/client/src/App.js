import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(async () => {
    const { data } = await axios.get('http://localhost:8081/api/todos')
    setTodos(data)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const todo = await axios.post('http://localhost:8081/api/todos', { todo: newTodo })

    setTodos(todos.concat(todo))
    setNewTodo('')
  }

  return (
    <div>
      <h1>Todo App</h1>
      <img src="http://localhost:8081/api/image" width="400" height="400" />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="140"
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)} />
        <button type="submit">Create TODO</button>
      </form>
      <ul>
        {todos.map(todo => <li>{todo}</li>)}
      </ul>
    </div>
  )
}

export default App
