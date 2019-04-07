import React from 'react';
import styles from '../styles/modal.css';


const Modal = (data) => {
  const clickedIdx = 0;
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalImage}>
          <img src={data.dataArr[6].photosAndComments[clickedIdx].imageUrl} alt="host home" />
        </div>
        <div className={styles.modalComment}>
          <span>
            {clickedIdx + 1}
            /
            {data.dataArr[6].photosAndComments.length}
            {': '}
            {data.dataArr[6].photosAndComments[clickedIdx].comment}
          </span>
        </div>
      </div>
      <div className={styles.modalGallery}>
        {data.dataArr[6].photosAndComments.map((photoandcomment, idx) => (
          <img name={idx} src={photoandcomment.imageUrl} alt="host home" />
        ))}
      </div>
    </div>
  );
};


export default Modal;
