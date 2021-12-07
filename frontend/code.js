
(async() => {
    let todos = await (await fetch("http://127.0.0.1:3001/api/todos")).json();

    let todos_divs = document.getElementById("todos");

    for (r in todos.collection) {

        let todo_div = document.createElement("div");
        todo_div.className = "todo";
        let todo_text = document.createElement("input");
        todo_text.value = todos.collection[r].todo;
        todo_text.type = "text";
        let todo_check = document.createElement("input");
        todo_check.type = "checkbox";
        todo_check.checked = todos.collection[r].chek;
        let todo_edit = document.createElement("button");
        todo_edit.className = "action";
        todo_edit.innerHTML = "edit";
        todo_edit.onclick = function() {
            (async() => {
                let id = this.parentElement.getAttribute("data-id");
                console.log({
                    todo: this.parentElement.querySelector('input[type="text"]').value,
                    chek: this.parentElement.querySelector('input[type="checkbox"]').checked
                });
                await fetch(`http://127.0.0.1:3001/api/todos/${id}`, 
                    {
                        method: "PUT",
                        body: {
                            todo: this.parentElement.querySelector('input[type="text"]').value,
                            chek: this.parentElement.querySelector('input[type="checkbox"]').checked
                        }
                    });
            })();
        }
        let todo_delete = document.createElement("button");
        todo_delete.className = "action";
        todo_delete.innerHTML = "delete"
        todo_delete.onclick = function() {
            (async() => {
                let id = this.parentElement.getAttribute("data-id");
                await fetch(`http://127.0.0.1:3001/api/todos/${id}`, {method: "DELETE"});
                this.parentElement.remove();
            })();
        }
        todo_div.appendChild(todo_text);
        todo_div.appendChild(todo_check);
        todo_div.appendChild(todo_edit);
        todo_div.appendChild(todo_delete);
        todo_div.setAttribute("data-id", todos.collection[r].id);
        todos_divs.appendChild(todo_div);
    }
})();

console.log(todos);
