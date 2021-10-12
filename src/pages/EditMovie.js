import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      shouldRedirect: false,
      status: 'loading',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // referencia de match params https://scotch.io/courses/using-react-router-4/route-params

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    movieAPI.getMovie(id).then(
      (result) => {
        this.setState({
          movie: result,
          status: 'ok',
        });
      },
    );
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie).then(
      this.setState({ shouldRedirect: true }),
    );
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      // Redirect
      return (<Redirect exact to="/" />);
    }

    if (status === 'loading') {
      // render Loading
      return (<Loading />);
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default EditMovie;
