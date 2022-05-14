const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
// obtaing real-time crypto data
const socket = new WebSocket(url)
//the function vaildates if the aplaca server is connected
socket.onmessage = function (event) {
    const data = JSON.parse(event.data)
    console.log(data)

    if (data[0]['msg'] == "connected") {
        console.log("do auth")
        socket.send(JSON.stringify(auth))
    }

}


const KEY = "AK90GPPM09UD1UMQBOOS"
const SECRET = "CkT5Hvi7YYu9KLhco9dPGEXLQdjOrocVm9U4tvap"
const auth = { "action": "auth", "key": KEY, "secret": SECRET }
const subscribe = { "action": "subscribe", "trades": ["ETHUSD"], "quotes": ["ETHUSD"], "bars": ["ETHUSD"] }
// The subscribe variable will provide intutive market trades and quotes from Eth.
const quotesElement = document.getElementById("quotes") //  will grab each of the elements from the dom
const tradesElement = document.getElementById("trades")  // the if condition will append the quotes and trades to its notable variable
const input = document.querySelectorAll('input');


input.forEach(function (elem) {
    elem.addEventListener("input", updateValue);
});
//input.addEventListener('input', updateValue);
var stopLosstoken
var buyToken
var sellToken

function updateValue(e) {
    e.target.value
    console.log(e.data)
}
// Sell
var z = 0
var sellOrder = Array();
let arraySell = []
var multipass
// Buy
var y = 0
var buyOrder = Array();
let arrayBuy = []
//Stop Loss 
var x = 0
var stopLoss = Array();
let arrayAbove = []

//Marker Indication 
function getmyShit(){
    console.log("get my shit")

    console.log("Looky looky, right here, right here right here!")
    var timer = (Math.round(new Date().getTime()/1000) - 0);
   var markers = [
       {
           time: timer,
                   position: 'belowBar',
                   color: 'green',
           shape: 'arrowUp',
       },
        {
           time: timer,
                   position: 'aboveBar',
                   color: 'red',
           shape: 'arrowDown',
           },
   ];
   candleSeries.setMarkers(markers);
    alert("Make Drawing");
}




// StopLoss
function add_element_to_array() {
    stopLoss[x] = document.getElementById("text1").value;
    arrayAbove.push(parseFloat(stopLoss[x].replace(/[a-z]/i, '')
    ))
    alert("Crypto Price of " + stopLoss[x] + ": Added to Smart Archive index " + x);
    x++;
    //document.getElementById("stopLoss").value = "";
    stopLosstoken = Object.values(arrayAbove)
}
// BuyOrder
function addBuy_element_to_array() {

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    buyOrder[y] = document.getElementById("buyText").value;
    arrayBuy.push(parseFloat(buyOrder[y].replace(/[a-z]/i, '')
    ))
    alert("Crypto Price of " + buyOrder[y] + ": Added to Smart Archive index " + y + currentDate);
    y++;

    buyToken = Object.values(arrayBuy) // converts objects to arrays


}
// Sell Order
function addSell_element_to_array() {

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    sellOrder[z] = document.getElementById("sellText").value;
    arraySell.push(parseFloat(sellOrder[z].replace(/[a-z]/i, '')
    ))
    alert("Crypto Price of " + sellOrder[z] + ": Added to Smart Archive index " + z + currentDate);
    z++;

    sellToken = Object.values(arraySell) // converts objects to arrays

   multipass =  document.getElementById("demo").innerHTML = document.getElementById("mySelect").selectedIndex;
console.log(typeof(multipass))
}

console.log(multipass)

