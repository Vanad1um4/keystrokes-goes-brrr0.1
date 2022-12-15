document.addEventListener('keydown', function onPress(event) {
    keyPressed(event.key)
});

let textObj = {}
let step = -1
let buttons = document.querySelectorAll('.books-card')

for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add('clickable');
    buttons[i].addEventListener("click", function clicked(event) {
        clickButton(event)
    });
}

function clickButton(event) {
    let elem = event.target
    if (elem.classList.contains('clickable')) {
        elem.classList.remove('clickable')

        let id = event.target.id.replace('book', '')
        fetch(`/get_texts/${id}/`)
            .then(response => response.json())
            .then(result => {
                // console.log(result.texts)
                formTextList(result.texts)
                // console.log(step)
                step = 0
                // console.log(step)
            })
    }
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] != elem) {
            if (!buttons[i].classList.contains('clickable')) {
                buttons[i].classList.add('clickable')
            }
        }
    }
}


function formTextList(textList) {
    resultDiv = document.createElement('div');
    for (const item in textList) {
        // console.log(item)
        let div = document.createElement('div');
        div.innerText = textList[item]
        resultDiv.appendChild(div)
    }
    let sectionsArea = document.querySelector('.sections-area')
    sectionsArea.innerHTML = ''
    sectionsArea.appendChild(resultDiv)
}


function keyPressed(key) {
    if ((step >= 0) && (key.toString().length === 1)) {
        console.log(key)
        goForward(key)
    } else if (key === 'Backspace') {
        goBack(key)
    }
}

function goForward(key) {
    try {
        span = document.querySelector(`span[id="n${step}"]`)
        span.removeAttribute('class')
        if (key === textObj[step]['txt']) {
            span.setAttribute('class', 'correct');
        } else {
            span.setAttribute('class', 'wrong');
        }
        step++
        setTwoSpanColor()
    } catch {}
}

function goBack(key) {
    step--
    setTwoSpanColor();
}

function setTwoSpanColor() {
    try {
        span = document.querySelector(`span[id="n${step}"]`)
        span.removeAttribute('class')
        span.setAttribute('class', 'current');
    } catch {}
    try {
        span = document.querySelector(`span[id="$n{step+1}"]`)
        span.removeAttribute('class')
        span.setAttribute('class', 'neutral');
    } catch {}
}


// SPAN CONSTRUCTOR
// function textConstruct(text) {
//     let textDiv = document.querySelector('div.typing-there');
//     textDiv.innerHTML = ''
//     for (i = 0; i < text.length; i++) {
//         textObj[i] = {}
//         textObj[i]['txt'] = text[i]
//         textObj[i]['time'] = 0
//         textObj[i]['outcome'] = ''
//         let span = document.createElement('SPAN');
//         span.setAttribute('id', 'n'+i.toString());
//         span.setAttribute('class', 'neutral');
//         span.textContent = text[i];
//         textDiv.appendChild(span)
//     }
//     console.log(textObj)
// }
