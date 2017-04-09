import React, { Component } from 'react';
import Draggable from 'react-draggable';
import numeral from 'numeral';
const socket = io.connect();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      activeDrags: 0
    };

    this.onInit = this.onInit.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.onServerIncrement = this.onServerIncrement.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onInit({ counter }) {
    this.setState({ counter });
  }

  handleIncrement() {
    let { counter } = this.state;
    counter++;
    this.setState({ counter });
    UserInfo.getInfo(user => {
      socket.emit('incrementCounter', { counter, user });
    }, err => console.error(err));
  }

  onServerIncrement({ counter }) {
    this.setState({ counter });
  }

  componentDidMount() {
    socket.on('init', this.onInit);
    socket.on('incrementCounter', this.onServerIncrement);
  }

  onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Shake Trump!!!</h1>
          <Draggable onStart={this.onStart} onStop={this.onStop}>
            <div>
              <img
                src="/public/trump.png"
                className="trump"
                draggable="false"
                onClick={this.handleIncrement}
              />
            </div>
          </Draggable>
          <h2>{`So far, Trump has been shaken ${numeral(this.state.counter).format('0,0')} times.`}</h2>
        </div>
      </div>
    );
  }
}
