import React from 'react'
import s from './styles.css';

const YelpCard = ({image_url, name, price, rating, review_count, categories = [], idx, location = {}}) => {
  const categoryList = categories.map(category=>category.title)
  return <div className={s.yelpCard}>
    <img src={image_url} className={s.yelpImage}></img>
    <div className={s.yelpContent}>
      <h5>{idx}. {name}</h5>
      <p>{[location.address1, location.city, location.state].join(', ')}</p>
      <div className={s.inline}>
        <img src={`/images/yelp/small_${rating}@3x.png`}
             className={s.stars}/>
        <div className={s.reviewCount}>{review_count} Reviews</div>
      </div>

      <div className={s.inline}>
        <div>{price} -</div>
        <div>&nbsp;{categoryList.join(', ')}</div>
      </div>

    </div>


  </div>
}

export default YelpCard
