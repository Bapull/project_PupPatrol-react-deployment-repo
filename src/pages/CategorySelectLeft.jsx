import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  button: {
    marginTop: 20,
  },
});

function CategorySelectLeft() {
  const classes = useStyles();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => {
    if (slideIndex < 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handleBack = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleButtonClick = (questionIndex) => {
    console.log(`Question ${questionIndex + 1} button clicked`);
    // 여기서 원하는 함수를 호출합니다.
  };

  return (
    <div>
      <SwipeableViews index={slideIndex} onChangeIndex={setSlideIndex}>
        <div className={`${classes.slide} ${classes.slide1}`}>
          <h2>Question 1</h2>
          <p>What is your favorite color?</p>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleButtonClick(0)}
          >
            Answer Question 1
          </Button>
        </div>
        <div className={`${classes.slide} ${classes.slide2}`}>
          <h2>Question 2</h2>
          <p>What is your favorite animal?</p>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleButtonClick(1)}
          >
            Answer Question 2
          </Button>
        </div>
      </SwipeableViews>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          disabled={slideIndex === 0}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNext}
          disabled={slideIndex === 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default CategorySelectLeft;