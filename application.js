// 
$(function(){
  o = $.eventWatcher({
    collection:"html",  // Optional
    events:["click", "mousemove"],  // Optional
    custom:{
      session_id:123
    }
  }).bind("all", function(result){
    console.log(JSON.stringify(result));
  });
  
  o.bind('click', function(result){console.log('you can also call this way')})
});

