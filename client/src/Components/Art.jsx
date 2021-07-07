import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Frame from '../styles/gold_frame.png';
import { sketch } from '../sketch.js';
import { sketchToo } from '../sketchToo.js';
import '../styles/styles.css';

const Art = ({ generate, loading, addBlur }) => {
  return (
    <div className={`app-wrapper ${addBlur ? 'add-blur' : ''}`}>
      <div className="art-wrapper">
        <img src={Frame} className="frame" />
        <div className="curtain">
          <div className="curtain__wrapper">
            {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
            <input type="checkbox" className="checkbox" disabled></input>
            <div className="curtain__panel curtain__panel--left"></div>
            <div className="myCanvas curtain__prize"
              className="myCanvas curtain__prize">
              {generate ? <P5Wrapper sketch={sketch} /> : <P5Wrapper sketch={sketchToo} />}
            </div>
            <div className="curtain__panel curtain__panel--right"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Art;