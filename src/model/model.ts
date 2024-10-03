import { BehaviorSubject } from "rxjs"
import { ToDo } from "./todo"
import { User } from "./user"

export interface Model {
    readonly greeting: string
    readonly users: User[]
    readonly todos: ToDo[]
}

const initialState: Model = {
    greeting: "hallo Sebastian",
    users: [],
    todos: []
}

export const store = new BehaviorSubject<Model>(initialState);