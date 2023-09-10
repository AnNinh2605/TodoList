import  html  from '../Library/core.js'
import { connect } from '../Library/store.js'

function Footer({todos, filter, filters}) {
    return html 
    `
    <footer class="footer">
        <span class="todo-count"><strong> </strong>
        ${ todos.filter(filters.active).length }
        item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            ${Object.keys(filters).map(type => 
                html `
                <li>
                    <a class="${ filter === type && 'selected' }" href="#"
                    onclick = "dispatch('switchFilter', '${type}')"
                    >
                    ${type[0].toUpperCase() + type.slice(1)}</a>
                </li>
                `    
            )}
        </ul>
        ${todos.filter(filters.completed).length > 0 && 
            html 
            `<button class="clear-completed" onclick="dispatch('clearCompleted')">Clear completed</button>`}
        <!-- Hidden if no completed items are left ↓ -->
    </footer>
    `  
}

export default connect()(Footer)