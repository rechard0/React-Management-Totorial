// import { render } from '@testing-library/react';
import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1000
  }
})

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
    const { classes } = this.props;
    return (
      
      // map을이용한 다수의 값을 부를때 key값으로 hashmap같이 key가이있는 클래스 타입이 있는 느낌?
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
        </TableHead>
        <TableBody>
          {customers.map(c =>{ return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})}
        </TableBody>
      </Table>
     
    </Paper>
    );
  }
}

export default withStyles(styles)(App);
