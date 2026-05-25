
const myLibrary = [];

function Book(title, writter, pages){
    this.title = title;
    this.writter = writter;
    this.pages = pages;
    this.read = false;
    this.uid = crypto.randomUUID();
}

function addBookToLibrary (title, writter, pages){
    myLibrary.push(new Book(title, writter, pages))
    return;
}

Book.prototype.toogleRead = function(){
    this.read = !this.read;
}

function addToDisplay (title, writter, pages){
    const library = document.getElementById('library-wrap');
    const count = document.getElementById('count');
    library.innerHTML = '';
    count.textContent = myLibrary.length + ' book' + (myLibrary.length !== 1 ? 's' : '');

    if (myLibrary.length === 0){
        library.innerHTML = '<div class="empty" style="display: grid; grid-column: 1/-1; text-align:center">no book yet - add one</div>'
        return;
    }

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card')
        card.dataset.uid = book.uid;

        const judul = document.createElement('p');
        judul.classList.add('card-judul')
        judul.textContent = book.title;

        const penulis = document.createElement('p')
        penulis.classList.add('card-penulis');
        penulis.textContent = book.writter;

        const pages = document.createElement('p');
        pages.classList.add('card-pages');
        pages.textContent = book.pages;

        const action = document.createElement('div');
        action.classList.add('card-action');

        const btnRead = document.createElement('button');
        btnRead.classList.add('btn-read');
        if(book.read) btnRead.classList.add('read');
        btnRead.textContent = book.read ? 'read ✓' : 'not read';
            btnRead.addEventListener('click', function(){
                book.toogleRead();
                addToDisplay();
            });
        
        const delBtn = document.createElement('button');
        delBtn.classList.add('del-btn');
        delBtn.innerHTML = '<i>delete</i>';
        delBtn.addEventListener('click', function (){
            const index = myLibrary.findIndex(b => b.uid === book.uid);
            if(index > -1) myLibrary.splice(index, 1);
            addToDisplay();
            console.log(myLibrary)
        })
        
        action.append(btnRead, delBtn);
        card.append(judul,penulis,pages,action);
        library.appendChild(card);
        
    });
};

function openDisplay(){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('open')
    const judul = document.getElementById('judul');
    judul.focus();
}

function closeDisplay(){
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('open');
    document.getElementById('judul').value = '';
    document.getElementById('penulis').value = '';
    document.getElementById('pages').value = '';
}

function submitBook (){
    const judul = document.getElementById('judul').value.trim();
    const penulis = document.getElementById('penulis').value.trim();
    const pages = document.getElementById('pages').value;
    
    addBookToLibrary(judul, penulis, pages);
    addToDisplay(judul, penulis, pages);
    closeDisplay();
    console.log(myLibrary)
};

addBookToLibrary('Atomic habits', 'james clear', 350);
addToDisplay();

console.log(myLibrary)



