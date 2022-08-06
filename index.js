const {Board, LCD} = require("johnny-five");
const board = new Board();
const axios = require("axios")
const api = "https://api.genelpara.com/embed/doviz.json"
let lcd;
let dolar;
let euro;
board.on("ready", function () {
     lcd = new LCD({
          pins: [7, 8, 9, 10, 11, 12],
          backlight: 6,
          rows: 2,
          cols: 20
     });
     lcd.cursor(0, 0).print("Furhex Kur");
     this.repl.inject({
          lcd: lcd
     });
     setInterval(()=>{
          axios.get(api)
          .then((res)=>{
               if(dolar !== res.data.USD.satis || euro !== res.data.EUR.satis){
                    lcd.clear().cursor(0, 0).print(`Dolar : ${res.data.USD.satis}`)
                    lcd.cursor(1, 0).print(`Euro : ${res.data.EUR.satis}`)
                    dolar = res.data.USD.satis
                    euro = res.data.EUR.satis
               }
          })
          .catch((err)=>{
               console.log(err)
               lcd.clear().cursor(0, 0).print("HATA !")
          })
     }, 3000)
});