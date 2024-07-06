import React from 'react';

function Rating(props) {

// console.log(props.rate);
const stars=[];

const r = Math.round(props.rate*2)/2;
for (let i = 0; i < 5; i++) {
    if (r >= i + 1) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"  />);
      } else if (r >= i + 0.5) {
        stars.push(<i key={i} className="bi bi-star-half text-warning" />);
      } else {
        stars.push(<i key={i} className="fa fa-star text-warning" />);
      }
}


    return (
<div> {stars}</div>
    );
}

export default Rating;
