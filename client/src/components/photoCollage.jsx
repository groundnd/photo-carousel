import React from 'react';
import styles from '../styles/photoCollage.css';


const PhotoCollage = (props) => {
  if (props.dataArr.photosAndComments.length < 5) {
    return (
      <div>
        <div className={styles.containerLessThan5}>
          <img className={styles.firstImageLessThan5} src={props.dataArr.photosAndComments[0].imageUrl} onClick={() => {props.handleClickedImage(0, () => {props.toggleModal()})}} alt="host home" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.container}>
        <img className={styles.firstImage} src={props.dataArr.photosAndComments[0].imageUrl} onClick={() => {props.handleClickedImage(0, () => {props.toggleModal()})}} alt="host home" />
        <img className={styles.secondImage} src={props.dataArr.photosAndComments[1].imageUrl} onClick={() => {props.handleClickedImage(1, () => {props.toggleModal()})}} alt="host home" />
        <img className={styles.thirdImage} src={props.dataArr.photosAndComments[2].imageUrl} onClick={() => {props.handleClickedImage(2, () => {props.toggleModal()})}} alt="host home" />
        <img className={styles.fourthImage} src={props.dataArr.photosAndComments[3].imageUrl} onClick={() => {props.handleClickedImage(3, () => {props.toggleModal()})}} alt="host home" />
        <img className={styles.fifthImage} src={props.dataArr.photosAndComments[4].imageUrl} onClick={() => {props.handleClickedImage(4, () => {props.toggleModal()})}} alt="host home" />
      </div>
    </div>
  );
};


export default PhotoCollage;
