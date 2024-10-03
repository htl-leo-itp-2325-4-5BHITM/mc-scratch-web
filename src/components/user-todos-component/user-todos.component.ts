import { html, render } from "lit-html"
import { Model, store } from "../../model/model"
import { ToDo } from "../../model/todo"
import { map } from "rxjs"
import {User} from "../../model/user"

class UserTodosComponent extends HTMLElement {
    connectedCallback() {
        store
            .pipe(
                map(model => model.users),
                map((users: User[]) => users.filter(user => user.id == Number(this.getAttribute("user-id"))))
            )
            .subscribe(users => {
                let theUser = users[0]

                let content = html`
                    <h2>${theUser.username}</h2>
                `

                render(content, this)
            })

        console.log()

        render(html`<p>user ${this.getAttribute("user-id")} </p>`, this)
    }
}

customElements.define("user-todos-component", UserTodosComponent)