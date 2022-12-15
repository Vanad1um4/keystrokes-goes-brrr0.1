onLoad()

function onLoad() {
    let bookBtns = document.querySelectorAll('.book-card')
    for (const button of bookBtns) {
        button.classList.add('clickable');
        button.addEventListener("click", function clicked(event) {
            clickBookBtn(event)
        });
    }
    booksCardsAnimateOnLoad()
}


function clickBookBtn(event) {
    let bookBtns = document.querySelectorAll('.book-card')
    let currBookBtn = event.target
    if (currBookBtn.classList.contains('clickable')) {
        currBookBtn.classList.remove('clickable')
        currBookBtn.classList.add('clicked')

        let id = currBookBtn.id.replace('book', '')
        fetch(`/get_texts/${id}/`)
            .then(response => response.json())
            .then(result => {
                formTextList(result.texts)
            })
    }
    for (const button of bookBtns) {
        if (button != currBookBtn) {
            if (button.classList.contains('clicked')) {
                button.classList.remove('clicked')
            }
            if (!button.classList.contains('clickable')) {
                button.classList.add('clickable')
            }

        }
    }
}


async function formTextList(sectionList) {
    let sectionsArea = document.querySelector('.sections-area')
    sectionsArea.innerHTML = ''
    const delay = 20
    for (const key in sectionList) {
        let div = document.createElement('div');
        div.innerText = sectionList[key]
        div.classList.add('section-card')
        div.classList.add('animate-on-load')
        div.setAttribute('id', 'section' + key)
        div.addEventListener("click", function clicked(event) {clickSectionBtn(event)});
        sectionsArea.appendChild(div)
        await sleep(delay)
    }
    let sectionTexts = document.querySelectorAll('section-card')
    await sleep(200)
    for (const section of sectionTexts) {
        section.classList.remove('animate-on-load')
    }

}


function clickSectionBtn(event) {
    let currSectionBtn = event.target
    let id = event.target.id.replace('section', '')
    window.location.href = '/type/'+id
}


async function booksCardsAnimateOnLoad() {
    let books = document.querySelectorAll('.book-card')
    const delay = 20
    for (const book of books) {
        book.classList.add('animate-on-load')
        book.style.removeProperty("visibility")
        await sleep(delay)
    }
    await sleep(200)
    for (const book of books) {
        book.classList.remove('animate-on-load')
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}









// function animateOnLoad(action) {
//     let books = document.querySelectorAll('.book-card')
//     let delay = 0
//     const increment = 0.1
//     if (action === 'set') {
//         for (const book of books) {
//             book.classList.add('animate-on-load')
//             book.removeAttribute("hidden")
//             // book.setAttribute('animation-delay', delay.toString() + 's')
//             // book.style.setProperty('animation-delay', delay.toString() + 's')
//             delay += increment
//             // console.log(book)
//             // book.classList.remove('hidden-once')
//         }
//     }
//     if (action === 'remove') {
//         for (const book of books) {
//             book.classList.remove('animate-on-load')
//             // console.log(book)
//         }
//     }
// }
