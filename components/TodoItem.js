import { useState } from 'react';


const TodoItem = ({ task, id, deleteTodo, updateTodo, isCompleted, toggleTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editInput, setEditInput] = useState(task);

    const handleSubmit = e => {
        e.preventDefault();
        updateTodo(id, editInput);
        setEditInput("");
        setIsEditing(false)
    }

    return (
        <>
          {
              isEditing ?
              <form onSubmit={ handleSubmit }>
                  <input type="text" value={ editInput } onChange={ (e) => setEditInput(e.target.value )} />
                  <button type="submit"> Update </button>
                  <button onClick={ () => setEditInput(false) } type="button"> Cancel </button>
              </form>
              :
              <li > 
            <input type="checkbox" onChange={ () => toggleTodo(id, isCompleted) }/>
                <span style={{ textDecoration: `${ isCompleted ? 'line-through' : ''}` }}>{ task }</span> 
              <button onClick={ () => deleteTodo(id) }>&times;</button> 
              <button onClick={ () => setIsEditing(true)}> Edit </button>
            </li>
          }
        </>
    );
}

export default TodoItem;