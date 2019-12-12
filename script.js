let todo = []
                const search = {
                    text: '',
                    hideCompleted: false
                }
                const todoJSON = localStorage.getItem('todo')

                if (todoJSON !== null) {
                    todo = JSON.parse(todoJSON)
                }
                const renderTodo = function(todo, search) {
                    
                    let filteredTodo = todo.filter(function(todo) {
                        return todo.text.toLowerCase().includes(search.text.toLowerCase())
                    })

                    filteredTodo = filteredTodo.filter(function(todo) {
                        if (search.hideCompleted) {
                            return !todo.completed
                        } else {
                            return true
                        }
                    })
                    document.querySelector('#todo').innerHTML = ''

                    filteredTodo.forEach(function(tod) {
                        const todoEl = document.createElement('li');
                        const brake = document.createElement('br')
                        todoEl.textContent = tod.text
                        document.querySelector('#todo').appendChild(todoEl)
                        document.querySelector('#todo').appendChild(brake)
                    })
                }
                renderTodo(todo, search)

                document.querySelector('#searchTodo').addEventListener('input', function(s) {
                    search.text = s.target.value.toLowerCase();
                    renderTodo(todo, search)
                })

                document.querySelector('#mainForm').addEventListener('submit', function(s) {
                    s.preventDefault();
                    let add = s.target.elements.todo.value;
                    todo.push({
                        text: add,
                        completed: false
                    })
                    localStorage.setItem('todo', JSON.stringify(todo))
                    renderTodo(todo, search)
                    s.target.elements.todo.value = ''
                })
                document.querySelector("#deleteBut").addEventListener("click",function(s){
                    s.preventDefault()
                    todo.pop()
                    renderTodo(todo,search)
                })
