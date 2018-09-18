'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arr = [4, 5, 6, 7, 8, 9];
var newArr = [].concat(arr);

console.log(newArr);

var Data = function () {
  function Data() {
    _classCallCheck(this, Data);
  }

  _createClass(Data, [{
    key: 'run',
    value: function run() {
      console.log('run');
    }
  }]);

  return Data;
}();

var Datachild = new Data();
Datachild.run();