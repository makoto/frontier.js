
// 
$(document).ready(function(){
  PathFinder.init();
  $(document).bind("PathFinder.clicked", function(e, result){
    console.log(JSON.stringify(result));
  });
});
