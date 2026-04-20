import React from 'react';

const Marquee = (props) => {

  const imageMap = Array.from({ length: props.count }, (_, index) => (
    <div className="marquee-item" key={index}>
      <img 
        src={require(`../assets/img/brandlogo/logo${index + 1}.png`)}
        alt={`Hotel ${index + 1}`} 
        style={{ width: 135, height: 120 }} 
      />
    </div>
  ));
  const imageMap2 = Array.from({ length: props.count }, (_, index) => (
    <div className="marquee-item" key={index}>
      <img aria-hidden="true"
        src={require(`../assets/img/brandlogo/logo${index + 1}.png`)}
        alt={`Hotel ${index + 1}`} 
        style={{ width: 135, height: 120 }} 
      />
    </div>
  ));

  return (
    <div className="marquee-text">
      <div className="marquee-text-track">
        {imageMap}
        {imageMap2} 
      </div>
    </div>
  );
};



export default Marquee;