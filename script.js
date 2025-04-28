// Ambil elemen yang diperlukan
const guestNameInput = document.getElementById('guest-name');
const guestSubmitButton = document.getElementById('guest-submit');
const guestList = document.getElementById('guest-list');
const guests = JSON.parse(localStorage.getItem('guestbook')) || [];

// Fungsi untuk menyimpan daftar ke local storage
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

// Fungsi untuk menampilkan pesan jika daftar tamu kosong
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

// Fungsi untuk memuat daftar dari local storage
function loadFromLocalStorage() {
    guests.forEach(guest => {
        const li = document.createElement('li');

        // Tambahkan elemen span untuk nama tamu
        const nameSpan = document.createElement('span');
        nameSpan.textContent = guest.name;
        nameSpan.classList.add('guest-name');
        li.appendChild(nameSpan);

        // Tambahkan tombol selesai
        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveToLocalStorage();
            checkGuestListEmpty();
        });

        // Tambahkan tombol hapus
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

    checkGuestListEmpty(); // Periksa apakah daftar kosong setelah memuat
}

// Fungsi untuk menambah item baru
function addGuest() {
    const guestName = guestNameInput.value.trim();
    if (guestName === '') return;

    const li = document.createElement('li');

    // Tambahkan elemen span untuk nama tamu
    const nameSpan = document.createElement('span');
    nameSpan.textContent = guestName;
    nameSpan.classList.add('guest-name');
    li.appendChild(nameSpan);

    // Tambahkan tombol selesai
    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveToLocalStorage();
        checkGuestListEmpty();
    });

    // Tambahkan tombol hapus
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
    checkGuestListEmpty(); // Periksa apakah daftar kosong setelah menambah
}

function initializeGuestbook() {
    if (!localStorage.getItem('guestbook')) {
        localStorage.setItem('guestbook', JSON.stringify([]));
    }
}

// Panggil fungsi ini saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    initializeGuestbook();
    loadFromLocalStorage();
});

// Event listener untuk tombol submit
guestSubmitButton.addEventListener('click', addGuest);