const express=require("express")
const apiRouter=express.Router()
const {Configuration, OpenAIApi}=require("openai")
const readline=require("readline")
const {QuestionModel}=require("../model/questions.model")
const natural = require('natural');

const openai=new OpenAIApi(new Configuration({
    apiKey:process.env.API_Key
}))



apiRouter.post("/chat/new",(req,res)=>{
    let question=req.body.message
    console.log(question)
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }).then(response=>{
        return response?.data?.choices?.[0].text;
      }).then((ans)=>{
        const arr=ans?.split("\n").filter(ele=>ele).map(value=>value.trim());
        return arr;
      })
      .then(response=>{
        res.json({
            answer:response,
            prompt:question
        })        
    })
})






module.exports={apiRouter}