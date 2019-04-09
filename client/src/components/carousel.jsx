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
      displayModal: false,
      clickedIdx: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClickedImage = this.handleClickedImage.bind(this);
    this.handleModalNextButton = this.handleModalNextButton.bind(this);
    this.handleModalPreviousButton = this.handleModalPreviousButton.bind(this);
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    $.ajax({
      url: '/photosandcomments/89',
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

  toggleModal() {
    const { displayModal: display } = this.state;
    this.setState({
      displayModal: !display,
    });
  }

  handleClickedImage(clickedIndex, callback) {
    this.setState({
      clickedIdx: clickedIndex,
    }, callback);
  }

  handleModalNextButton() {
    let { clickedIdx: idx } = this.state;
    const { data: dataArr } = this.state;
    if (String(idx)
    === String(dataArr.photosAndComments.length - 1)) {
      this.setState({
        clickedIdx: 0,
      });
    } else {
      this.setState({
        clickedIdx: idx += 1,
      });
    }
  }

  handleModalPreviousButton() {
    let { clickedIdx: idx } = this.state;
    const { data: dataArr } = this.state;
    if (String(idx) === String(0)) {
      this.setState({
        clickedIdx: dataArr.photosAndComments.length - 1,
      });
    } else {
      this.setState({
        clickedIdx: idx -= 1,
      });
    }
  }

  render() {
    const { data: dataArr } = this.state;
    const { displayModal: display } = this.state;
    const { clickedIdx: idx } = this.state;
    if (!dataArr) {
      return (
        <div className={styles.loading}>Loading...</div>
      );
    }
    return (
      <div>
        <PhotoCollage
          dataArr={dataArr}
          toggleModal={this.toggleModal}
          handleClickedImage={this.handleClickedImage}
        />
        <Modal
          dataArr={dataArr}
          toggleModal={this.toggleModal}
          displayModal={display}
          clickedIdx={idx}
          handleModalNextButton={this.handleModalNextButton}
          handleModalPreviousButton={this.handleModalPreviousButton}
        />
      </div>
    );
  }
}


export default Carousel;
