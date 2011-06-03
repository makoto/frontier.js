PathFinder = (function(){

  var PathFinder = {}

  PathFinder.init = function(opts){
    if (!opts.container)
      container = document;

    var events = [];
    if (!opts.events) {
      events =  ["click"]
    }else if (opts.events == "all" || opts.events == ["all"]){
      events =  ["blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "submit", "keydown", "keypress", "keyup", "error"] 
    }else{
      events = opts.events
    };

    events.forEach(function(event_name){
      $(container).bind(event_name,
        function(e){
          console.log(event_name);
          var result = {
           time: new Date,
           event_name:event_name,
           text: getText(e.target),
           path: getElementCSSPath(e.target),
           url: window.location.pathname,
          }
          console.log(result);
          if (opts.custom)
            result.custom = opts.custom;

          $(this).trigger("PathFinder." + event_name, result)
          $(this).trigger("PathFinder.all", result)
        }
      );  
    })
  }

  function getText(e) {
    var text = null;
    if ($(e).text()){
      // Filter out child elements. nodeType 3 means text.
      text = $(e).contents().filter(function(){return this.nodeType === 3}).text().trim()
    }else if ($(e).attr("value")){
      text = $(e).attr("value");
    }else{
      text = "ERROR"
    }
    return text;
  }

  // getElementCSSPath, getElementCSSSelector are taken from
  // http://code.google.com/p/fbug/source/browse/branches/firebug1.6/content/firebug/lib.js
  function getElementCSSSelector(element)
  {
      if (!element || !element.localName)
          return "null";

      var label = element.localName.toLowerCase();
      if (element.id)
          label += "#" + element.id;

      if (element.classList && element.classList.length > 0)
          label += "." + element.classList.item(0);

      return label;
  };

  function getElementCSSPath(element)
  {   
      var paths = [];

      for (; element && element.nodeType == 1; element = element.parentNode)
      {
          var selector = getElementCSSSelector(element);
          paths.splice(0, 0, selector);
      }

      return paths.length ? paths.join(" ") : null;
  };

  return PathFinder
})();
