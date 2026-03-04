import express from"express"
const web = express()

web.use(express.json({"limit:16kb"}));
web.use(express.urlencoded({extended:true,limit:16kb}))
web.use(express.static("public"))

web.use(cors({
    origin:process.env.CORS_ORIGIN?split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","PATCH","POST","DELETE","PUT","OPTIONS"],
    allowedheaders:["Content-type","Authorization"],

}))
web.get("/",(req,res)=>{
    res.send("hello user")
})
web.get("/profile",(req,res)=>{
    res.send("enter username")
})
web.get("/profile/:username",(req,res)=> {
    res.send(`hello ${req.params.username}`)
})




export default web;
