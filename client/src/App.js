// import { render } from '@testing-library/react';
import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit*3,
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1000
  },
  progress: {
    // margin: theme.spacing.unit * 2
    marginTop: theme.spacing(2)
  }
})


// 1) constructor() : 불러오고

// 2) componentWillMount() : 마운트함수들을 불러옴

// 3) render() :  컴포넌트를 진행하면

// 4) componentDidMount() : 마운트함수들을 불러오고

// props or state => shouldComponentUpdate() 값들의 변함에 따라 업데이트가되고 render()를 다시함

class App extends Component {

  //변경가능한거
  // state = {
  //   customers: "",
  //   completed: 0
  // }

  //생성자
  constructor(props){
    super(props);
      this.state = {
        customers: "",
        completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callapi()
    .then(res => this.setState({customers :  res}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callapi()
      .then(res => this.setState({customers :  res}))
      .catch(err => console.log(err));
  }

  callapi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 1000 ? 0 : completed + 1});
  }

  render(){ 
    //props : 변경될수 없는거

    const { classes } = this.props; 
    return (
      <div>
      {/*  map을이용한 다수의 값을 부를때 key값으로 hashmap같이 key가이있는 클래스 타입이 있는 느낌? */}
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
          {this.state.customers ? this.state.customers.map(c =>{
             return ( <Customer key={c.id} id={c.id} image={c.image} name={c.NAME} birthday={c.birthday} gender={c.gender} job={c.job} />);})
            : 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }
        </TableBody>
      </Table>
    </Paper>
    {/* 내가 만든 함수를 직접 props로 해서 사용한다는데 뭔개소릴까? */}
    <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>

    );
  }
}

export default withStyles(styles)(App);
