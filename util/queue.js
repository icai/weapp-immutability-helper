const queue = (arr, context) => {
    function fire () {
      if (arr.length > 0) {
        var item = arr.shift();
        item.handle.apply(
          item.context || context || {},
          [fire].concat(Array.prototype.slice.call(arguments, 0))
        );
      }
    }
    fire();
  };

  module.exports = queue;