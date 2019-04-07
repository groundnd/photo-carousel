import React from 'react';
import styles from '../styles/photoCollage.css';


const PhotoCollage = (data) => {
  if (data.dataArr[6].photosAndComments.length < 5) {
    return (
      <div>
        <div className={styles.containerLessThan5}>
          <img className={styles.firstImageLessThan5} src={data.dataArr[6].photosAndComments[0].imageUrl} alt="host home" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.container}>
        <img className={styles.firstImage} src={data.dataArr[6].photosAndComments[0].imageUrl} alt="host home" />
        <img className={styles.secondImage} src={data.dataArr[6].photosAndComments[1].imageUrl} alt="host home" />
        <img className={styles.thirdImage} src={data.dataArr[6].photosAndComments[2].imageUrl} alt="host home" />
        <img className={styles.fourthImage} src={data.dataArr[6].photosAndComments[3].imageUrl} alt="host home" />
        <img className={styles.fifthImage} src={data.dataArr[6].photosAndComments[4].imageUrl} alt="host home" />
      </div>
    </div>
  );
};


export default PhotoCollage;
