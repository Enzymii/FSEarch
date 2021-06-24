import React, { useState, useContext } from 'react';
import { ProblemContextType, ProblemContext } from './ProblemProvider';

const Search = (): React.ReactElement => {
  const [input, setInput] = useState<string>('');
  const { data: problemList } = useContext<ProblemContextType>(ProblemContext);

  const getFilterList = problemList
    .filter(({ topic }) => topic.indexOf(input) !== -1)
    .map(({ topic, answer, options }, idx) => (
      <li key={idx}>
        <div className='problem'>
          {idx + 1}. {topic}
        </div>
        Answer:{' '}
        <div className='answer-txt'>
          {options.filter((option) => option[0] === answer)[0][1]}
        </div>
      </li>
    ));

  return (
    <div className='App'>
      <h1>麻麻再也不用担心我的学习~</h1>
      <div id='main-input'>
        <input
          type='text'
          placeholder={'Input and Search..'}
          onChange={(e) => {
            const inp = e.target.value;
            setInput(inp);
          }}
        />
      </div>
      <ul id='prob-list'>
        <div className='res-title'>Search Results:</div>
        {getFilterList}
      </ul>
    </div>
  );
};

export default Search;
