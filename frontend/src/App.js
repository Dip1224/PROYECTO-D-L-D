import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Estudiantes from './components/Estudiantes';
import Graficos from './components/Graficos';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/estudiantes" component={Estudiantes} />
          <Route path="/graficos" component={Graficos} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;