function display_array() {
    var e = "<hr/>";

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    for (var y = 0; y < stopLoss.length; y++) {

        e += "Stop Lost In Placed  " + stopLoss[y] + " ..." + "Smart Index " + y + currentDate + "<br/>"

    }
    for (var b = 0; b < buyOrder.length; b++) {
        e += "Purchase Order Pushed  " + buyOrder[b] + " ..." + "Smart Index " + b + currentDate + "<br/>"
    }
    for (var s = 0; s < sellOrder.length; s++) {
        e += "Price Sold For  " + sellOrder[s] + " ..." + "Smart Index " + s + currentDate + "<br/>"
    }
    document.getElementById("Result").innerHTML = e;
}

let currentBar = {}
let trades = [];
var stopLossAlert = document.getElementById("alert").style.display = "none";
var buyAlert = document.getElementById("buyAlert").style.display = "none";
var sellAlert = document.getElementById("sellAlert").style.display = "none";
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
var start = new Date(Date.now() - (25200 * 1000)).toISOString()
console.log(start)
var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE&timeframe=15Min&start=';
// when we fetch this endpoint will get the candle sticks for the last two hours
// javascript has a fetch build in
fetch(bars_url, {
    headers: {
        "APCA-API-KEY-ID": KEY,
        "APCA-API-SECRET-KEY": SECRET,
    }
}).then((r) => r.json()).then((response) => {
    console.log(response)

    // Chart bars for a day
    var data = response.bars.map(bar => (
        {
            open: bar.o,
            high: bar.h,
            low: bar.l,
            close: bar.c,
            time: Date.parse(bar.t) / 1000
        }
    ));
    currentBar = data[data.length - 1]
    candleSeries.setData(data)
    console.log(currentBar)
})

//Stop Lost Alert
function makeFunc() {
    function displayName() {
        console.log("im a string")
        var name = document.getElementById("alert").style.display = "block";
        return name
    }
    return displayName
}
var myFunc = makeFunc()

//Buy Order Alert
function makeBuy() {

    function displayBuy() {
        console.log("im a string")
        var buybuy = document.getElementById("buyAlert").style.display = "block";
        return buybuy
    }
    return displayBuy
}
var myBuy = makeBuy()

// Sell Order Alert
function makeSell() {
    function displaySell() {
        console.log("im a string")
        var sell = document.getElementById("sellAlert").style.display = "block";
        return sell
    }
    return displaySell
}
var mySell = makeSell()

