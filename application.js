
// 
$(document).ready(function(){
  PathFinder.init({
    collection:"html",  // Optional
    events:["click", "mousemove"],  // Optional
    custom:{
      session_id:123
    }
  });
  $(document).bind("PathFinder.all", function(e, result){
    console.log(JSON.stringify(result));
  });
  
});
