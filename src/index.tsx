import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom'


// ALIAS FOR React.FormEvent<HTMLFontElement> ------ GENERIC
// TYPES
type formElem = React.FormEvent<HTMLFormElement>

// INTERFACES
interface ITodo {
    text: string
    complete: boolean
}
// interface ITodo2 extends ITodo {
//     tags: string[]
// }

export default function App(): JSX.Element {
    // const sum = (a:number, b:number):number => {
    //     return a + b;
    // }

    const [value, setValue] = useState<string>('')
    // console.log(value);
    // setValue('test')
    // console.log(value);
    // debugger

    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = (e: formElem):void => {
        e.preventDefault()
        addTodo(value)
        setValue('')
    }

    const addTodo = (text:string):void => {
        const newTodos: ITodo[] = [...todos, {text, complete: false}]

        setTodos(newTodos)
    }

    // console.log(todos)


    const completeTodo = (index:number):void => {
        const newTodos: ITodo[] = [...todos]
        newTodos[index].complete = !newTodos[index].complete
        setTodos(newTodos) 
    }

    const removeTodo =(index:number):void => {
        const newTodos: ITodo[] = [...todos]
        newTodos.splice(index, 1);
        setTodos(newTodos)
    }
    return (
        // <h1>
        //     Hello {sum(8, 10)}
        // </h1>

        <Fragment>
            <h1>
                Todo List
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={value} onChange={e => setValue(e.target.value)}/>
                <button type="submit">Add Todo</button>
            </form>
            <section style={{
                                marginTop: '20px'
                            }}>
                {todos.map((todo:ITodo, index:number) => {
                    return(
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '245px',
                            marginBottom: '12px'
                            // border: '1px solid red'
                        }}>
                            <div style={{
                                textDecoration: todo.complete ? 'line-through': '',
                                flexBasis: '120px',
                                fontSize: '1.1rem'
                                }}>
                                    {todo.text}
                            </div>
                            <button type="button" onClick={() =>completeTodo(index)} style={{
                                flexBasis: '80px'
                            }}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
                            <button type="button" onClick={() => removeTodo(index)} style={{
                                flexBasis: '20px'
                            }}>&times;</button>
                        </div>
                    )
                })}
            </section>
        </Fragment>

    )
}

const root = document.getElementById('app-root');
ReactDOM.render(<App/>, root)
