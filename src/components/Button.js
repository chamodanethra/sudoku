import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickOnSolveButton } from '../actions/index'

class Button extends Component {

    constructor(props) {
        super();
    }

    render(){
        let buttonText = this.props.isClicked ? "Erase" : "Solve";
        return (
            <div className = 'tc f1'>
                <div className = 'tc dib br3 pa2 shadow-5 w-12 grow'>
                    <button onClick={ () => this.props.clickOnSolveButton(!this.props.isClicked) }>
                        {
                            buttonText
                        }
                    </button>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return { 
      isClicked: state.isClicked,
    };
  }

export default connect(mapStateToProps, { clickOnSolveButton })(Button);