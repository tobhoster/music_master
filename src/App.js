import React, { Component } from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';

import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    async search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?'
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const accessToken = 'BQCAZht8u3aR26CrTfjPkxmgFvn-Oe7WozY2642brX4q2dnk9EkvOAOGEsRZLM4z8dHoaegfTjPBXrJIzZNlw1ZNkeK2KT5cCowXHubS1HfnwGi5uY4nKUPCkivKvc18Dos_PH4jL4dfSSVaQgtKP4bb3KjG7OCBm5O2&refresh_token=AQD8ucGcI-Natxqi3WtQR-90tuabRB22f308SO_ZEzCU1vVuQqJM1e2Hp_4M8ewICbSaQTapSJSZyU1V6G1tvKKbLS0GmehIAmOueBElUFPVdSS8FdDLFWAlo7lji7Er4q4';
        
        var options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        try {
            var response = await fetch(FETCH_URL, options);
            var json = await response.json();
            const artist = await json.artists.items[0];
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            var fetch_response = await fetch(FETCH_URL, options);
            var fetch_json = await fetch_response.json();
            const tracks = fetch_json.tracks;
            this.setState({tracks});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music  🎶  Master </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                        type="text" 
                        placeholder="Search for an Artist"
                        query={this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress={event => event.key === 'Enter' ? this.search() : " "}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null ? 
                    <div>
                        <Profile
                            artist={this.state.artist}
                        />
                        <div>
                            <div className="top_tracks_info">Top Tracks</div>
                            <hr/>
                            <Gallery
                            tracks={this.state.tracks}
                        />
                        </div>
                    </div> : <div></div>
                }
                
            </div>
        )
    }
}

export default App;