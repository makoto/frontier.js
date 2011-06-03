
// 
$(document).ready(function(){
  PathFinder.init({
    custom:{
      session_id:123
    }
  });
  $(document).bind("PathFinder.clicked", function(e, result){
    console.log(JSON.stringify(result));
  });
});
