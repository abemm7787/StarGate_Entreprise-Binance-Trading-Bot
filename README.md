# StarGate Entreprise 
A Trading Bot Just Meant For You.


04/27/2022 4:42

Track current bars latest updates in gridbot.js. Will do this by tracking the time stamp and trades of the current bar.

line 16 & line 17 contains these variable assigned to objects and a array.
The keynote is to have incomming trades inside the array
let currentBar = {}
let trades = []; // gradually update with high low bars and append to the end



Line 69 
The data list indicates the last bar
    const data = response.bars.map(bar => (
        {
            open: bar.o,
            high: bar.h,
            low: bar.l,
            close: bar.c,
            time: Date.parse(bar.t) / 1000
        }
    ));



// fetches current bar

console.log(data)
    currentBar = data[data.length - 1]
    candleSeries.setData(data)
})


when pages loads, we need to update the bar so that time is in real time using websocket data.

Line 92 has a websokcetdata 
socket.onmessage = function (event)  

line 106 process through the messages for var key and data.
The data key can be type quote, trade, or bar.


   line 145 uploads open, close prices along with high and low prices on the dom. 
        var open = trades[0] 
        var close = trades[trades.length-1]
        var high = Math.max(...trades) //accepts more than one val
        var low = Math.min(...trades)
        console.log(open, high, low , close)


Next, will use CCXT Crypto Currency eXchange Trading and node js  subscribe to real buy orders.