const jsonString = document.querySelector('input#id_json_string')
// const jsonString = document.querySelector('textarea#id_json_string')
// console.log(jsonString)
// jsonString.value = 'lol'
const uploadBtn = document.querySelector('#upload-button')
// console.log(uploadBtn)

let xml
// const uploadBtn = document.querySelector('#upload-button')
document.querySelector('#upload-button').addEventListener('click', () => {
    prepareBtn()
})

function prepareBtn() {
    const fileInput = document.querySelector('input#upload-file')
    // console.log(fileInput)
    const file = fileInput.files[0]
    // console.log(file)
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = fileLoaded
}

function fileLoaded(evt) {
    const fileStr = evt.target.result
    console.log(fileStr.length, 'loaded')
    // console.log(fileStr.slice(0,1000))
    // console.log(fileStr.slice(-999))
    const parser = new DOMParser()
    xml = parser.parseFromString(fileStr, "text/xml")
    const bookTitle = xml.querySelector('book-title').textContent
    const inputBookTitile = document.querySelector('input#id_book_title')
    inputBookTitile.value = bookTitle
    objConst()
}

let book = {}

// let book2 = {}

function objConst() {
    // const textNodes = xml.querySelectorAll('body > section:not([id]) > section > section > *:not(title)')
    // console.log(textNodes)
    // for (const i in textNodes) {
    //     book[i] = {}
    //     book[i]['1text'] = textNodes[i].textContent
    //     book[i]['0title'] = textNodes[i]?.parentElement?.parentElement?.parentElement?.children[0].textContent.trim() + ' ' + textNodes[i]?.parentElement?.parentElement?.children[0].textContent.trim() + ' '+ textNodes[i]?.parentElement?.children[0].textContent.trim()
    //     book[i]['4glava'] = textNodes[i]?.parentElement?.children[0].textContent.trim()
    //     book[i]['3kniga'] = textNodes[i]?.parentElement?.parentElement?.children[0].textContent.trim()
    //     book[i]['2chast'] = textNodes[i]?.parentElement?.parentElement?.parentElement?.children[0].textContent.trim()
    // }
    // console.log(book)

    // for (const i in book) {
    //
    // }

    let i = 0
    for (const chast of xml.querySelectorAll('body > section:not([id])')) {
        for (const kniga of chast.querySelectorAll(':scope > section')) {
            for (const glava of kniga.querySelectorAll(':scope > section')) {
                book[i] = {}

                let chastTxt = chast.children[0].textContent.trim().replaceAll('\n     ', '. ').replaceAll('  ', ' ')
                let knigaTxt = kniga.children[0].textContent.trim().replaceAll('\n     ', '. ').replaceAll('  ', ' ')
                let glavaTxt = glava.children[0].textContent.trim().replaceAll('\n     ', '. ').replaceAll('  ', ' ')

                // let chastTxt = chast.children[0].textContent.trim()
                // let knigaTxt = kniga.children[0].textContent.trim()
                // let glavaTxt = glava.children[0].textContent.trim()

                // const term = '\n     \n     '
                // if (chastTxt.includes(term) || knigaTxt.includes(term) || glavaTxt.includes(term)) {
                //     console.log(chastTxt, knigaTxt, glavaTxt)
                //     // console.log('lol')
                // }

                // book[i]['title'] = chastTxt + ' ' + knigaTxt + ' ' + glavaTxt
                // book[i]['split'] = {}
                // book[i]['split']['0chast'] = chastTxt
                // book[i]['split']['1kniga'] = knigaTxt
                // book[i]['split']['2glava'] = glavaTxt

                book[i]['0chast'] = chastTxt
                book[i]['1kniga'] = knigaTxt
                book[i]['2glava'] = 'Глава ' + glavaTxt
                book[i]['3text'] = ''
                for (const txt of glava.querySelectorAll(':scope > *:not(title)')) {
                    const regex = /\[\d+\]/gm
                    if (book[i]['3text'] != '') {
                        book[i]['3text'] += '\n' + txt.textContent.replaceAll(regex, '')
                    } else {
                        book[i]['3text'] += txt.textContent.replaceAll(regex, '')
                    }
                }
                i++
                // book[i]['title'] = glava.querySelector('title').textContent.trim()
                // book[i]['text'] = glava.querySelector('title').textContent.trim()
            }
        }
        // console.log(chast.nodeName)
    }
    console.log(book)
    jsonString.value = JSON.stringify(book)

    uploadBtn.textContent = 'Prepared'
    uploadBtn.disabled = true

    // const sectChasti = xml.querySelectorAll('body > section:not([id])')
    // console.log('sectChasti', sectChasti)
    // const sectKnigi = xml.querySelectorAll('body > section:not([id]) > section')
    // console.log('sectKnigi', sectKnigi)
    // const sectGlavi = xml.querySelectorAll('body > section:not([id]) > section > section')
    // console.log('sectGlavi', sectGlavi)

    // const sectTxt = xml.querySelectorAll('body > section:not([id]) > section > section > *:not(title)')
    // console.log(sectTxt)




    // const lol = xml.querySelectorAll('body > section:not([id]) > section > section > section')
    // console.log(lol)

}

function xml2json(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
      console.log(e.message);
  }
}
