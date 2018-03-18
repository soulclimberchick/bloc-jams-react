import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css'
import './css/materialize.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="purple-text text-darken-3">Bloc Jams</h1>
        </header>
          <div className="row">
              test content
            <div className="col s12 m4 l3">
              <nav className="nav-extended">
                <ul className="side-nav fixed">
                  <Link to='/'>Landing</Link>
                  <Link to='/library'>Library</Link>
                </ul>
              </nav>
            </div>
          <div className="col s12 m8 l9">
            </div>
              poo poo content
            </div>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
