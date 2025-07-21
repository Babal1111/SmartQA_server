// when ever u intigrate 3rd party services, try to make a new folder SERVICES

const axios = require('axios');
const Rooms = require('../models/Rooms');
require('dotenv').config();
const callGemini = async(quesions,code)=>{

   const room = await Rooms.findOne({ roomCode: code });

  if (room) {
  const keywords = room.keywords;
  console.log("Keywords:", keywords);
  } else {
  console.log("Room not found");
  }
    const prompt = `
    Given following list of questions from an audience, and the keyword by the host, keywords : ${keywords} group them if they are similar and in someway connected to keywords, and return a sorted list with most frequently asked of relevant qustions summarized:
    ${quesions.map(
        (ques,index)=>`${index+1}.${ques.content}`
    ).join("\n") //join them with new line char,ie new line
    }
    Respond with only the summarized list, one per line
    `;

    //this format is from google gemni itself
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const response = await axios.post(url,
        {
            contents:[{
                parts:[{text:prompt}]
            }]
         },
        {
            headers:{
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            }
        }
    );
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return text.split("\n").filter((line)=> line.trim()!=="");
    // as we specified in prompt give ans one per line, so here we are spliting it from line,
    // and then we are filtering out empty lines
};

module.exports = {callGemini};

//ex of quest format we are sending to gemni
//1. what is the meaning of life?
//2. what is the meaning of life?