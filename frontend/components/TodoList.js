import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <>
      {this.props.todos.map(to => {
        if(this.props.hide){
          if(!to.completed) {
            return <Todo todo={to} key={to.id} toggle={this.props.toggle}/>
          }
        } else {
          return <Todo todo={to} key={to.id} toggle={this.props.toggle}/>
        }
      })}
      </>
    )
  }
}
