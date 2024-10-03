import { html, render } from "lit-html"
import { Model, store } from "../../model/model"
import { ToDo } from "../../model/todo"
import { map } from "rxjs"

class UserTodosComponent extends HTMLElement {
    connectedCallback() {
        console.log("User todos component connected")
        store
            .pipe(map(toViewModel))
            .subscribe(usersWithTodos => {
                let content = html`
                    <h2>${}</h2>
                `
                const allTodos = getAllTodos(usersWithTodos)
                const html = layoutTemplate(usersWithTodos, allTodos)
                render(html, this)
            })
    }
}
customElements.define("user-todos-component", UserTodosComponent)