import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    hide: false
  }

  componentDidMount() {
    axios.get(URL).then(res => {
      this.setState({
        todos: res.data.data
      })
    }).catch(err => console.error(err))
  }

  formAdd = (todo) => {
    const newTodo = {
      id: Date.now(),
      name: todo,
      completed: false
    }

    axios.post(URL, newTodo).then(res => {
      this.setState({
        ...this.state,
        todos: [...this.state.todos, res.data.data]
      })
    })
  }

  toggleComplete = (todoID, com) => {
    axios.patch(`${URL}/${todoID}`, {
      completed: !com
    }).then(res =>{
      this.setState({
        ...this.state,
        todos: this.state.todos.map(task => {
          if(task.id === res.data.data.id) {
            return res.data.data;
          } else {
            return task;
          }
        })
      })
    })
  }

  hideComplete = () => {
    this.setState({
      hide: !this.state.hide
    })
  }
 
  clearHandler = () => {
    const filtered = this.state.todos.filter(todo => {
      return !todo.completed
    })

    this.setState({
      ...this.state,
      todos: filtered
    })
    }

  render() {
    return(
      <>
        <TodoList todos={this.state.todos} toggle={this.toggleComplete} hide={this.state.hide}/>
        <Form add={this.formAdd} hide={this.hideComplete} hidden={this.state.hide} clear={this.clearHandler} />
      </>
    )
  }
}
