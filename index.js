// import {config} from "dotenv"
const express=require("express")
const cors=require("cors")
const app=express()
const {connection}=require("./db")
const {apiRouter}=require("./routes/api.route")


const dotenv=require("dotenv")
const {Configuration, OpenAIApi}=require("openai")
const readline=require("readline")

dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/api",apiRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to db")
        console.log("Server is running")
    } catch (error) {
        console.log(error)
    } 
})
