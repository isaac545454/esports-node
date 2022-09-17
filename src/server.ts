import express from "express";
import cors from 'cors'
import {PrismaClient } from '@prisma/client'
import { convert } from "./utils/func";
import { desconvert } from "./utils/func2"
const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()


app.get("/games", async (req, res)=>{
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select:{
          ads: true,
        }
      }
    }
  })
  return res.json(games)
})
app.post("/games/:id/ads", async(req, res)=>{
const gameId = req.params.id
const body: any = req.body

  const ad = await prisma.ad.create({
   data:{            
    name: body.name,           
    yearsPlaying: body.yearsPlaying,    
    discord: body.discord,         
    weekDays: body.weekDays.join(","),        
    hourStart: convert(body.hourStart),       
    hoursEnd: convert(body.hoursEnd),        
    useVoiceChannel: body.useVoiceChannel,       
     gameId : gameId  
  }
  })
return res.status(201).json(ad)
})

app.get("/games/:id/ads", async(req, res)=>{
  const id = req.params.id
 
  const  ads = await prisma.ad.findMany({
    select:{
      id : true ,           
      name : true ,           
      yearsPlaying : true ,         
      weekDays : true ,       
      hourStart : true ,      
      hoursEnd : true ,       
      useVoiceChannel : true ,
    },
    where:{
      gameId: id
    },
    orderBy:{
      createdAt: 'desc'
    }  
  })
   return res.json(ads.map(ad=>{
  return{
  ...ad,   
   weekDays: ad.weekDays.split(","),
  hourStart: desconvert(ad.hourStart),
hoursEnd: desconvert(ad.hoursEnd)
}
}))
})

app.get("/ads/:id/discord", async(req, res)=>{
   const id = req.params.id
   const ad = await prisma.ad.findUniqueOrThrow({
  select:{
    discord: true,
  },
  where: {
   id: id
  },
  })  
   return res.json({
   discord: ad.discord,
   })
})

app.listen(3333 ,()=>console.log("rodando"))