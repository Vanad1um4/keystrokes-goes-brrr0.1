// document.addEventListener('keydown', function onPress(event) {
// });



let llhPort
let url = window.location.href
console.log(url)

browser.runtime.onConnect.addListener( (port) => {
    // console.log(port)
    llhPort = port;
    llhPort.onMessage.addListener( (m) => {
        // console.log(m);
        if (m.command === 'url') {
            llhPort.postMessage({'url': url});
        }
    });
    // llhPort.postMessage({mssg: "hi there popup script!"});
} );



