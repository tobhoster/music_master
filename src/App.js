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
        const accessToken = 'BQDLi3aXkKXvkFMQOjIGMjbVkRXo8HLHrrPp4ir1bPBZOA5urmmjffsvKLai04o5BxmZFPOHcZrSEkhzcfLK3L4dYs2g_T7XGRd_IXbhpG8r0d8orTfMEcbTBXfjjnT6cqoU5oBb6Y9ABS16GHZPu8tBmSbZD3w9fftw&refresh_token=AQA52hx3p5_vTEOpbVqQvEcJzCC7V-NIlhJwyEaaml3SI82b-RNvHCB0DNSnT1o8rcq8xi08U7aQKiqVvutX2meAfh87VyoVmwUOCHKBGc2nQeFiV-yCsH6j_Al_wYQdqjQ';
        
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
                <div className="App-title">Music  Master </div>
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