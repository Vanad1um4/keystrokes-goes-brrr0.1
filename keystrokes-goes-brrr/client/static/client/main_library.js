onInit()


function onInit() {
    let buttons = document.querySelectorAll('.showcase > .card > .content > .addToLib > .add-btn')
    for (const button of buttons) {
        button.addEventListener("click", function clicked(event) {
            // console.log(event.target.id.replace('add', ''))
            if (event.target.classList.contains('added-no')) {
                addBookToLib(event.target)
            }
            if (event.target.classList.contains('added-yes')) {
                removeBookFromLib(event.target)
            }
        });
    }
    fetch(`/my_books/`)
        .then(response => response.json())
        .then(result => {
            const myBooks = result['book_ids']
            const myBooksStr = myBooks.map(x => x.toString())
            // console.log(myBooksStr)
            renderUsersBooksBtns(myBooksStr)
            // console.log(result['book_ids'])
        })
}


function addBookToLib(target) {
    target.classList.remove('added-no')
    target.classList.add('added-unclear')
    const id = target.id.replace('add', '')
    fetch(`/add/${id}`)
        .then(response => response.json())
        .then(res => {
            // console.log(res['result'])
            if (res['result'] === 'failure') {
                if (res['url']) {
                    window.location.href = res['url']
                }
                target.classList.remove('added-unclear')
                target.classList.add('added-no')
            }
            if (res['result'] === 'success') {
                target.classList.remove('added-unclear')
                target.classList.add('added-yes')
            }
        })
}


function removeBookFromLib(target) {
    target.classList.remove('added-yes')
    target.classList.add('added-unclear')
    const id = target.id.replace('add', '')
    fetch(`/remove/${id}`)
        .then(response => response.json())
        .then(res => {
            // console.log(res['result'])
            if (res['result'] === 'failure') {
                target.classList.remove('added-unclear')
                target.classList.add('added-yes')
            }
            if (res['result'] === 'success') {
                target.classList.remove('added-unclear')
                target.classList.add('added-no')
            }
        })
}


function renderUsersBooksBtns(list_in) {
    const cards = document.querySelectorAll('.showcase > .card')
    for (const card of cards) {
        const button = card.querySelector('.add-btn')
        const id = card.getAttribute('id').replace('book', '')
        button.classList.remove('added-unclear')
        button.setAttribute('id', 'add' + id)
        if (list_in.includes(id)) {
            button.classList.add('added-yes')
        } else {
            button.classList.add('added-no')
        }
    }
}
