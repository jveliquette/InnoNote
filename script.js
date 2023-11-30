// DECLARING VARIABLES //
const theme = document.getElementById('theme');
const newItem = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');

// Setting the text content of the element (itemsLeft) to the number of checkboxes that match the specified selector. Displays a count of items. //
itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length

// Toggles page theme (class applied to the <body> element) when user clicks on theme element. //
// If theme.checked is true, it sets the theme to 'theme-light' //
// If theme.checked is false, it sets the theme to 'theme-dark' //
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light': 'theme-dark'];
});

// Listens for click on specific <span> inside an element with the class 'add-new-item'. //
// If there is text in the associated input field (newItem), it creates a new todo item using that text and then clears the input field. //
document.querySelector('.add-new-item span').addEventListener('click', () => {
    if (newItem.value.length > 0) {
        createNewTodoItem(newItem.value);
        newItem.value = '';
    }
});

// Listens for 'keypress' event on the newItem input element. If Enter key is pressed and there is non-empty text in the input, it creates a new todo item based on the input text and then clears the input field. //
newItem.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItem.value.length > 0) {
        createNewTodoItem(newItem.value);
        newItem.value = '';
    }
});

// Creates new todo item with a checkbox, text, and a remove button. //
// It adds this item to a container (todoList), checks a condition based on the state of a radio button, and updates the count of todo items. //
// Visibility of the todo item might be influenced by the state of the radio button, depending on the value of '.filter input...' //
function createNewTodoItem(text) {
    const el = document.createElement('li');
    el.classList.add('flex-row');
    el.innerHTML =
        `<label class="list-item">
            <input type="checkbox" name="todoItem">
            <span class="checkmark"></span>
            <span class="text">${text}</span>
        </label>
        <span class="remove"></span>`;

    if (document.querySelector('.filter input[type="radio"]:checked').id === true) {
        el.classList.add('hidden');
    }
        todoList.append(el);
        updateItemsCount(1)
}

// Takes a number as a parameter and updates the displayed count of items (itemsLeft). //
// Designed to handle both incrementing and decrementing the count based on the sign of the number parameter. //
function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
}

// REMOVE TODO ITEM //
// Takes an element (el) as a parameter, removes that element from the document, and then updates the count of todo items by calling the updateItemsCount function with a decrement value of -1. //
function removeTodoItem(el) {
    el.remove();
    updateItemsCount(-1);
}

// This event listener is set up to respond to clicks within the todoList. If the clicked element has a class of 'remove', it calls the removeTodoItem function, passing the parent element of the clicked element. //
todoList.addEventListener('click',(event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
});

// CLEAR COMPLETED ITEMS //
// When the element with class 'clear' is clicked, this finds all checked checkboxes within elements with the class 'list-item' and removes the corresponding todo items by calling the removeTodoItem function with the parent li element of each checked checkbox. //
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});


// FILTER TODO LIST ITEMS //
// Sets up event listeners for each radio button inside elements with the class 'filter'. When a radio button is selected, it triggers the filterTodoItems function with the id attribute of the clicked radio button.
document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id);
    });
});

// Adjusts the visibility of todo items based on the selected filter. The 'all' filter shows all items, 'active' filter shows only active (unchecked) items, and other filters (default) show only completed (checked) items.
function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden')
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            });
            break;
        default:
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            });
            break;

    }
}
