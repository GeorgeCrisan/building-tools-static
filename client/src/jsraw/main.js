"use strict";
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        console.error(message);
    }

    return false;
};


let test = {unu: 1, doi: false};
 
let {unu: runtest} = test;

console.log('run',runtest);


class Myclass{
    constructor(it,bread){
        this.it = it;
        this.bread = bread;
    }

    what(){
        console.log(`I ${this.it} eat ${this.bread}`);
    }    
}


let me = new Myclass('manc','paine');
console.log(me);


