import React from 'react';

export default class MovieDetails extends React.Component {

  handleClick(event) {
    this.props.changeView('search');
  }

  // need to do image-contain for backdrop
  render() {
    // const backDropPath = this.props.details[1].backdrop_path;
    // const posterPath = this.props.details[1].poster_path;
    // const recommendedMovie1 = this.props.details[2].results[0].poster_path;
    // const recommendedMovie2 = this.props.details[2].results[1].poster_path;
    // const recommendedMovie3 = this.props.details[2].results[2].poster_path;

    return (
    // <>
    //   <div onClick={() => this.handleClick()}>
    //     <img src={`https://image.tmdb.org/t/p/w500${backDropPath}`}></img>
    //     <img src="../images/less-than-icon.png"></img>
    //   </div>
    //   <div className="p-2">
    //     <div className="movie-description">
    //       <h2 className="title">{this.props.details[1].title}</h2>
    //       <p>Average Rating: {this.props.details[1].vote_average}</p>
    //       <div>
    //         <button>Trailer Link</button>
    //         <p>{this.props.details[1].runtime} min</p>
    //       </div>
    //       <img src="../images/heart-icon.png"></img>
    //       <img src="../images/eye-icon.png"></img>
    //       <img src="../images/add-list-icon.png"></img>
    //     </div>
    //     <div className="poster">
    //       <img src={`https://image.tmdb.org/t/p/w500${posterPath}`}></img>
    //     </div>
    //   </div>
    //   <p className="p-1">{this.props.details[1].overview}</p>
    //   <div className="reviews p-1">
    //     <h2>Reviews +icon</h2>
    //     <p>{this.props.details[0].results[0].author}</p>
    //     <p>{this.props.details[0].results[0].content}</p>
    //     <p>{this.props.details[0].results[1].author}</p>
    //     <p>{this.props.details[0].results[1].content}</p>
    //   </div>
    //   <h2>Users also liked:</h2>
    //   <div className="similar-movies" d-flex>
    //     <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie1}`}></img>
    //     <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie2}`}></img>
    //     <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie3}`}></img>
    //   </div>
    // </>

      <>
        <div onClick={() => this.handleClick()}>
          <img src={'https://image.tmdb.org/t/p/w500/tAMZHXkzFb0vwbnLVyF0S5Mw9Q5.jpg'}></img>
          <img src="../images/less-than-icon.png"></img>
        </div>
        <div>
          <div className="movie-description">
            <h2 className="title">Popstar: Never Stop Never Popping</h2>
            <p>Average Rating: 6.6</p>
            <div>
              <button>Trailer Link</button>
              <p>86 min</p>
            </div>
            <img src="../images/heart-icon.png"></img>
            <img src="../images/eye-icon.png"></img>
            <img src="../images/add-list-icon.png"></img>
          </div>
          <div className="poster">
            <img src={'https://image.tmdb.org/t/p/w500/mHevPHxVfyveuTWaamIvk5rIfKv.jpg'}></img>
          </div>
        </div>
        <p className="p-1">When his new album fails to sell records, pop/rap superstar Conner4real goes into a major
        tailspin and watches his celebrity high life begin to collapse. He'll try anything to bounce back, anything except
        reuniting with his old rap group The Style Boyz.</p>
        <div className="reviews p-1">
          <h2>Reviews +icon</h2>
          <p>Austin Singleton</p>
          <p>This movie could have been hour HBO special and been just as good if not better</p>
          <p>Gimly</p>
          <p>Perhaps for someone who is more engrained in the pop culture of the day, this would be a success. It's not
            that I didn't understand the references, it's just that I didn't care.</p>
        </div>
        <h2>Users also liked:</h2>
        <div className="similar-movies">
          <img src={'https://image.tmdb.org/t/p/w500/zztcso1bq32yzns0RI7fWYGF6yS.jpg'}></img>
          <img src={'https://image.tmdb.org/t/p/w500/6KQ9CWz76m3pT8K0yE08y72nNwD.jpg'}></img>
          <img src={'https://image.tmdb.org/t/p/w500/f8PuoewhI3qeROdfXSw2Utjf1On.jpg'}></img>
        </div>
      </>

    );
  }
}
