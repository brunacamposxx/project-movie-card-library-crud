import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movies: '',
      loading: true,
    };
  }

  // referencia de match params https://scotch.io/courses/using-react-router-4/route-params

  componentDidMount() {
    const { match: { params } } = this.props;
    movieAPI.getMovie(params.id).then(
      (result) => {
        this.setState({
          movies: result,
          loading: false,
        });
      },
    );
  }

  deleteMovie = () => {
    const { match: { params } } = this.props;
    movieAPI.deleteMovie(params.id);
  }

  render() {
    const { loading, movies } = this.state;
    if (loading) return <Loading />;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movies;
    const pathEdit = `/movies/${id}/edit`;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}`}</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ pathEdit }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default MovieDetails;
