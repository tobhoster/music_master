import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    render() {
        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []}
        artist = this.props.artist !== null ?  this.props.artist : artist;

        return (
            <div>
                {
                artist.images[0].url !== undefined ? <img
                  alt="Profile"
                  className="profile_img"
                  src={artist.images[0].url}/> : <div>Image</div>}

                <div className="profile_info">
                    <div className="profile_name">{artist.name}</div>
                    <div className="profile_followers">{artist.followers.total} followers</div>
                    <div className="profile_genres">{artist.genres.map((genre, key) => {
                        genre = genre !== artist.genres[artist.genres.length - 1] ? `${genre}, ` : ` & ${genre}`
                            return(
                                <span key={key}>{genre}</span>
                            )
                        })}</div>
                </div>
            </div>
        )
    }
}

export default Profile;
