import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/modal.css';


const Modal = (props) => {
  if (props.displayModal) {
    return ReactDOM.createPortal(
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalImage}>
            <button className={styles.previousButton} onClick={props.handleModalPreviousButton} type="button">&#10094;</button>
            <img src={props.dataArr.photosAndComments[props.clickedIdx].imageUrl} alt="host home" />
            <button className={styles.nextButton} onClick={props.handleModalNextButton} type="button">&#10095;</button>
          </div>
          <div className={styles.modalComment}>
            <span>
              {props.clickedIdx + 1}
              /
              {props.dataArr.photosAndComments.length}
              {': '}
              {props.dataArr.photosAndComments[props.clickedIdx].comment}
            </span>
          </div>
        </div>
        <div className={styles.modalGallery}>
          {props.dataArr.photosAndComments.map((photoandcomment, idx) => (
            <img name={idx} src={photoandcomment.imageUrl} key={photoandcomment._id} alt="host home" />
          ))}
        </div>
        <button className={styles.closeButton} onClick={props.toggleModal} type="button">&#10005;</button>
      </div>,
      document.body,
    );
  }
  return null;
};


export default Modal;
