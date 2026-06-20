const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.get("/:userId", async (req,res)=>{

  try {

    const chat =
      await Chat.findOne({
        userId:req.params.userId,
      });

    res.json(chat);

  } catch(error){

    res.status(500).json({
      error:error.message,
    });

  }

});

router.post("/", async (req,res)=>{

  try {

    const {
      userId,
      messages,
    } = req.body;

    let chat =
      await Chat.findOne({
        userId,
      });

    if(!chat){

      chat = await Chat.create({
        userId,
        messages,
      });

    } else {

      chat.messages = messages;

      await chat.save();
    }

    res.json(chat);

  } catch(error){

    res.status(500).json({
      error:error.message,
    });

  }

});

module.exports = router;