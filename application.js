function getText (e) {
  var text = null;
  if ($(e).text()){
    text = $(e).text();
  }else if ($(e).attr("value")){
    text = $(e).attr("value");
  }else{
    text = "ERROR"
  }
  return text;
}
// 
$(document).ready(function(){
  $(document).click(
    function(e){
      var result = {
       time: new Date,
       event_name:"click",
       // element:e.target, <= Can not stringfy DOM element, because it loops forever.
       text:getText(e.target),
       path:PathFinder.getElementCSSPath(e.target),
       url: window.location.pathname
      }
      console.log(JSON.stringify(result));
    }
  );  
});
