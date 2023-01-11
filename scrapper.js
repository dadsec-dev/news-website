const puppeteer = require("puppeteer");
const express = require("express");
const cors = require('cors');
//const ejs = require("ejs");
const port = 5000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public', {
     types: {
          'js': "text/javascript"
     }
}));
app.use(cors());

var usdBuy;
var usdSell;

var gbpBuy;
var gbpSell;

var eurBuy;
var eurSell;


app.get('/', function(req, res) {

     async function start() {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

           page.setDefaultNavigationTimeout(0); 
          await page.goto("https://abokiforex.app/");
          const prices = await page.evaluate(() => {
               return Array.from(document.querySelectorAll(".overlay-text")).map(x => x.textContent)
          })
     
          usdBuy = prices[0]
          usdSell = prices[1]
     
          gbpBuy = prices[2]
          gbpSell = prices[3]
     
          eurBuy = prices[4]
          eurSell = prices[5]
     
          console.log(usdBuy);
          console.log(usdSell);
     
          console.log(gbpBuy);
          console.log(gbpSell);
     
          console.log(eurBuy);
          console.log(eurSell);
          await page.close();
          await browser.close();
     }    
     start();
     res.render("home", {
          usdBuy: usdBuy,
          usdSell: usdSell,
          gbpBuy: gbpBuy,
          gbpSell: gbpSell,
          eurBuy: eurBuy,
          eurSell: eurSell

     });
})


app.listen(process.env.PORT || port,  function () {
     console.log(`Listening on port ${port}`)
})