import { html, render } from "lit-html"
import { Model, store } from "../../model/model"
import { ToDo } from "../../model/todo"
import { map } from "rxjs"

interface RowViewModel {
    id: number
    text: string
}
interface RowUserModel {
    id: number
    name: string
    username: string
}
interface ViewModel {
    user: RowUserModel
    header: string
    rows: RowViewModel[]
}

/*
app
über alle user loopen und einen UserTodosComponent erstellen

userTodosComponent
observedAttributes verwenden um username und todos von der app übergeben zu können
*/

class AppComponent extends HTMLElement {
    connectedCallback() {
        console.log("App component connected")
        store
            .pipe(
                map(model => model.users), 
                map(user => user.map(user => user.id))
            )
            .subscribe(userIds => {
                const content = html`
                    ${userIds.map(
                        userId => {
                            console.log(userId)
                            return html`<user-todos-component user-id="${userId}"></user-todos-component>`
                        }
                    )}
                `                
                render(content, this)
            })
    }
}
customElements.define("app-component", AppComponent)

function toViewModel(model: Model) {
    const todosByUser = new Map<number, RowViewModel[]>()

    model.todos.forEach((todo: ToDo) => {
        if (!todosByUser.has(todo.userId)) {
            todosByUser.set(todo.userId, [])
        }
        todosByUser.get(todo.userId).push({
            id: todo.id,
            text: todo.title,
        })
    })

    const usersWithTodos = model.users.map(user => {
        return {
            user: {
                id: user.id,
                name: user.name,
                username: user.username
            },
            rows: todosByUser.get(user.id) || [],
            header: 'Title'
        }
    })

    return usersWithTodos
}

function getAllTodos(usersWithTodos: ViewModel[]) {
    const allTodos: RowViewModel[] = []

    usersWithTodos.forEach(user => {
        allTodos.push(...user.rows)
    })

    return allTodos
}

function layoutTemplate(usersWithTodos: ViewModel[], allTodos: RowViewModel[]) {
    return html`
        <div class="container">
            <div class="left-section">
                ${usersWithTodos.map(todoTable)}
            </div>
            <div class="right-section">
                ${allTodosTable(allTodos)}
            </div>
        </div>
    `
}

function todoTable(vm: ViewModel) {
    const todoTemplate = vm.rows.map(todoRow)
    return html`
        <h2>${vm.user.name} | ${vm.user.username}</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>${vm.header}</th>
                </tr>
            </thead>
            <tbody>
                ${todoTemplate}
            </tbody>
        </table>
    `
}

function allTodosTable(todos: RowViewModel[]) {
    const todoTemplate = todos.map(todoRow)
    return html`
        <h2>All Todos</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                ${todoTemplate}
            </tbody>
        </table>
    `
}

function todoRow(toDo: RowViewModel) {
    return html`
        <tr>
            <td>${toDo.id}</td>
            <td>${toDo.text}</td>
        </tr>
    `
}