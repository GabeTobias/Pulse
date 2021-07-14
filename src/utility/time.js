const { default: store } = require("../store");

exports.DateFormat = function (UNIX_timestamp) {
  //Get Date objects
  var current = new Date();
  var stamp = new Date(UNIX_timestamp);

  //Get String values for timestamp
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = stamp.getFullYear();
  var month = months[stamp.getMonth()];
  var date = stamp.getDate();
  var hour = stamp.getHours();
  var min = stamp.getMinutes();

  //Generate String for different formats
  var DMY = date + ' ' + month + ' ' + year;
  var HMS = hour + ':' + ((min < 10) ? '0' + min : min) + ' ' + (hour > 12 ? 'PM':'AM');
  
  return (current.getDate() == date) ? HMS : DMY;
}

exports.DurationFormat = function(duration) {
  let min = duration / 60;
  let sec = ((duration / 60.0) % 1) * 60;

  return Math.floor(min) + ':' + ( sec < 10 ? '0' + Math.floor(sec) : Math.floor(sec));
}

exports.getTaskDuration = function(taskTime) {
  let seconds = new Date().getTime() / 1000;
  return seconds - taskTime;
}

exports.getTaskPercentage = function(taskTime, duration) {
  return (exports.getTaskDuration(taskTime) / duration) * 100;
}