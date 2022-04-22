const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
// obtaing real-time crypto data
const socket = new WebSocket(url)

const Auth = {"action": "auth", "key": "{APCA-API-KEY-ID}", "secret": "{APCA-API-SECRET-KEY}"}




socket.onmessage = function(event){
   const data = JSON.parse(event.data)
   // meant to parse strings and return an object with key value pairs, so far provides one element. 
console.log(data)

if(data[0]['msg'] == 'connected'){
    console.log("you got Authenticated bruh")
}
}

console.log(socket)