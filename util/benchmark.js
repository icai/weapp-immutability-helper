const ai = {};


ai.debug = true;

ai.now = function(){
    return new Date().getTime();
}
ai.benchmark = function(start){
    var log = console.info || ai.noop;
    var time = (start instanceof Date) ? start.getTime() : start;
    ai.debug && log('run: ' + (ai.now() - time) + ' ms');
}

module.exports = ai;