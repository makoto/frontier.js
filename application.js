
// 
$(document).ready(function(){
  PathFinder.init("div.main");
  $(document).bind("PathFinder.clicked", function(e, result){
    console.log(JSON.stringify(result));
  });
  
});
