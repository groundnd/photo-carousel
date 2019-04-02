import React from 'react';
import $ from 'jquery';


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    $.ajax ({
      url: '/photosandcomments/:id',
      method: 'GET',
      error: (err) => {
        console.log('GET ERR: ', err);
      },
      success: (confirmation) => {
        console.log('GET SUCCESS: ', confirmation);
      },
    })
  }

  render() {
    return (
      <div>Hi</div>
    );
  }
}


export default Carousel;
