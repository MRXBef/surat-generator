import React from 'react'
import whiteSpinner from '../assets/spinner.svg'
import blackSpinner from '../assets/spinner_black.svg'

const SpinnerLoader = ({color, width}) => {
    if(color == 'black') {
        return (
            <img src={blackSpinner} style={{width: width}}/>
        )
    } else {
        return (
            <img src={whiteSpinner}/>
        )
    }
}

export default SpinnerLoader