// Web Socket
socket.onmessage = function starGate(event, stop) {
    const data = JSON.parse(event.data)
    const message = data[0]['msg']
    if (message == 'connected') {
        socket.send(JSON.stringify(auth))
    }
    if (message == "authenticated") {
        socket.send(JSON.stringify(subscribe))
    }
    for (var key in data) {
        const type = data[key].T;
        if (type == 'q') {
            const quoteElement = document.createElement("div")
            quoteElement.className = 'quote'
            quoteElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].bp} ${data[key].ap}`;
            quotesElement.appendChild(quoteElement)
            var elements = document.getElementsByClassName('quote')
            if (elements.length > 10) {
                quotesElement.removeChild(elements[0])
            }
        }
        if (type == 't') {
            const tradeElement = document.createElement("div")
            tradeElement.className = 'trade'
             tradeElement.innerHTML = `<b>${data[key].t}</b>  ${data[key].p} ${data[key].s}`;
            tradeElement.innerHTML = ` ${data[key].p}}`;
            tradesElement.appendChild(tradeElement)

            

            var elements = document.getElementsByClassName('trade')
            if (elements.length > 10) {
                tradesElement.removeChild(elements[0])
            }
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


                $('.play').click(function(){
                    console.log("Looky looky")
                 var timer = (Math.round(new Date().getTime()/1000) - 0);
                var markers = [
                    {
                        time: timer,
                                position: 'belowBar',
                                color: 'green',
                        shape: 'arrowUp',
                    },
                     {
                        time: timer,
                                position: 'aboveBar',
                                color: 'red',
                        shape: 'arrowDown',
                        },
                ];
                candleSeries.setMarkers(markers);
                 alert("Make Drawing");
                });



            }

            trades.push(data[key].p)
            // console.log(stopLosstoken)
            // console.log(buyToken)
            // console.log(sellToken)
            var open = trades[0]
            var close = trades[trades.length - 1]
            var round = Math.round(close)



            // I had to put a promise here to perform a async and await call.
            // At first, only one value from the input field had been allowed the charts would freeze therfore The iife function took effect avoiding pollutiing the global scope.
            // The Promise gives the function a resolve or reject within its block scope.
            // The iffe will wait until the promise is excute by invovle the proper values through the filter that would match the condition. Until then, the promise is resolve, and invokes the call back function to provide an alert() for the end user.

            function ensureStopLoss() {
                return new Promise(function (resolve, reject) {
                    (function waitForFoo() {
                        const syncRes = stopLosstoken.filter((i) => {
                            if (i > 1212) {
                                myFunc()
                            }
                        });
                        return resolve();
                        // setTimeout(waitForFoo, 30);
                    })();
                });
            }

            ensureStopLoss()
            function ensureBuy() {
                return new Promise(function (resolve, reject) {
                    (function waitForBuy() {
                        const syncBuyToken = buyToken.filter((i) => {
                            if (i > 1212) { 
                        myBuy()
                    } });
                        return resolve();
                        // setTimeout(waitForFoo, 30);
                    })();
                });
            }
            ensureBuy()
            function ensureSell() {
                return new Promise(function (resolve, reject) {

                    (function waitForSell() {
                        const syncSellToken = sellToken.filter((i) => {
                            if (i > 1212) {
                                mySell()
                            }
                        });
                        return resolve();
                        // setTimeout(waitForFoo, 30);
                    })();
                });
            }

            ensureSell()

            var high = Math.max(...trades)
            var low = Math.min(...trades)
            candleSeries.update({
             time: currentBar.time + 60,
                open: open,
                high: high,
                low: low,
                close: close,

            })
            console.log( currentBar,time)


        }
    }

    // Price DashBoard

    let priceDashboard = document.getElementById("Total")

    function priceDisplay(pro) {

        return priceDashboard.innerHTML = pro
    }


    //let priceWins = document.getElementById("Wins")

    var mySumSell = sellToken;
    var mySumBuy = buyToken;


    function makeProfit(num) {

        var negativeArray = []

        for (let j = 0; mySumBuy.length > j; j++) {
            let negativenum = -Math.abs(mySumBuy[j])
            negativeArray.push(negativenum)
        }


        // function winsDisplay(win) {

        //     return priceWins.innerHTML = win
        // }
        // let priceLosts = document.getElementById("Losts")
        // function lostDisplay(lost) {
        //     return priceLosts.innerHTML = lost
        // }

        //     let priceTag = [...mySumSell, ...negativeArray]

        // console.log(priceTag)



        // function makeSumSum(arg){
        //     var reduces = 0

        //   return arg.reduce(function(a, b) {

        //      reduces +=  a + b;
        //     console.log(reduces)
        //      return reduces    

        //     })


        // }

        // let newPrice = priceTag



        // if( sellToken  >  buyToken  ){

        // var fme = makeSumSum(newPrice)

        // }

        let mySellSum = mySumSell.reduce(function (a, b) {

            return a + b;

        })
        console.log(mySellSum)

        let myBuySum = mySumBuy.reduce(function (a, b) {
            return a + b;

        })
        console.log(myBuySum)

        let profit = 0
        // let wins = 0
        let lost = 0
        var negativePoints = -1


        if (mySellSum > myBuySum) {

            for (let i = myBuySum; i < mySellSum; i++) {
                profit += num
                // wins += num

            }

        }
        else {
            for (let i = myBuySum; mySellSum < i; i--) {
                profit += negativePoints
                lost += negativePoints

            }

        }


        priceDisplay(profit)
        // winsDisplay(fme)
        // lostDisplay(lost)

    }

    let points = 1;



    makeProfit(points)

}




var chartElement = document.createElement('div');

var chart = LightweightCharts.createChart(chartElement, {
    width: 600, width: 700,
    height: 800,
    layout: {
        backgroundColor: '#100841',
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
            borderColor: 'rgba(197, 203, 206, 0.4)',
            timeVisable: true,
        },
     
    },
    height: 300,
   
    rightPriceScale: {
        scaleMargins: {
            top: 0.3,
            bottom: 0.25,
        },
    },
    crosshair: {
        vertLine: {
            width: 4,
            color: 'rgba(224, 227, 235, 0.1)',
            style: 0,
        },
        horzLine: {
            visible: false,
            labelVisible: false,
        },
    },
    // grid: {
    //     vertLines: {
    //         color: 'rgba(42, 46, 57, 0)',
    //     },
    //     horzLines: {
    //         color: 'rgba(42, 46, 57, 0)',
    //     },
    // },
    // handleScroll: {
    //     vertTouchDrag: false,
    // },
});
document.body.appendChild(chartElement);



 // deploys chart
Series = chart.addCandlestickSeries({
    topColor: 'rgba(67, 83, 254, 0.7)',
    bottomColor: 'rgba(67, 83, 254, 0.3)',
    lineColor: 'rgba(67, 83, 254, 1)',
    color: 'rgb(0, 120, 255)',
    lineWidth: 2,
    crosshairMarkerVisible: true,
    lastValueVisible: false,
    priceLineVisible: true,
});

// candleSeries.update({
//     time: currentBar.time + 60,
//        open: open,
//        high: high,
//        low: low,
//        close: close,

//    })


var start = new Date(Date.now() - (25200 * 1000)).toISOString()
console.log(start)
var bars_url = 'https://data.alpaca.markets/v1beta1/crypto/ETHUSD/bars?exchanges=CBSE&timeframe=15Min&start=';
// when we fetch this endpoint will get the candle sticks for the last two hours
// javascript has a fetch build in
fetch(bars_url, {
    headers: {
        "APCA-API-KEY-ID": KEY,
        "APCA-API-SECRET-KEY": SECRET,
    }
}).then((r) => r.json()).then((response) => {
    console.log(response)

    // Chart bars for a day
    var data = response.bars.map(bar => (
        {
            open: bar.o,
            high: bar.h,
            low: bar.l,
            close: bar.c,
            value: bar.v,
            time: Date.parse(bar.t) / 1000
        }
    ));
    currentBar = data[data.length - 1]
    Series.setData(data)
    console.log(currentBar)
    console.log(data)

    var minimumPrice = data[0].close;
    console.log(minimumPrice)
    var maximumPrice = minimumPrice;
    for (var i = 1; i < data.length; i++) {
        var price = data[i].close;
        if (price > maximumPrice) {
            maximumPrice = price;
        }
        if (price < minimumPrice) {
            minimumPrice = price;
        }
    }
    var avgPrice = (maximumPrice + minimumPrice) / 2;

    var lineWidth = 2;
    var minPriceLine = {
        price: minimumPrice,
        color: '#be1238',
        lineWidth: lineWidth,
        lineStyle: LightweightCharts.LineStyle.Solid,
        axisLabelVisible: true,
        title: 'minimum price',
    };
    var avgPriceLine = {
        price: avgPrice,
        color: '#ffc766',
        lineWidth: lineWidth,
        lineStyle: LightweightCharts.LineStyle.Solid,
        axisLabelVisible: true,
        title: 'average price',
    };
    var maxPriceLine = {
        price: maximumPrice,
        color: '#089bda',
        lineWidth: lineWidth,
        lineStyle: LightweightCharts.LineStyle.Solid,
        axisLabelVisible: true,
        title: 'maximum price',
    }

    Series.createPriceLine(minPriceLine);
    Series.createPriceLine(avgPriceLine);
    Series.createPriceLine(maxPriceLine);

    chart.timeScale().fitContent();

})
