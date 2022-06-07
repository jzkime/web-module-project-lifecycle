import React from 'react'

export default class Form extends React.Component {
  state = {
    inputValue: ''
  }

  changeHandler = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.add(this.state.inputValue);
    this.setState({inputValue: ''})
  }

  render() {
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <input type='text' onChange={this.changeHandler} value={this.state.inputValue}/>
          <input type='submit'/>
        </form>
          <input type='button' value={this.props.hidden ? 'show complete' : 'hide complete'} onClick={this.props.hide}/>
          <input type='button' value='clear' onClick={this.props.clear}/>
      </>
    )
  }
}
