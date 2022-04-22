const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
// obtaing real-time crypto data
const socket = new WebSocket(url)

const auth = { "action": "auth", "key": "AK90GPPM09UD1UMQBOOS", "secret": "CkT5Hvi7YYu9KLhco9dPGEXLQdjOrocVm9U4tvap" }

const subscribe = { "action": "subscribe", "trades": ["ETHUSD"], "quotes": ["ETHUSD"], "bars": ["ETHUSD"] }
// The subscribe variable will provide intutive market trades and quotes from Eth.

const quotesElement = document.getElementById("quotes") //  will grab each of the elements from the dom
const tradesElement = document.getElementById("trades")  // the if condition will append the quotes and trades to its notable variable



socket.onmessage = function (event) {
    const data = JSON.parse(event.data)
    // Meant to parse strings and return an object with key value pairs, so far provides one element. 
    const message = data[0]['msg']

    console.log(data)

    if (message == 'connected') {
        console.log("you got Authenticated bruh")
        socket.send(JSON.stringify(auth))
        // Once connect send this auth string. Once Alpaca recives the sent auth above will get a corresponding message in the inspection log.
    }
    if (message == "authenticated") {
        socket.send(JSON.stringify(subscribe)) // subscribing to data once we are authenticated
    }
    for (var key in data) {
        console.log(data[key]) //in displays a string of indiviual objects line by line 
        // helps process trades, quotes and bars in one way by wrighting handlers for each, 

        const type = data[key].T

        if (type == 'q') {
            console.log("got a quote")
        }

        if (type == 't') {
            console.log("got a trade")
        }
// Essentally I am selecting a trade div on the page while dynamically adding those elements to the page in javascript. Appending trade element by trade element
        const tradeElement = document.createElement("div")
        tradeElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].p} ${data[key].b}` ;
        
        tradeElement.appendChild(tradeElement);
        
        
        if (type == 'b') {
            console.log('got a new bar')
            console.log(data[key])
        }
    }


}

console.log(socket)