
const express = require("express");
const cors = require("cors");
const path = require("path");
const dateformat = require("dateformat")
const today = new Date();
const { APOD, EPIC,EPICIMAGE } = require("./nasaData");
let app = express();

app.use(cors());
const PORT = process.env.PORT || 4000;
console.log(PORT)
app.get("/APOD/:date", async function (req, res) {
    let date = new Date(req.params.date)
    let dateString1 = dateformat.default(date,"yyyy-mm-dd")
    if(date>today){
        res.send(`Must be 1995/03/16 and ${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`)
        return;   
    }
    let a = await APOD(dateString1);
    res.send(a)
})

app.get("/EPIC/:date", async function(req, res){
    let date = new Date(req.params.date)
    if(date>today){
        res.send(`Must be 1995/03/16 and ${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`)
        return;   
    }
    let dateString1 = dateformat.default(date,"yyyy-mm-dd")
    let dateString = dateformat.default(date,"yyyy/mm/dd")
    let image = []
    let datas = await EPIC(dateString);
    for(let x in datas){
        image[x] = await EPICIMAGE(dateString1,datas[x].image);
    }
    
    let result = {
        inform: datas,
        images: image
    }
    res.send(result)
})

app.listen(PORT);