import React, { Component } from 'react';
import './App.css';
const constraints = { audio: true, video: { width: 1280, height: 720 } };
let userToken = '';

class App extends Component {

    componentWillMount() {
        const ref = this;
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                // Dependencies
                const Peer = require('simple-peer');
                const peer = new Peer({ initiator: window.location.hash === '#user', trickle: false, stream: stream });

                peer.on('signal', (data) => {
                    document.querySelector('.user').value = JSON.stringify(data)
                });
                
                document.querySelector('.user').addEventListener('click', function(){
                    this.select();
                    document.execCommand('copy');
                    document.querySelector('.copy').innerText = "Token copid"
                })

                document.querySelector('button').addEventListener('click', () => {
                    let friendID = JSON.parse(document.querySelector('.friend').value);
                    peer.signal(friendID);
                });
                
                peer.on('stream', (stream) => {
                    // ref.setState({ show: false });
                    let video = document.createElement('video');
                    let wrapper = document.querySelector('.video_track')
                    wrapper.appendChild(video);
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    submitForm(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <div className="room_input">
                    <div className="container">
                        <br/>
                        <br/>
                        <br/>
                        <h1 className="text-center">Chat Room</h1>
                        <hr/>
                        <br/>
                        <form onSubmit={this.submitForm}>
                            <label className="copy text-large text-warning"></label>
                            <br/>
                            <br/>
                            <label>Your ID</label>
                            <input type="text" className="form-control user"/>
                            <br/>
                            <br/>
                            <label>Friend ID</label>
                            <input type="text" className="form-control friend"/>
                            <br/>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="video_track">

                </div>
            </div>
        );
    }
}

export default App;