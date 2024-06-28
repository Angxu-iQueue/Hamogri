import React from 'react';
import './Hero.css';
import { Carousel } from 'antd';
import ITEMS from './carousel';

const Hero = () => {
  return (
    <div className='Hero'>
      <div className="carousel-block">
        <p className='carousel-title'>Your Local Vendor <br/> Now At Your doorstep</p>
        <Carousel autoplay autoplaySpeed={5000} dotPosition="bottom">
          {ITEMS.map((item) => (
            <div className='carousel-card' key={item.key}>
              <div className="carousel-img">
                <img className='hero-img' src={item.pic} alt={item.key} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;
