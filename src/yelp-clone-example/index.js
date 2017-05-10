/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import s from './styles.css';
import {title, html} from './index.md';
import axios from 'axios';


/*----------------------------------------------------------------
 IMPORTED COMPONENTS
 ---------------------------------------------------------------*/
import YelpCard from '../../components/onederful-ui/yelp/yelp-card'


/*----------------------------------------------------------------
 ONEDERFUL CALL
 ---------------------------------------------------------------*/
//This function doesn't change
//It makes a RESTful call to onederful and returns a promise
/*-------------------------------------------------*/
function callOnederful(query) {
  const ONEDERFUL_API = 'https://api.onederful.co/graphql';
  const OPEN_BETA_KEY = 'DsvIiZ1oBO9OwjU0Kn1sAukaVNwpRjT29zWV6T53';
  const axiosInstance = axios.create({headers: {'x-api-key': OPEN_BETA_KEY}});
  return axiosInstance.post(ONEDERFUL_API, {query})
}
/*-------------------------------------------------*/


class ExamplePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yelpBusinesses: [],
      term: '',
      location: ''
    }
  }

  componentDidMount() {
    document.title = title;
  }

//Here is an example of how to call yelp
  callYelp() {
    const {term, location} = this.state
    const query =
      `query yelpSearch {
  yelp_search_api(term: "${term}", location: "${location}", limit: 5) {
    businesses {
      image_url
      name
      price
      rating
      review_count
      location{
        address1
      	city
        state
      }
      categories{
        title
      }
    }
  }
}`;

    callOnederful(query)
      .then(({data}) => {
        console.log(data)
        this.setState({yelpBusinesses: data.data.yelp_search_api.businesses})
      })
      .catch(e => console.log('handle error', e)
      )
  }

  render() {
    return (
      <div className={s.container}>
        <div className = {s.searchBar}>
          <input placeholder={'top dog, sliver, cheeseboard'} onChange = {(e)=>{this.setState({term: e.target.value})}}/>
          <input placeholder={'Berkeley, CA'} onChange = {(e)=>{this.setState({location: e.target.value})}}/>
          <button onClick={()=>{this.callYelp()}}>Search</button>
        </div>

        {this.state.yelpBusinesses.map((business, idx)=><YelpCard {...business} key={idx} idx={idx+1}/>)}
      </div>
    );
  }

}

export default ExamplePage;
