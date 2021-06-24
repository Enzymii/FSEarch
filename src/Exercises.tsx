import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Problem, ProblemContext, ProblemContextType } from './ProblemProvider';
import './App.css';

const Exercises = () => {
  const { data: problemList } = useContext<ProblemContextType>(ProblemContext);
  const [problem, setProblem] = useState<Problem>();
  const [hintText, setHintText] = useState<React.ReactElement>(<></>);
  const [dispAns, setDispAns] = useState(false);
  const history = useHistory();

  const rollProblem = () => {
    const index = Math.floor(problemList.length * Math.random());
    console.log('tmd');
    setProblem(problemList[index]);
  };

  const rollProblemCallback = useCallback(rollProblem, [problemList]);

  useEffect(() => rollProblemCallback(), [rollProblemCallback]);

  const checkAnswer = (ans: string) => ans === problem?.answer;

  const options = problem?.options.map(([mark, description]) => (
    <li
      key={mark}
      className='exe-choice'
      onClick={() => {
        const isCorrect = checkAnswer(mark);
        if (isCorrect) {
          setHintText(
            <>
              <div className='exe-right'>答对啦</div>
              <button onClick={() => history.go(0)}>再来一道</button>
            </>
          );
          setDispAns(true);
        } else {
          setHintText(
            <>
              <div className='exe-wrong'>答错啦</div>
              <button onClick={() => history.go(0)}>再来一道</button>
              <button onClick={() => setDispAns(true)}>查看正确答案</button>
            </>
          );
        }
      }}
    >{`${mark}. ${description}`}</li>
  ));

  return (
    <div>
      <div className='exe-title'>{problem?.topic}</div>
      <ul>{options}</ul>
      {hintText}
      <div
        className='exe-right'
        style={{ display: dispAns ? 'block' : 'none' }}
      >
        正确答案: {problem?.answer}
      </div>
    </div>
  );
};

export default Exercises;
