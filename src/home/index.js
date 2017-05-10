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

import history from '../history';
class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = title;
  }

  gotToYelpCloneExample(){
    history.push('/yelp-clone-example')
  }
  render() {
    return (
      <div className={s.container}>
        <div dangerouslySetInnerHTML={{__html: html}}/>
        <button onClick = {()=>{this.gotToYelpCloneExample()}}>Check Out Yelp Clone Example</button>
      </div>
    );
  }

}

export default HomePage;
