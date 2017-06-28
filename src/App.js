import React, { Component } from 'react';
import './App.css';

class TodoForm extends Component {

  render() {
    return(
      <div>
        <form onSubmit={(e) => this.props.onSubmit(e)} >
        <input type='text' onChange={(e) => this.props.onChange(e)}/>
        <input type='submit' value='new todo' />
        </form >
      </div>
    )
  }
}

class Todo extends Component {

  render(){
    return(
      <li>
        <a onClick={this.props.onClick} id={this.props.position} >✘</a>
        {this.props.position} = {this.props.value}</li>
  )}
}


class App extends Component {

  state = {
    todos: [],
    new_todo: ''
  }

  constructor(){
    super();

    this.handleChangeNewTodo = this.handleChangeNewTodo.bind(this);
    this.handleSubmitNewTodo = this.handleSubmitNewTodo.bind(this);

    fetch('/todos').then(res => res.json())
                   .then(data => this.setState({ todos: data }))
                   .catch((e) => { console.log("error parsing JSON"); })
  }

  handleDelete(index) {
    console.log("click to delete" + index);
    fetch("/todos/delete/" + index).then(res => res.json())
              .then(data => this.setState({ todos: data }));
  }

  handleChangeNewTodo(e){
    this.setState(...this.state, {new_todo: e.target.value});
    console.log(this.state);
    e.preventDefault();
  }

  handleSubmitNewTodo(e){
    console.log('in the subnit');
    console.log(this.state);
    const new_todo = {todo: this.state.new_todo};

    fetch('/todos/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_todo)
    }).then(res => res.json())
      .then(data => this.setState({ todos: data }));


    e.preventDefault();
  }

  render() {
    const {todos} = this.state;

    return (
      <div className="App">

        debut de la liste
        <ul>
        {todos.map((todo, index) => <Todo key={index}
                                          value={todo}
                                          onClick={() => this.handleDelete(index)}
                                          position={index} />)}
        </ul>

        <TodoForm onChange={this.handleChangeNewTodo}
                  onSubmit={this.handleSubmitNewTodo} />

      </div>
    );
  }
}

export default App;
