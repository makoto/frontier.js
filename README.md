# Event Watcher

## Functionality

Captures any event.

### Example

		o = $.eventWatcher({
		  collection:"html",  // Optional
		  events:["click", "mousemove"],  // Optional
		  custom:{ // Optional
		    session_id:123
		  }
		}).bind("all", function(result){ // Bind to all events
		  console.log(JSON.stringify(result));
		});

		o.bind('click', function(result){ // Bind to specific event
			console.log('you can also call this way')
		})

## Options

- "container" = Specify dom elements to watch. Will filter out anything above this element
- "custom" = Can add adhoc params (eg: session_id_)
- "events" = Specify in Array. You can track any events listed on http://api.jquery.com/bind/. If not specified, ["click"] is set as default

## Output

	 {
	   "time":"2011-06-03T14:57:06.523Z",
	   "event_name":"click",
	   "text":"Some Title",
	   "path":"html body div.container div.main h3",
	   "url":"/Users/makoto/work/os/event_watcher/test.html",
	   "custom":{"session_id":123}
	 }

## Custom Events

After "	$.eventWatcher()" is called, it returns the scope which you can bind any actions. 


## Event binding examples

- Output to console (for debugging)

		$.eventWatcher().bind('click', function(result){
		  console.log(JSON.stringify(result));
		});

- Send to Google Analytics

		$.eventWatcher().bind('click', function(result){
		  url = result.url + "#/" + result.path.replace(/ /g,"-")
		  pageTracker._trackPageview(url);
		});

- Send back to server (You can have /logger API end point to log all client activities)

		$.eventWatcher().bind('click', function(result){
		  $.ajax({
		    type: 'POST',
		    url: '/logger,
		    data: result
		  });
		});

- Send to cross domain via WebSocket (If you want to capture & send a lot of data)

		var socket = new WebSocket('ws://game.example.com:12010/logger');
		$.eventWatcher().bind('mousemove', function(result){
			socket.send(JSON.stringify(result))
		});
		
- Store to local storage (If you want to store activities across different pages)

		$.eventWatcher().bind('click', function(result){
			sessionStorage.setItem(result.time.valueOf(), JSON.stringify(result))
		});


## TODO

- Figure out why some of events are not get captured.

## Credit

- [Firebug](http://code.google.com/p/fbug/source/browse/branches/firebug1.6/content/firebug/lib.js) for CSS/XPath selector code


## Future Ideas

- Get image of the current page using http://www.phantomjs.org/

## Inspiration

- www.crazyegg.com
- google analytics
