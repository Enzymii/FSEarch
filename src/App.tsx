import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './App.css';

const jsonUrl = 'https://raw.githubusercontent.com/Zhang-Each/CourseNoteOfZJUSE/master/FSE%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AE%A2%E8%A7%82%E9%A2%98%E9%A2%98%E5%BA%93/%E8%BD%AF%E5%B7%A5%E5%9F%BA%E5%AE%A2%E8%A7%82%E9%A2%98%E5%BA%93.json';

interface Problem {
  topic: string;
  answer: string;
  options: [string, string];
}

function App() {

  const [input, setInput] = useState<string>('');

  const problemList:Problem[] = useMemo(() => new Array<Problem>(), []);

  useEffect(() => {
    (async () => {
      try {
        const json = (await axios.get(jsonUrl)).data;
        for(let i in json) {
          for(let {topic, answer, options} of json[i]) {
            /\d+\.(.+)/.test(topic);
            let mainTopic = RegExp.$1;
            let contents = options.map((str: string) => str.split(". "));
            problemList.push({ topic: mainTopic, answer, options: contents})
          }
        }
      } catch(e) {
        alert('加载题库失败！');
      }
    })();
  }, [problemList]);

  const getFilterList = problemList.filter(
    ({ topic }) => topic.indexOf(input) !== -1
  ).map(({ topic, answer, options }, idx) => 
    <li>
      <div className="problem">{idx + 1}. {topic}</div>
      Answer: <div className="answer-txt">{options.filter((option) => option[0] === answer)[0][1]}</div>
    </li>
  )

  return (
    <div className="App">
      <h1>麻麻再也不用担心我的学习~</h1>
      <div id="main-input">
        <input type="text" placeholder={"Input and Search.."} onChange={(e) => {
          const inp = e.target.value;
          setInput(inp);
        }} />
      </div>
      <ul id="prob-list">
        <div className="res-title">Search Results:</div>
        {getFilterList}
      </ul>
    </div>
  );
}

export default App;
