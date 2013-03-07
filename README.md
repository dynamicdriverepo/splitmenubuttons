# Split Menu Buttons #

*Description:* Split Menu Buttons combine the sleek aesthetics of menu buttons with the versatility of drop down menus to create a navigational interface that captures the best of both worlds. It renders attractive CSS based oval buttons with an optional "toggle" element dynamically added next to it that reveals a drop down menu when interacted with. The drop down menu is simply a regular UL list you define on the page, and can be multi levelled. Sweet!

## Directions ##

*Step 1:* This script uses the following external files:

+ jQuery 1.7 or above (served via Google CDN)
+ splitmenubuttons.js
+ splitmenubuttons.css (you can change the down arrow style by changing the hex value "\25be" inside this file, such as with "\21D3" instead).

*Step 2:* Add the below code to the HEAD section of your page:

	<link rel="stylesheet" type="text/css" href="splitmenubuttons.css" />
	
	<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>
	
	<script src="splitmenubuttons.js">
	
	/* Split Menu Buttons: created: Aug 8th, 2012 by DynamicDrive.com. This notice must stay intact for usage 
	*  Author: Dynamic Drive at http://www.dynamicdrive.com/
	*  Visit http://www.dynamicdrive.com/ for full source code
	*/
	
	</script>
	
	<script>
	
	jQuery(function(){ // on document load
		$('a[data-showmenu]').splitmenubuttonMenu() // Add split button menu to links with "data-showmenu" attr
	})
	
	</script>

*Step 3:* Then, add the below sample markup to your page:

	<!-- Sample Menu buttons markup -->
	<a href="#" class="splitmenubutton" data-showmenu="dropmenu1" data-splitmenu="false">Dynamic Drive</a>
	
	<a href="#" data-showmenu="dropmenu2" class="splitmenubutton">Web Design</a>  
	
	<div style="text-align:center"><a href="#" data-showmenu="dropmenu2" data-menucolors="navy,blue" class="splitmenubutton">Web Graphics</a></div>
	
	
	<!-- Sample corresponding Drop Down Menus markup -->
	
	<!-- Drop Down #1 -->
	
	<ul id="dropmenu1" class="splitdropdown">
	<li><a href="http://www.dynamicdrive.com/new.htm">What's New</a></li>
	<li><a href="http://www.dynamicdrive.com/revised.htm">Revised</a></li>
	<li><a href="http://www.dynamicdrive.com/forums/">DD Forums</a></li>
	<li><a href="http://www.dynamicdrive.com/style/">CSS Library</a></li>
	<li><a href="http://tools.dynamicdrive.com/imageoptimizer/">Image Optimizer</a></li>
	<li><a href="http://tools.dynamicdrive.com/gradient/">Gradient Image Maker</a></li>
	<li><a href="http://tools.dynamicdrive.com/favicon/">FavIcon Generator</a></li>
	</ul>
	
	<!-- Drop Down #2 -->
	
	<ul id="dropmenu2" class="splitdropdown">
	<li><a href="#">Item 1a</a></li>
	<li class="separator"><a href="#">Item 2a</a></li>
	<li><a href="#">Item Folder 3a</a>
	<ul>
	<li><a href="#">Sub Item 3.1a</a></li>
	<li><a href="#">Sub Item 3.2a</a></li>
	<li><a href="#">Sub Item 3.3a</a></li>
	<li><a href="#">Sub Item 3.4a</a></li>
	</ul>
	</li>
	<li><a href="#">Item 4a</a></li>
	<li><a href="#">Item Folder 5a</a>
	<ul>
	<li><a href="#">Sub Item 5.1a</a></li>
	<li><a href="#">Item Folder 5.2a</a>
	<ul>
	<li><a href="#">Sub Item 5.2.1a</a></li>
	<li><a href="#">Sub Item 5.2.2a</a></li>
	<li><a href="#">Sub Item 5.2.3a</a></li>
	<li><a href="#">Sub Item 5.2.4a</a></li>
	</ul>
	</li>
	</ul>
	</li>
	<li><a href="#">Item 6a</a></li>
	</ul>

## Split Menu Buttons set up ##

See script project page for additional details on setup and documentation: <http://www.dynamicdrive.com/dynamicindex1/splitmenubuttons.htm>
