import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props)

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: (album.songs[0].duration),
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  formatTime(time) {
    const timeInSeconds = Math.floor(parseFloat(time));
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds - (minutes * 60);

    function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }
    var finalTime = minutes + ':' + str_pad_left(remainingSeconds,'0',2);
    return finalTime;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume});
      }
    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true })
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false })
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song) }
      this.play();
    }
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = currentIndex + 1

    if (newIndex < this.state.album.songs.length) {
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
    } else {
      this.play(this.state.currentSong);
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
    this.setState({ volume: e.target.value });
  }

  render() {
    return (
      <section className="album">
        <section id="album-info" className="row">
          <div className="col">
            <img id="backround_art"
                 src={this.state.album.albumCover}
                 alt={this.state.album.title}
            />
          </div>
          <div className="col">
            <div className="album-details">
              <h2 id="album-title" className="display-3">{this.state.album.title}</h2>
              <h3 className="text-muted">{this.state.album.artist}</h3>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
            <div className="table-responsive">
              <table id="song-list" className="table table-hover table-bordered table-striped">
                <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                </colgroup>
                <tbody>
                  {
                    this.state.album.songs.map( (song, index) =>
                      <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                        <td className="song-actions">
                          <button>
                            <span className="song-number">{index+1}</span>
                            <span className="ion-play"></span>
                            <span className="ion-pause"></span>
                          </button>
                        </td>
                        <td className="song-title">{song.title}</td>
                        <td className="song-duration ">{this.formatTime(song.duration)}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          formatTime={(time) => this.formatTime(time)}
          volume={this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    )
  }
}

export default Album;
