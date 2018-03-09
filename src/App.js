import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      diameter: "",
      circleWidth: "",
      message: '',
      dataFilter: '',
    }
  }

  componentDidMount() {
    // Take the data from the link / API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: responseData
        });
      });
  }

  onHandleChange = (e) => {
    // Set the value of the input box to the state
    this.setState({
      diameter: e.target.value
    })

  }

  onFormSubmit = (e) => {
    //Handle sunmit form to show circle or error message
    e.preventDefault();

    if (this.state.diameter > 0 && this.state.diameter <= 100) {
      this.setState({
        circleWidth: this.state.diameter,
        message: ''
      });
    } else {
      this.setState({
        message: 'Please enter a valid interger beetween 1 and 100'
      });
    }
  }

  onHanleCircleClick = (id) => {
    //when clicking the cirle this function will find the right data base on the id of the data.
    const dataFilter = this.state.data.filter((data) => data.id === Number(id));
    console.log(dataFilter);
    this.setState({
      dataFilter
    });
  }

  render() {
    
    // styles for circle since it takes a value of state

    const styles = {
      circle: {
        width: this.state.circleWidth + 'rem',
        height: this.state.circleWidth + 'rem',
      },
 
    }

    return (
      <div>
        <h3>ICEYE task</h3>

    {/*Form to receive Input*/}

        <form onSubmit={this.onFormSubmit}>

            <div className="form-group">
              <input
                type="text"
                className="form-control numberInput"
                placeholder="Input a number between 1-100"
                name="diameter"
                value={this.state.diameter}
                onChange={this.onHandleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>

        </form>

    {/*Circle and message go here*/}
        <div>
          <div style={styles.circle} className='circle' onClick={() => this.onHanleCircleClick(this.state.circleWidth)}></div>
          <h4>{this.state.message}</h4>
        </div>

    {/*USER DATA show after click the circle*/}
        <div className='root'>
          {this.state.dataFilter
            ? (
              <div>
                <div className='header' onClick={this.toggle}>
                  <strong>User Data</strong>
                </div>
                <pre className='pre'>
                  {JSON.stringify(this.state.dataFilter, null, 2)}
                </pre>
              </div>
            )
            : null
          }
        </div>

      </div>
    );

  }
}

export default App;
