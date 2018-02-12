import React, { component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render () {
    return (
      <section className='Library'>
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <img src={album.albumCover} alt={album.title} />
              <div>{album.title}</div>
              <div>{album.artist}</div>
              <div>{album.songs.length}</div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
