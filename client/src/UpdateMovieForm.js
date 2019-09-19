import React, { Component } from 'react';
import axios from 'axios';

class UpdateMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateMovie: {}
    };
  }

  componentDidMount() {
    const movie = this.props.match.params.id;
    axios(`http://localhost:5000/api/movies/${movie}`)
      .then(res => {
        this.setState({ updateMovie: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    this.setState({
      updateMovie: {
        ...this.state.updateMovie,
        [e.target.name]: e.target.value
      }
    });
  };

  updateMovie = e => {
    e.preventDefault();
    const movie = this.props.match.params.id; //Grabs the id dynamically
    axios
      .put(`http://localhost:5000/api/movies/${movie}`, this.state.updateMovie)
      .then(res => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="movie-form">
        <h2>PUT (update) a movie</h2>
        <form onSubmit={this.updateMovie}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
            value={this.state.updateMovie.title}
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            onChange={this.handleChange}
            value={this.state.updateMovie.director}
          />
          <input
            type="text"
            name="metascore"
            placeholder="Meta Score"
            onChange={this.handleChange}
            value={this.state.updateMovie.metascore}
          />

          <input
            type="text"
            name="stars"
            placeholder="Stars"
            onChange={this.handleChange}
            value={this.state.updateMovie.stars}
          />

          <button className="movies_btn" type="submit">
            Update Movie
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateMovieForm;
