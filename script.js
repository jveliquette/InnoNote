const theme = document.getElementById('theme');
const newItem = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length

theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light': 'theme-dark'];
});

document.querySelector('.add-new-item span').addEventListener('click', () => {
    if (newItem.value.length > 0) {
        createNewTodoItem(newItem.value);
        newItem.value = '';
    }
});

newItem.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItem.value.length > 0) {
        createNewTodoItem(newItem.value);
        newItem.value = '';
    }
});

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

function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
}

// REMOVE TODO ITEM //

function removeTodoItem(el) {
    el.remove();
    updateItemsCount(-1);
}

todoList.addEventListener('click',(event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
});

// CLEAR COMPLETED ITEMS //

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});


// FILTER TODO LIST ITEMS //

document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id);
    });
});

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
