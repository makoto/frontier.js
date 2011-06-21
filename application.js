$(function(){
  o = $.frontier({
    collection:"html",  // Optional
    events:["click", "mousemove","beforeunload", "load", "unload", "submit"],  // Optional
    custom:{
      session_id:123
    }
  })
  .bind(["mousemove", "click"], function(result){
      console.log(JSON.stringify(result));
    });
  
  $('a#live').live('click', function () {
    console.log('Live')
    return false
  })
  $('a#bind').bind('click', function () {
    console.log('Bind')
    return false
  })
  $('a#delegate').delegate(null, 'click', function () {
    console.log('Delegate')
    return false
  })
  o.bind("all", function(result){
    console.log(result.event_name)
  })
  o.bind(['click', 'load'], function(result){
    $('#output').text(JSON.stringify(result));
  })
  
  o.bind('beforeunload', function(result){
    $('#output').text(JSON.stringify(result));
    alert("about to exist");
  })

  o.bind('submit', function(result){
    $('#output').text(JSON.stringify(result));
    alert("about to submit");
  })

});

