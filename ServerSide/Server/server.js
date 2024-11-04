import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());



app.get('/',(req,res)=>{
    res.send("maybe try accessing the api?")
})

app.get("/api",(req,res)=>{
    let data_in = (req.query);
    console.log(data_in);

    if (data_in){
        res.send("thanks");
    }
    else{
        res.send("nodata");
    }
})


app.listen(3001, ()=>{console.log("server started")});