import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./components/Button";


type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    removeAllTasksInOneTodo: (todolistId: number) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id)
    }

    const removeAllTasksInOneTodoHandler = () => {
        props.removeAllTasksInOneTodo(props.id)
    }


    return <div>
        <div><Button title={"Remove All task"} onClick={removeAllTasksInOneTodoHandler}/></div>
        <h3> {props.title}
            {/*<button onClick={()=>props.removeTodolist(props.id)}>x</button>*/}
            <Button title={'X'} onClick={removeTodolistHandler}/>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            {/*<button onClick={() => {'addTask'}}>+</button>*/}
            <Button title={'+'} onClick={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}

        </div>

        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }
                    //  removeTask: (taskId: string, todolistId: number) => void

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title={'X'} onClick={() => removeTaskHandler(t.taskId)}/>
                        {/*<button onClick={() => {'removeTask'}}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button title={"All"} onClick={() => changeFilterHandler("all")}/>
            <Button title={"active"} onClick={() => changeFilterHandler("active")}/>
            <Button title={"completed"} onClick={() => changeFilterHandler("completed")}/>
            {/*<button onClick={changeFilterHandler}>All</button>*/}
            {/*<button onClick={() => {}}>Active</button>*/}
            {/*<button onClick={() => {}}>Completed</button>*/}
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


