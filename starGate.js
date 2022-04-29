
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

const input = document.querySelector('input');
const log = document.getElementById('stopLoss');
input.addEventListener('input', updateValue);
let stopLost = 0
var token 

function updateValue(e) {
    e.target.value
    console.log(e.data)
}

// Stop Losts 
var x = 0
var stopLoss = Array();
let arrayAbove = [] 

var arrName = new Array()

async function add_element_to_array(){

  let promise = new Promise((resolve, reject) =>{
  stopLoss[x] = document.getElementById("text1").value;
    arrayAbove.push(parseFloat(stopLoss[x].replace(/[a-z]/i, '')))
    alert("Element:" + stopLoss[x] + "Added at index" + x);
    x++;
    document.getElementById("stopLoss").value = "";
 
  token = Object.values(arrayAbove)[0] // 0 index of the object
   
 
 })


 
}



function display_array() {
    var e = "<hr/>";

    for (var y = 0; y < stopLoss.length; y++) {
        e += "Element" + y + " = " + stopLoss[y] + "<br/>"

    }
    document.getElementById("Result").innerHTML = e;
}




let currentBar = {}
let trades = [];



// compare trades with stoplost number 



var chart = LightweightCharts.createChart(document.getElementById("chart"), {
    width: 700,
    height: 800,
    layout: {
        backgroundColor: '#000000',
        textColor: '#ffffff',
    },
    grid: {
        vertLines: {
            color: '#404040'
        },
        horzLines: {
            color: '#404040',
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        priceScale: {
            borderColor: '#cccccc',
        },
        timeScale: {
            borderColor: "#cccccc",
            timeVisable: true,
        }
    },

});


//utlzing dummy series to test out data
var candleSeries = chart.addCandlestickSeries(); // deploys chart

var start = new Date(Date.now() - (7200 * 1000)).toISOString()
//console.log(start)
var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE&timeframe=1Min&start=' + start;
// when we fetch this endpoint will get the candle sticks for the last two hours

// javascript has a fetch build in
fetch(bars_url, {
    headers: {
        "APCA-API-KEY-ID": KEY,
        "APCA-API-SECRET-KEY": SECRET,
    }
}).then((r) => r.json()).then((response) => {
    //console.log(response) 



    // loads alpaca data to the dom
    const data = response.bars.map(bar => (
        {
            open: bar.o,
            high: bar.h,
            low: bar.l,
            close: bar.c,

            time: Date.parse(bar.t) / 1000
            // looks familiar, inside joke.
        }
    ));

    currentBar = data[data.length - 1]
    console.log(currentBar)
    candleSeries.setData(data)
})


//promise



socket.onmessage = function starGate(event, stop) {
    const data = JSON.parse(event.data)
    // Meant to parse strings and return an object with key value pairs, so far provides one element. 
    const message = data[0]['msg']

    // console.log(data)
    if (message == 'connected') {
        //  console.log("you got Authenticated bruh")
        socket.send(JSON.stringify(auth))
        // Once connect send this auth string. Once Alpaca recives the sent auth above will get a corresponding message in the inspection log.
    }
    if (message == "authenticated") {
        socket.send(JSON.stringify(subscribe)) // subscribing to data once we are authenticated
    }
    for (var key in data) {
        //console.log(data[key]) //in displays a string of indiviual objects line by line 
        // helps process trades, quotes and bars in one way by wrighting handlers for each 
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
            //console.log("got a trade")
            //            console.log(data[key])

            const tradeElement = document.createElement("div")
            tradeElement.className = 'trade'
            tradeElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].p} ${data[key].s}`;
            tradesElement.appendChild(tradeElement)

            var elements = document.getElementsByClassName('trade')

            if (elements.length > 10) {
                tradesElement.removeChild(elements[0]) // removes the first one, the oldest one
            }
            trades.push(data[key].p)
            //console.log(trades)
            // everytime a trade comes in push price to trades 
            // we can use the array of trends to render the next bar

            var open = trades[0]
            var close = trades[trades.length - 1]
            var high = Math.max(...trades) //accepts more than one val
            var low = Math.min(...trades)
            //      console.log(open, high, low , close)

            candleSeries.update({
                time: currentBar.time + 60,
                open: open,
                high: high,
                low: low,
                close: close,

            })

        }
var local = token
   //     console.log(close)
     //   console.log(stop)
        console.log(local)

if (close <=  local ){
  console.log("My Name is Johny 5")
}

  
        // Essentally I am selecting a trade div on the page while dynamically adding those elements to the page in javascript. Appending trade element by trade element
        //Dom manipulation

        if (type == 'b' && data[key].x == "CBSE") {

            var bar = data[key];
            var timestamp = new Date(bar.t).getTime() / 1000;

            currentBar = {
                time: timestamp,
                open: bar.o,
                high: bar.h,
                low: bar.l,
                close: bar.c,
            }
            candleSeries.update(currentBar)

          
        }
    }


}

//console.log(socket)