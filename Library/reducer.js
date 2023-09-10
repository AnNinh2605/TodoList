import Storage from "./util/Storage.js"
const init = {
    todos: Storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    add({ todos }, title) {
        if (title) {
            todos.push({ title, completed: false })
            Storage.set(todos)
        }
    },
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        Storage.set(todos)
     },
     toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed)
        Storage.set(todos)
     },
     destroy({ todos }, index) {
        todos.splice(index, 1)
        Storage.set(todos)
     },
     switchFilter(state, filter) {
        state.filter = filter
     },
     clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        Storage.set(state.todos)
     },
     startEdit(state, index) {
        state.editIndex = index
     }, 
     endEdit(state, title) {
        if (state.editIndex !== null) {
            if (title) {
                state.todos[state.editIndex].title = title
                Storage.set(state.todos)
            }
            else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
     },
     cancelEdit(state) {
        state.editIndex = null
     }
     
}
export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}