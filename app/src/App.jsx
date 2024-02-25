import React, { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { AutoModelForQuestionAnswering, AutoTokenizer, pipeline } from '@xenova/transformers';

import * as tf from "@tensorflow/tfjs";
import * as qna from  "@tensorflow-models/qna";
import { Oval } from "react-loader-spinner";
import { Fragment } from 'react';
import _ from 'lodash';
import "./data/league_of_legends_lore.json";

function App() {
  const lolChampions = [
    "Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol",
    "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki",
    "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora",
    "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi",
    "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "Kai'Sa", "Kalista", "Karma",
    "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw",
    "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar",
    "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko",
    "Nidalee", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana",
    "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira",
    "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner",
    "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh",
    "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar",
    "Vel'Koz", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath",
    "Xin Zhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Ziggs", "Zilean", "Zoe", "Zyra"
  ];
  const CHATGPT_API_KEY = "sk-ZmuRd2xT1Pvy4lZXEhVWL2OCMzJOZlV7g71VX3JOcN229ETq";
  const model_name = "deepset/roberta-base-squad2";
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState("");
  const [pipe, setPipe] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState("");

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Falconsai/question_answering_v2",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    const result = await response.json();
    return result;
  }

  async function loadLoreData() {
    try {
      // Assume you have the lore data in a file named league_of_legends_lore.json
      const response = await fetch('../src/data/lore.json');
      const loreData = await response.json();
      const textData = loreData.map((entry) => entry.name + ": " + entry.summary).join('\n\n');
      console.log("Data loaded.");
      setData(textData);
    } catch (error) {
      console.error(`Error loading lore data: ${error.message}`);
      return null;
    }
  }

  const questionAnswer = async (e) => {
    if (e.which === 13){
      setLoaded(false);
      console.log('Successfully submitted a question');
      const question = questionRef.current.value;
      query({"inputs": {
          "question": question,
          "context": data
        }
      }).then((response) => {
        console.log(JSON.stringify(response));
        console.log(response);
        if(response.answer && response.answer != ""){
          setAnswer(response.answer);
        }else{
          setAnswer("Sorry, I don't know how to answer that.")
        }
        setLoaded(true);
    });
    }
  } 

  useEffect(() => {loadLoreData()}, [1]);

  return (
    <div className="App">
      <header className="App-header">
          <React.Fragment>
            Passage
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            Ask a Question
            <input ref={questionRef} onKeyDown={questionAnswer} size="80"></input>
            <br /> 
            {loaded ? <div>Answer: {answer}</div> : <div><Oval /></div>}
            </React.Fragment>
      </header>
    </div>
  )
}

export default App
