$(function(){
  o = $.eventWatcher({
    collection:"html",  // Optional
    events:["click", "mousemove"],  // Optional
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
  o.bind('click', function(result){
    $('#output').text(JSON.stringify(result));
  })
  
});

