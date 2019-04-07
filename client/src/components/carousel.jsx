import React from 'react';
import $ from 'jquery';
import styles from '../styles/carousel.css';
import PhotoCollage from './photoCollage';
import Modal from './modal';


class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    $.ajax({
      url: '/photosandcomments/:id',
      method: 'GET',
      contentType: 'application/json',
      error: (err) => {
        console.log('GET ERR: ', err);
      },
      success: (data) => {
        console.log('GET SUCCESS: ', data);
        this.setState({ data });
      },
    });
  }

  render() {
    const { data: dataArr } = this.state;
    if (!dataArr) {
      return (
        <div className={styles.loading}>Loading...</div>
      );
    }
    return (
      <div>
        <PhotoCollage dataArr={dataArr} />
        <Modal dataArr={dataArr} />
      </div>
    );
  }
}


export default Carousel;
