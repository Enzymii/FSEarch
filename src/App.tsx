import React from 'react';
import ProblemProvider from './ProblemProvider';
import IndexPage from './IndexPage';
import Search from './Search';
import Exercises from './Exercises';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

interface functionType {
  name: string;
  link: string;
  path: string;
  component: React.ReactElement;
}

const functions: functionType[] = [
  { name: '搜题', link: '/search', path: 'search', component: <Search /> },
  {
    name: '抽一道',
    link: '/exercise',
    path: '/exercise/:id?',
    component: <Exercises />,
  },
];

function App() {
  const routes = functions.map(({ name, path, component }) => (
    <Route path={path} key={name}>
      {component}
    </Route>
  ));

  const indexList = functions.map(({ name, link }) => {
    return { name, link };
  });

  return (
    <ProblemProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <IndexPage urls={indexList} />
          </Route>
          {routes}
        </Switch>
      </BrowserRouter>
    </ProblemProvider>
  );
}

export default App;
