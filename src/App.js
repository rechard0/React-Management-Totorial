// import { render } from '@testing-library/react';
import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';

const customers = [{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '홍길동',
  'birthday' : '961212',
  'gender' : '남자',
  'job' : '백수' 
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '장승호',
  'birthday' : '930322',
  'gender' : '남자',
  'job' : '프로그래머' 
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '이순신',
  'birthday' : '961212',
  'gender' : '남자',
  'job' : '디자이너' 
}
]

class App extends Component {
  render(){ 
    return (
      // map을이용한 다수의 값을 부를때 key값으로 hashmap같이 key가이있는 클래스 타입이 있는 느낌?
    <div>
      {customers.map(c =>{ return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})}
    </div>
    );
  }
}

export default App;
