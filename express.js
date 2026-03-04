import dotenv from "dotenv"
import dns from "dns"
import express from "express"
import connectDB from "./src/db/index.js"

dotenv.config({
    path:"./.env"
})
const web = express()
const PORT = process.env.PORT || 3000

//fix srv server dns issue
dns.setServers(["8.8.8.8","8.8.4.4"]);

connectDB()
   .then(()=>{
    web.listen(PORT, ()=>{
         console.log(`web is listening on https://localhost:${PORT}`);
         
    });
   })
   .catch((err)=>{
    console.error("mongodb not connected",err);
     
   });                  
             
          