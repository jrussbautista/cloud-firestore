import { useEffect, useState } from 'react';
import { firestore } from '../components/firebase';
import TodoItem from '../components/TodoItem';

const index = () => {
    const [todos, setTodos] = useState([])
    const [inputTodo, setInputTodo] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {

        const getUserTodos = async () => {
        const res = await firestore.collection('todos');
        // run everytime when todos collection change
        res.onSnapshot(snapShot => {
           const todos = snapShot.docs.map( todo => {
               return{
                   id: todo.id,
                   ...todo.data()
               }
           });
           setTodos(todos);
        })
        setIsLoading(false)

        }

        getUserTodos();

    }, []);

    //add todo 
    const addTodo = async (todo) => {
        try {
            const res =  await firestore.collection('todos').add({
                task: todo,
                isCompleted: false
             })
   
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(inputTodo)
        setInputTodo("");
    }

    const handleDelete = async id => {
        try {
            // delete doc from firebase
            await firestore.collection('todos').doc(id).delete();
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id, newTodo) => {
        try {
            // update doc
            await firestore.collection('todos').doc(id).update({ task: newTodo})
       
        } catch (error) {
            console.log(error);
        }
    }

    const handleToggle = async (id, isCompleted) => {
        try {
            // toggle doc
            await firestore.collection('todos').doc(id).update({ isCompleted: !isCompleted })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <form onSubmit={ handleSubmit }>
                <input type="text" value={inputTodo} onChange = { (e) => setInputTodo(e.target.value)} />
                <button> Add todo </button>
            </form>
            <h1> List of todo: </h1>
            {
                isLoading ?
                <div>Loading...</div>
                :
                <>
                {
                    todos.length > 0 ?
                    <ul>
                        {
                            todos.map( todo => (
                                <TodoItem 
                                    key={ todo.id } {...todo} 
                                    deleteTodo={ handleDelete} 
                                    updateTodo={ handleUpdate} 
                                    toggleTodo={ handleToggle }/>
                            ))
                        }
                    </ul>
                    :
                    <div> No data </div>
                } 
                </>
            }
        </div>
    );
}

export default index;