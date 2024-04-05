import React from 'react'
import './Hero.css'
import { Carousel } from 'antd';

const items = [
  {
    key: '1',
    pic: "/Assets/carousel1.jpg"
  },
  {
    key: '2',
    pic: "./Assets/carousel1.jpg"
  }
]


const Hero = () => {
  return (
    <div className='Hero'>
      
      <div className="carousel-block">
      <p className='carousel-title'>Your Local Vendor <br/> Now At Your doorstep</p>
      <Carousel autoplay autoplaySpeed={5000}> 
      { 
        items.map((items) =>{
        return (
          <div className='carousel-card'>
            <div className="carousel-img">
              <li key={items.key}>
            <img src={items.pic} alt= {items.key} />
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