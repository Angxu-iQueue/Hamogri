import React from 'react'
import './Hero.css'
import { Carousel } from 'antd';
import ITEMS from './carousel';


const Hero = () => {
  return (
    <div className='Hero'>
      
      <div className="carousel-block">
      <p className='carousel-title'>Your Local Vendor <br/> Now At Your doorstep</p>
      <Carousel autoplay autoplaySpeed={5000}> 
      { 
        ITEMS.map((ITEMS) =>{
        return (
          <div className='carousel-card'>
            <div className="carousel-img">
              <li key={ITEMS.key}>
            <img src={ITEMS.pic} alt= {ITEMS.key} />
              </li>
            </div>
          </div>
        );

      })}
      </Carousel>
      </div>
    </div>
  )
}

export default Hero