onInit();


function onInit() {
    const cards = document.querySelectorAll('.showcase > .card')
    for (const card of cards) {
        card.addEventListener("click", function clicked(event) {
            toggleNewDiv(event.target)
        });
    }
}


function toggleNewDiv(target) {
    let clickedElem = target
    let clickedElemId = clickedElem.getAttribute('id').replace('book', '')
    let longElem = document.querySelector('.long-card')
    if (longElem) {
        let longId = longElem.getAttribute('id').replace('long', '')
        if (longId === clickedElemId) {
            longElem.remove()
        } else {
            longElem.remove()
            addLongDiv(clickedElem)
        }
    } else {
        addLongDiv(clickedElem)
    }
}


function addLongDiv(target) {
    const newLongDiv = document.createElement('div');
    const bookId = target.id.replace('book', '')
    newLongDiv.classList.add('long-card')
    newLongDiv.setAttribute('id', 'long' + bookId)
    target.after(newLongDiv)
    fetch(`/get_texts/${bookId}/`)
        .then(response => response.json())
        .then(results => {
            const texts = results['texts']
            // console.log(texts)

            const chapters = {}
            let i = 1
            let chapter = ''
            for (id in texts) {
                if (texts[id]['chapter'] === chapter) {
                    chapters[chapter]['amt']++
                    if (texts[id]['complete']) {
                        chapters[chapter]['completed_amt']++
                    }
                    if (texts[id]['chars']) {
                        chapters[chapter]['chars'] += texts[id]['chars']
                    }
                    if (texts[id]['words']) {
                        chapters[chapter]['words'] += texts[id]['words']
                    }
                    if (texts[id]['errors']) {
                        chapters[chapter]['errors'] += texts[id]['errors']
                    }
                    if (texts[id]['time']) {
                        chapters[chapter]['time'] += texts[id]['time']
                    }
                    if (texts[id]['cpm']) {
                        chapters[chapter]['cpm'] = texts[id]['cpm']
                    }
                    if (texts[id]['wpm']) {
                        chapters[chapter]['wpm'] = texts[id]['wpm']
                    }
                    if (texts[id]['acc']) {
                        chapters[chapter]['acc'] = texts[id]['acc']
                    }
                } else if (texts[id]['chapter'] !== chapter) {
                    chapter = texts[id]['chapter']
                    chapters[chapter] = {}
                    chapters[chapter]['n'] = i
                    chapters[chapter]['amt'] = 1
                    if (texts[id]['complete']) {
                        chapters[chapter]['completed_amt'] = 1
                    } else {
                        chapters[chapter]['completed_amt'] = 0
                    }
                    if (texts[id]['chars']) {
                        chapters[chapter]['chars'] = texts[id]['chars']
                    } else {
                        chapters[chapter]['chars'] = 0
                    }
                    if (texts[id]['words']) {
                        chapters[chapter]['words'] = texts[id]['words']
                    } else {
                        chapters[chapter]['words'] = 0
                    }
                    if (texts[id]['errors']) {
                        chapters[chapter]['errors'] = texts[id]['errors']
                    } else {
                        chapters[chapter]['errors'] = 0
                    }
                    if (texts[id]['time']) {
                        chapters[chapter]['time'] = texts[id]['time']
                    } else {
                        chapters[chapter]['time'] = 0
                    }
                    if (texts[id]['cpm']) {
                        chapters[chapter]['cpm'] = texts[id]['cpm']
                    }
                    if (texts[id]['wpm']) {
                        chapters[chapter]['wpm'] = texts[id]['wpm']
                    }
                    if (texts[id]['acc']) {
                        chapters[chapter]['acc'] = texts[id]['acc']
                    }

                    i++
                }
            }
            // console.log(chapters)

            for (ch in chapters) {
                const newChaptDiv = document.createElement('div')
                newChaptDiv.classList.add('chapt-card')
                newChaptDiv.setAttribute('id', `ch${chapters[ch]['n']}`)
                // newChaptDiv.textContent = ch
                newChaptDiv.addEventListener('click', function chaptClick(event) {
                    // console.log(event.target)
                    // const id = event.target.id.replace('ch', '')
                    const id = event.target.id
                    const textDivs = document.querySelectorAll(`div#${id} > .text-card`)
                    // console.log(textDivs)
                    for (div of textDivs) {
                        if (div.style.display === 'none') {
                            div.style.display = 'grid'
                        } else {
                            div.style.display = 'none'
                        }
                    }
                })

                const newChaptHeader = document.createElement('div')
                newChaptHeader.classList.add('chapt-header')

                // TEXT
                const newChaptTextDiv = document.createElement('div')
                newChaptTextDiv.classList.add('chapt-text')
                newChaptTextDiv.textContent = ch
                newChaptHeader.appendChild(newChaptTextDiv)

                // COMPLETION
                const newChaptComplDiv = document.createElement('div')
                newChaptComplDiv.classList.add('chapt-compl')
                if (chapters[ch]['amt'] === chapters[ch]['completed_amt']) {
                    newChaptDiv.classList.add('completed')
                    newChaptComplDiv.textContent = 'Completed ✅'
                } else if (chapters[ch]['completed_amt'] > 0) {
                    newChaptDiv.classList.add('in-progress')
                    newChaptComplDiv.textContent = 'In progress 🔄'
                } else {
                    newChaptDiv.classList.add('not-completed')
                    newChaptComplDiv.textContent = 'Not completed ❌'
                }
                newChaptHeader.appendChild(newChaptComplDiv)

                // CPM
                const newChaptCmpDiv = document.createElement('div')
                newChaptCmpDiv.classList.add('chapt-cpm')
                if (chapters[ch]['chars'] && chapters[ch]['time']) {
                    if (chapters[ch]['completed_amt'] === 1) {
                        newChaptCmpDiv.textContent = 'CPM: ' + chapters[ch]['cpm']
                        // newChaptCmpDiv.textContent = 'CPM: ' + Math.round(chapters[ch]['chars'] / chapters[ch]['time'] * 60 * 1000)
                    } else {
                        newChaptCmpDiv.textContent = 'CPM: ' + Math.round(chapters[ch]['chars'] / chapters[ch]['time'] * 60 * 1000)
                    }
                }
                newChaptHeader.appendChild(newChaptCmpDiv)

                // WPM
                const newChaptWmpDiv = document.createElement('div')
                newChaptWmpDiv.classList.add('chapt-wpm')
                if (chapters[ch]['words'] && chapters[ch]['time']) {
                    if (chapters[ch]['completed_amt'] === 1) {
                        newChaptWmpDiv.textContent = 'WPM: ' + chapters[ch]['wpm']
                        // newChaptWmpDiv.textContent = 'WPM: ' + Math.round(chapters[ch]['words'] / chapters[ch]['time'] * 60 * 1000)
                    } else {
                        newChaptWmpDiv.textContent = 'WPM: ' + Math.round(chapters[ch]['words'] / chapters[ch]['time'] * 60 * 1000)
                    }
                }
                newChaptHeader.appendChild(newChaptWmpDiv)

                // ACC
                const newChaptAccDiv = document.createElement('div')
                newChaptAccDiv.classList.add('chapt-acc')
                if (chapters[ch]['errors'] && chapters[ch]['chars']) {
                    if (chapters[ch]['completed_amt'] === 1) {
                        newChaptAccDiv.textContent = 'Accuracy: ' + chapters[ch]['acc'] + '%'
                        // newChaptAccDiv.textContent = 'Accuracy: ' + Math.round((1.0 - (chapters[ch]['errors'] / chapters[ch]['chars'])) * 10000) / 100 + '%'
                    } else {
                        newChaptAccDiv.textContent = 'Accuracy: ' + Math.round((1.0 - (chapters[ch]['errors'] / chapters[ch]['chars'])) * 10000) / 100 + '%'
                    }
                }
                newChaptHeader.appendChild(newChaptAccDiv)


                newChaptDiv.appendChild(newChaptHeader)
                newLongDiv.appendChild(newChaptDiv)
            }

            let currChapter = 1
            let currText = 1

            for (id in texts) {
                // console.log(texts[id]['chapter'])
                const newDiv = document.createElement('div');
                newDiv.classList.add('text-card')
                newDiv.setAttribute('id', 'txt' + id)

                // TEXT
                const newDivText = document.createElement('div');
                newDivText.classList.add('text-text')
                if (currChapter === chapters[texts[id]['chapter']]['n']) {
                    newDivText.textContent = `Text ${currText} / ${chapters[texts[id]['chapter']]['amt']}`
                    currText++
                } else {
                    currChapter = chapters[texts[id]['chapter']]['n']
                    currText = 1
                    newDivText.textContent = `Text ${currText} / ${chapters[texts[id]['chapter']]['amt']}`
                    currText++
                }

                // console.log(chapters[texts[id]['chapter']]['n'], currChapter)

                // newDivText.textContent = `${texts[id]['text']}`
                newDiv.appendChild(newDivText)

                // COMPLETION
                const newDivComplete = document.createElement('div');
                newDivComplete.classList.add('text-complete')
                if (texts[id]['complete']) {
                    newDivComplete.textContent = 'Completed ✅'
                    newDiv.classList.add('completed')
                } else {
                    newDivComplete.textContent = 'Not completed ❌'
                    newDiv.classList.add('not-completed')
                }
                newDiv.appendChild(newDivComplete)
                // const amt = chapters[texts[id]['chapter']]['amt']
                // const completed_amt = chapters[texts[id]['chapter']]['completed_amt']
                // if (completed_amt === 0 || completed_amt === amt) {
                //     newDiv.style.display = 'none'
                // }

                // CPM
                const newDivCpm = document.createElement('div');
                newDivCpm.classList.add('text-cpm')
                if (texts[id]['cpm']) {
                    newDivCpm.textContent = `CPM: ${texts[id]['cpm']}`
                } else {
                    newDivCpm.textContent = `CPM: -`
                }
                newDiv.appendChild(newDivCpm)

                // WPM
                const newDivWpm = document.createElement('div');
                newDivWpm.classList.add('text-wpm')
                if (texts[id]['wpm']) {
                    newDivWpm.textContent = `WPM: ${texts[id]['wpm']}`
                } else {
                    newDivWpm.textContent = `WPM: -`
                }
                newDiv.appendChild(newDivWpm)

                // accuracy
                const newDivAcc = document.createElement('div');
                newDivAcc.classList.add('text-acc')
                if (texts[id]['acc']) {
                    newDivAcc.textContent = `Accuracy: ${texts[id]['acc']}%`
                } else {
                    newDivAcc.textContent = `Accuracy: -`
                }
                newDiv.appendChild(newDivAcc)

                const chaptCard = document.querySelector(`div#ch${chapters[texts[id]['chapter']]['n']}`)
                if (!chaptCard.classList.contains('in-progress')) {
                    newDiv.style.display = 'none'
                }
                chaptCard.appendChild(newDiv)
            }
            const newTextDivs = document.querySelectorAll('.text-card')
            for (const div of newTextDivs) {
                div.addEventListener("click", function clicked(event) {
                    clickTextBtn(event.target)
                });
            }
        })
}


function clickTextBtn(elem) {
    let id = elem.id.replace('txt', '')
    window.location.href = '/type/' + id
}
