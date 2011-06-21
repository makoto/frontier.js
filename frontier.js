jQuery.frontier = (function(){
  var o = {

    event_stack: function (evt_name) {
      this._events = this._events || {};
      this._events[evt_name] = this._events[evt_name] || [];
      return this._events[evt_name];
    },

    bind: function (evt_name, handler) {
      if (typeof(evt_name) == "string") {
        evt_name = [evt_name]
      };
      for(var i = 0;i<evt_name.length;i++) {
        this.event_stack(evt_name[i]).push(handler);
      }
      
      return this;
    },

    trigger: function (evt_name) {
      var args = arguments[1] || [];
      var stack = this.event_stack(evt_name);
      for(var i = 0;i<stack.length;i++) {
        // This does not work.
        // stack[i].apply(this, args);
        stack[i](args);
      }
      return this;
    } 
  }
    
  function frontier(opts){
    if (!opts.container)
      container = document;

    var events = [];
    if (!opts.events) {
      events =  ["click"]
    }else if (opts.events == "all" || opts.events == ["all"]){
      events =  [
        "blur", "focus", "focusin", "focusout", "load", "resize", "scroll", "unload", "click", "dblclick", 
        "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", 
        "select", "submit", "keydown", "keypress", "keyup", "error", "beforeunload"
      ] 
    }else{
      events = opts.events
    };
    
    events.forEach(function(event_name){
      $(window).bind(event_name,
        function(e){
          var result = {
           time: new Date,
           event_name:event_name,
           text: getText(e.target),
           path: getElementCSSPath(e.target),
           url: window.location.pathname,
           client:{x:e.clientX, y:e.clientY},
           local:e.target.localName
          }
          if (opts.custom)
            result.custom = opts.custom;

          o.trigger(event_name, result)
          o.trigger("all", result)
        }
      );  
    })
    return o
  }

  // Add here if you want to have some public class method in future 
  // PathFinder.someMethod = function(){
  // 
  // }

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

  return frontier
})();
