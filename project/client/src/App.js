import React, { useState } from "react"

const App = () => {
  const [newTodo, setNewTodo] = useState('')
  const todos = [
    'TODO 1',
    'TODO 2'
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newTodo)
    setNewTodo('')
  }

  return (
    <div>
      <h1>Todo App</h1>
      <img src="https://picsum.photos/1200" width="400" height="400" />
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
