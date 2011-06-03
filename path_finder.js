
PathFinder = {}
PathFinder.init = function(opts){
  if (!opts.container)
    container = document;

  $(container).click(
    function(e){
      var result = {
       time: new Date,
       event_name:"click",
       text:PathFinder.getText(e.target),
       path:PathFinder.getElementCSSPath(e.target),
       url: window.location.pathname,
      }

      if (opts.custom)
        result.custom = opts.custom;

      $(this).trigger("PathFinder.clicked", result)
    }
  );  
}

PathFinder.getText = function(e) {
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

// getElementXPath, getElementTreeXPath, getElementCSSPath, getElementCSSSelector are taken from
// http://code.google.com/p/fbug/source/browse/branches/firebug1.6/content/firebug/lib.js
PathFinder.getElementXPath = function(element)
{
    var getElementTreeXPath = function(element)
    {
        var paths = [];

        // Use nodeName (instead of localName) so namespace prefix is included (if any).
        for (; element && element.nodeType == 1; element = element.parentNode)
        {
            var index = 0;
            for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
            {
                // Ignore document type declaration.
                if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                    continue;

                if (sibling.nodeName == element.nodeName)
                    ++index;
            }

            var tagName = element.nodeName.toLowerCase();
            var pathIndex = (index ? "[" + (index+1) + "]" : "");
            paths.splice(0, 0, tagName + pathIndex);
        }

        return paths.length ? "/" + paths.join("/") : null;
    };

    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return getElementTreeXPath(element);
};

PathFinder.getElementCSSPath = function(element)
{   
    var getElementCSSSelector = function(element)
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
    
    var paths = [];

    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var selector = getElementCSSSelector(element);
        paths.splice(0, 0, selector);
    }

    return paths.length ? paths.join(" ") : null;
};
