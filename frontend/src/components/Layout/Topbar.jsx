import React from 'react';
import Marquee from 'react-fast-marquee';

const Topbar = () => {
  return (
    <div className='bg-black text-white'>
      <div className='container mx-auto py-3 px-4'>
        <Marquee speed={50} gradient={false} pauseOnHover>
          <span className='text-sm mx-4'>We ship all over india - Fast and reliable shipping!</span>
          <span className='text-sm mx-4'>24/7 Customer Support - Call us at +91 9066747351</span>
          <span className='text-sm mx-4'>New arrivals every week - Check out our latest collection!</span>
        </Marquee>
      </div>
    </div>
  );
};

export default Topbar;
