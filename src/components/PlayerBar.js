import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <span className="ion-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <span className="ion-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">-:-</div>
          <input type="range" className="seek-bar" value="80" />
          <div className="ivon ion-volume-high"></div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
