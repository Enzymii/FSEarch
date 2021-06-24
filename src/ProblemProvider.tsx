import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Problem {
  topic: string;
  answer: string;
  options: [string, string];
}

export interface ProblemContextType {
  loading: boolean;
  data: Problem[];
}

const jsonUrl =
  'https://raw.githubusercontent.com/Zhang-Each/CourseNoteOfZJUSE/master/FSE%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AE%A2%E8%A7%82%E9%A2%98%E9%A2%98%E5%BA%93/%E8%BD%AF%E5%B7%A5%E5%9F%BA%E5%AE%A2%E8%A7%82%E9%A2%98%E5%BA%93.json';

export const ProblemContext = React.createContext<ProblemContextType>({
  loading: false,
  data: [],
});

const ProblemProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Problem[]>([]);

  const getProblems = async (): Promise<void> => {
    try {
      setLoading(true);
      const json = (await axios.get(jsonUrl)).data;
      const problemList = [];
      for (let i in json) {
        for (let { topic, answer, options } of json[i]) {
          /\d+\.(.+)/.test(topic);
          let mainTopic = RegExp.$1;
          let contents = options.map((str: string) => str.split('. '));
          problemList.push({ topic: mainTopic, answer, options: contents });
        }
      }
      setData(problemList);
    } catch (e) {
      console.log(e);
      alert('加载题库失败！');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <ProblemContext.Provider value={{ loading, data }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemProvider;
