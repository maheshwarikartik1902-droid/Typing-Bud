import React from 'react'
import { useTestMode } from '@/context/TestModeContext'

const ApiHandler = async() => {
    const {quoteLength} = useTestMode();


    const lengthMap = {
        short:  { minLength: 0,   maxLength: 100 },
        medium: { minLength: 100, maxLength: 200 },
        long:   { minLength: 200, maxLength: 500 },
    };

    const {minLength, maxLength}  = lengthMap[quoteLength];

    const response = await fetch('https://api.quotable.io/quotes/random?minLength=100&maxLength=140');

    return response;
}

export default ApiHandler