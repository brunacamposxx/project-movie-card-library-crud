import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() { // manter o render aqui?
    return (
      <BrowserRouter>
        <div>Movie Card Library CRUD</div>
        <Route
          exact
          path="/"
          render={ () => <MovieList /> }
        />
        <Route
          exact
          path="/movies/:id"
          render={ () => <MovieDetails /> }
        />
        <Route
          path="/movies/new"
          render={ () => <NewMovie /> }
        />
        <Route
          exact
          path="/movies/:id/edit"
          render={ () => <EditMovie /> }
        />
        <Route
          path="*"
          render={ () => <NotFound /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
