import React, {Component } from 'react';
import { connect } from 'react-redux';

import './Grid.css';

const readTextFile = (file) => {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  let data = null;
  rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
              data = rawFile.responseText;
          }
      }
  };
  rawFile.send(null);
  return data;
};

const file = require("./p096_sudoku.txt");
const stringInput = readTextFile(file);

class Grid extends Component {

  constructor() {
    super();
    this.grid = this.makeArray(9, 9);
    this.puzzle = this.makeArray(9, 9);
    this.answer = this.makeArray(9, 9);
  }
  

  makeArray(d1, d2) {
    var arr = [];
    for(let i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
  }
  
  render(){
    if (!this.props.isClicked) {
      let randomPuzzleID = Math.floor(Math.random() * 50);
      if (randomPuzzleID === 50) {
        randomPuzzleID = 49;
      }

      let lines = stringInput.split("\n");
      let startIndex = randomPuzzleID * 10 + 1;
      let randomStringInput = "";
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.puzzle[i][j] = Number(lines[startIndex + i][j]);
          randomStringInput = randomStringInput + this.puzzle[i][j];      
        }
        randomStringInput += "\n";
      }

      const wasm = import("@chamodanethra/sudoku_solver-wasm");
      wasm.then(wasm => {
        let start = Date.now();
        let stringOutput = wasm.calculate(randomStringInput);
        let lines = stringOutput.split("\n");
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            this.answer[i][j] = Number(lines[i][j]);      
          }
        }
        console.log("Time taken to solve : " + (Date.now() - start) + "ms");
      });
    }

    this.grid = this.props.isClicked ? this.answer : this.puzzle;
    let rows = [];
    for (let i = 0; i < 9; i++){
      let rowID = `row${i}`
      let cell = []
      for (let j = 0; j < 9; j++){
        let cellID = `cell${i}-${j}`
        let cellData = this.grid[i][j] ? `${this.grid[i][j]}` : ``;
        let fontColourHex = this.props.isClicked ? this.puzzle[i][j] ? `#000` : `#f00` : `#000`;
        if ((Math.floor(i / 3) + Math.floor(j / 3)) % 2) {
          cell.push(<td key={cellID} id={cellID} className="sub" style={ {backgroundColor: `#ddd`, color: `${fontColourHex}`} }>
            {cellData}
          </td>)
        } else {
          cell.push(<td key={cellID} id={cellID} className="main" style={ {backgroundColor: `#fff`, color: `${fontColourHex}`} }>
            {cellData}
          </td>)
        }
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
      <table id="sudoku-grid" className="center">
          <tbody>
            {rows}
          </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    isClicked: state.isClicked,
  };
}

export default connect(mapStateToProps)(Grid);