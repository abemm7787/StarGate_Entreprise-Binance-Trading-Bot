const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
// obtaing real-time crypto data
const socket = new WebSocket(url)

const KEY = "AK90GPPM09UD1UMQBOOS"
const SECRET = "CkT5Hvi7YYu9KLhco9dPGEXLQdjOrocVm9U4tvap"

const auth = { "action": "auth", "key": KEY, "secret": SECRET }

const subscribe = { "action": "subscribe", "trades": ["ETHUSD"], "quotes": ["ETHUSD"], "bars": ["ETHUSD"] }
// The subscribe variable will provide intutive market trades and quotes from Eth.

const quotesElement = document.getElementById("quotes") //  will grab each of the elements from the dom
const tradesElement = document.getElementById("trades")  // the if condition will append the quotes and trades to its notable variable

var chart = LightweightCharts.createChart(document.getElementById("chart"), {
	width: 700,
  height: 800,
	layout:{
        backgroundColor: '#000000',
        textColor: '#ffffff',
    },
grid:{
vertLines:{
    color:'#404040'
},
horzLines:{
    color: '#404040',
},
crosshair:{
    mode:LightweightCharts.CrosshairMode.Normal,
},
priceScale:{
borderColor: '#cccccc',
},
timeScale:{
    borderColor:"#cccccc",
    timeVisable:true,
}
},

});


//utlzing dummy series to test out data
var candleSeries = chart.addCandlestickSeries(); // deploys chart

var start = new Date(Date.now() - (7200 * 1000)).toISOString()
console.log(start)
var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE&timeframe=1Min&start=' + start;
// when we fetch this endpoint will get the candle sticks for the last two hours

// javascript has a fetch build in
fetch(bars_url, {
    headers:{
        "APCA-API-KEY-ID" : KEY,
        "APCA-API-SECRET-KEY": SECRET,
    }
}).then((r) => r.json()).then((response) => {
console.log(response)
const data = response.bars.map( bar => {
    open:bar.o
})
// looks familiar, inside joke
candleSeries.setData(data)
})

//promise


var data = [
	{ time: '2018-10-19', open: 54.62, high: 55.50, low: 54.52, close: 54.90 },
	{ time: '2018-10-22', open: 55.08, high: 55.27, low: 54.61, close: 54.98 },
	{ time: '2018-10-23', open: 56.09, high: 57.47, low: 56.09, close: 57.21 },
	{ time: '2018-10-24', open: 57.00, high: 58.44, low: 56.41, close: 57.42 },
	{ time: '2018-10-25', open: 57.46, high: 57.63, low: 56.17, close: 56.43 },
	{ time: '2018-10-26', open: 56.26, high: 56.62, low: 55.19, close: 55.51 },
	{ time: '2018-10-29', open: 55.81, high: 57.15, low: 55.72, close: 56.48 },
	{ time: '2018-10-30', open: 56.92, high: 58.80, low: 56.92, close: 58.18 },
	{ time: '2018-10-31', open: 58.32, high: 58.32, low: 56.76, close: 57.09 },
	{ time: '2018-11-01', open: 56.98, high: 57.28, low: 55.55, close: 56.05 },
	{ time: '2018-11-02', open: 56.34, high: 57.08, low: 55.92, close: 56.63 },
	{ time: '2018-11-05', open: 56.51, high: 57.45, low: 56.51, close: 57.21 },
	{ time: '2018-11-06', open: 57.02, high: 57.35, low: 56.65, close: 57.21 },
	{ time: '2018-11-07', open: 57.55, high: 57.78, low: 57.03, close: 57.65 },
	{ time: '2018-11-08', open: 57.70, high: 58.44, low: 57.66, close: 58.27 },
	{ time: '2018-11-09', open: 58.32, high: 59.20, low: 57.94, close: 58.46 },
	{ time: '2018-11-12', open: 58.84, high: 59.40, low: 58.54, close: 58.72 },
	{ time: '2018-11-13', open: 59.09, high: 59.14, low: 58.32, close: 58.66 },
	{ time: '2018-11-14', open: 59.13, high: 59.32, low: 58.41, close: 58.94 },
	{ time: '2018-11-15', open: 58.85, high: 59.09, low: 58.45, close: 59.08 },

];

candleSeries.setData(data)


socket.onmessage = function (event) {
    const data = JSON.parse(event.data)
    // Meant to parse strings and return an object with key value pairs, so far provides one element. 
    const message = data[0]['msg']

    console.log(data)
    if (message == 'connected') {
      //  console.log("you got Authenticated bruh")
        socket.send(JSON.stringify(auth))
        // Once connect send this auth string. Once Alpaca recives the sent auth above will get a corresponding message in the inspection log.
    }
    if (message == "authenticated") {
        socket.send(JSON.stringify(subscribe)) // subscribing to data once we are authenticated
    }
    for (var key in data) {
        console.log(data[key]) //in displays a string of indiviual objects line by line 
        // helps process trades, quotes and bars in one way by wrighting handlers for each, 
        const type = data[key].T;

        if (type == 'q') {
           // console.log("got a quote")
            //console.log(data[key])
            const quoteElement = document.createElement("div")
            quoteElement.className = 'quote'
            quoteElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].bp} ${data[key].ap}`;
            quotesElement.appendChild(quoteElement)
            var elements = document.getElementsByClassName('quote')
            if (elements.length > 10) {
                quotesElement.removeChild(elements[0]) // removes the first one, the oldest one
            }




        }
        if (type == 't') {
           // console.log("got a trade")
            //console.log(data[key])

            const tradeElement = document.createElement("div")
            tradeElement.className = 'trade'
            tradeElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].p} ${data[key].s}`;
            tradesElement.appendChild(tradeElement)

            var elements = document.getElementsByClassName('trade')

            if (elements.length > 10) {
                tradesElement.removeChild(elements[0]) // removes the first one, the oldest one
            }

        }
        // Essentally I am selecting a trade div on the page while dynamically adding those elements to the page in javascript. Appending trade element by trade element
        //Dom manipulation
        if (type == 'b') {
            //     console.log('got a new bar')
            //     console.log(data[key])
            //     const tradeElement = document.createElement("div")
            //     tradeElement.className = 'bar'
            //     tradeElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].p} ${data[key].s}`;
            //     tradesElement.appendChild(tradeElement)
            //  var elements = document.getElementsByClassName('trade')
            //     if (elements.length > 10) {
            //         tradesElement.removeChild(elements[0]) // removes the first one, the oldest one
            //     }


        }
    }


}

//console.log(socket)