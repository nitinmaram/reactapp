import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
class TableApp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      startDate: '',
      endDate: '',
      fixData: []
    }
  }
  async componentDidMount() {
    try  {
      const response = await fetch(`http://localhost:5000`)
      const json = await response.json()
      this.setState({ data: json.data, fixData: json.data });
      console.log(this.state.data);
  }
    catch(err) {
      const response = await fetch(`http://localhost:5000`)
      const text = await response.text()
    }
  }
  headerClick(e){
    this.setState({
      [e]: true
    })
    if(this.state[e])
  {
    if(e == 'name'){
      this.state.data.sort(function (a,b) {
        if(a.name.toUpperCase() < b.name.toUpperCase())
        {
          return -1
        }
        if(a.name.toUpperCase() > b.name.toUpperCase()){
          return 1
        }
        return 0
      })
    }
    if(e=='amount')
    {
      this.state.data.sort(function(a,b){
      return b[e]-a[e]
    })
  }
  if(e=='date'){
    this.state.data.sort(function(a,b) {
      a = new Date(a[e]);
      b = new Date(b[e]);
       return a-b;
    })
  }
    this.setState({
      [e]: false
    })
  }
  else{
    if(e=='name'){
      this.state.data.sort(function (a,b) {
        if(b.name.toUpperCase() < a.name.toUpperCase()){
          return -1
        }
        if(b.name.toUpperCase() > a.name.toUpperCase()){
          return 1
        }
        return 0
      })
    }
    if(e=='amount')
    {
      this.state.data.sort(function(a,b){
      return a[e]-b[e]
    })
  }
  if(e=='date'){
    this.state.data.sort(function(a,b) {
      a = new Date(a[e]);
      b = new Date(b[e]);
      return b-a
    })
  }
    this.setState({
      [e]: true
    })
  }
    this.setState({
      data: this.state.data
    })
  }
  handleSubmit(){
    var sd = new Date(document.getElementById('sd').value)
    var ed = new Date(document.getElementById('ed').value)
    var res = this.state.fixData.filter(function (obj) {
      console.log(new Date(obj.date) <= ed);
      if(new Date(obj.date) >= sd && new Date(obj.date) <= ed){
        return true
      }
      else{
        return false
      }
    })
    this.setState({
      data: res
    })
  }
render(){

  return (
    <div>
    <h1 style = {{marginLeft: '5%'}}>Transactions</h1>

    <Paper style = {{width: '50%',marginLeft: '5%'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick = {this.headerClick.bind(this,'name')}>Name{this.state.name ? <ArrowDropUp/>: <ArrowDropDown/>}</TableCell>
            <TableCell onClick = {this.headerClick.bind(this,'amount')}>Amount {this.state.amount ? <ArrowDropUp/>: <ArrowDropDown/>}></TableCell>
            <TableCell onClick = {this.headerClick.bind(this,'date')}>Date {this.state.date ? <ArrowDropUp/>: <ArrowDropDown/>}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(row => {
            return (
              <TableRow key={row.name}>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{new Date(row.date).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    <div style = {{marginLeft: '5%', marginTop: '2%'}}>
    <input type = 'text' id = 'sd' placeHolder = "mm-dd-yyyy" /><br/>
    <input type = 'text' id = 'ed' placeHolder = "mm-dd-yyyy" /><br/>
    <button onClick = {this.handleSubmit.bind(this)}>submit</button>
    </div>
    </div>
  );
}
}
export default TableApp;
