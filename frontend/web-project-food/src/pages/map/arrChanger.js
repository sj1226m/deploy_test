import React from 'react';

function ArrChanger(a,b) {

    const newArr = Array(b).fill(false);
    a.forEach((num) => {
        newArr[num - 1] = true;
    });

    return newArr;
}

export default ArrChanger;