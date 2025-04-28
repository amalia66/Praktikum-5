const guestNameInput = document.getElementById('guest-name');
const guestSubmitButton = document.getElementById('guest-submit');
const guestList = document.getElementById('guest-list');
const guests = JSON.parse(localStorage.getItem('guestbook')) || [];

function saveToLocalStorage() {
    const guests = [];
    guestList.querySelectorAll('li').forEach(item => {
        const name = item.querySelector('.guest-name').textContent.trim();
        guests.push({
            name: name,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('guestbook', JSON.stringify(guests));
}

function checkGuestListEmpty() {
    const emptyMessage = document.getElementById('empty-message');
    if (guestList.children.length === 0) {
        if (!emptyMessage) {
            const message = document.createElement('p');
            message.id = 'empty-message';
            message.textContent = 'Be the first guest!';
            guestList.parentElement.appendChild(message);
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }
}

function loadFromLocalStorage() {
    guests.forEach(guest => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = guest.name;
        nameSpan.classList.add('guest-name');
        li.appendChild(nameSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveToLocalStorage();
            checkGuestListEmpty();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveToLocalStorage();
            checkGuestListEmpty();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        if (guest.completed) {
            li.classList.add('completed');
        }

        guestList.appendChild(li);
    });

    checkGuestListEmpty();
}

function addGuest() {
    const guestName = guestNameInput.value.trim();
    if (guestName === '') return;

    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = guestName;
    nameSpan.classList.add('guest-name');
    li.appendChild(nameSpan);

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveToLocalStorage();
        checkGuestListEmpty();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveToLocalStorage();
        checkGuestListEmpty();
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    guestList.appendChild(li);
    guestNameInput.value = '';
    saveToLocalStorage();
    checkGuestListEmpty(); 
}

function initializeGuestbook() {
    if (!localStorage.getItem('guestbook')) {
        localStorage.setItem('guestbook', JSON.stringify([]));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGuestbook();
    loadFromLocalStorage();
});

guestSubmitButton.addEventListener('click', addGuest);