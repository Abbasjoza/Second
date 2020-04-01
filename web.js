const express=require('express');
const path=require('path');
const app=express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{res.send('I am Back');});
const port=process.env.PORT ||5000
app.listen(port,()=>{console.log(`I am on ${port} Port`)});