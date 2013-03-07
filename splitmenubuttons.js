/* Split Menu Buttons: created: Aug 10th, 2012 by DynamicDrive.com. This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code

* Updated: Aug 21st, 2012 to v1.1:
* -Added ability for a button to have no drop down menu, but retain the same style as one that does.
* -Just remove data-showmenu="dropmenuid" from the button's A element

* Updated: Oct 4th, 2012 to v1.2:
* -Added option to hide top level menu automatically onMouseout (set hidetoplevelmouseout to true)
* -Menu auto hides now after user clicks on a menu item within it
*/

jQuery.fn.splitmenubuttonMenu = function(options){
	var $ = jQuery, startzindex = 1
	var s = $.extend({}, {split:true, triggerevt:'mouseover', hidetoplevelmouseout:true, hidedelay:200, fxduration:100}, options)
	var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null
	s.triggerevt = ismobile? 'click' : (s.triggerevt == 'mouseover'? 'mouseenter' : s.triggerevt)

	function deselecttoggler($dropmenu){ // func to deselect toggler
		var $activetoggler = $dropmenu.data('$activetoggler')
		if ($activetoggler && $activetoggler.length == 1){
			$activetoggler.removeClass('selected')
			var menucolors = $activetoggler.data('menucolors')
			if (menucolors)
				$activetoggler.css('backgroundColor', menucolors[0])
		}
	}

	function positionmenu(s, level, $toggler, $dropmenu){
		if (level == "toplevel"){
			var docrightedge = $(document).scrollLeft() + $(window).width() - 40
			var docbottomedge = $(document).scrollTop()+$(window).height()-40
			this.docrightedge = docrightedge // cache this value
			this.docbottomedge = docbottomedge
			var $offset = $toggler.data('mainanchor').offset()
			var togglerWidth = (s.split)? $toggler.data('mainanchor').width() + $toggler.width() : $toggler.width()
			var togglerHeight = $toggler.height()
			var dropmenuWidth = $dropmenu.outerWidth()
			var dropmenuHeight = $dropmenu.outerHeight()
			var leftpos = (($offset.left + dropmenuWidth) > docrightedge)? $offset.left - (dropmenuWidth - togglerWidth) : $offset.left
			var toppos = (($offset.top + dropmenuHeight) > docbottomedge)? $offset.top - (dropmenuHeight + togglerHeight) : $offset.top
			return {left: leftpos, top: toppos}
		}
		else{
			var $offset = $toggler.offset()
			var submenuWidth = $dropmenu.outerWidth()
			var submenuHeight = $dropmenu.outerHeight()
			var leftpos = ($offset.left + (submenuWidth*2) > this.docrightedge)? -submenuWidth : submenuWidth
			var toppos = ($offset.top + (submenuHeight) > this.docbottomedge)? -submenuHeight + $toggler.height() : 0
			return {left: leftpos, top: toppos}
		}
	}

	function hidemenu($dropmenu){
		$dropmenu.find('ul').hide().end()
			.slideUp(s.fxduration, function(){
					deselecttoggler($dropmenu)
			})
	}

	return this.each(function(){ //return jQuery obj
		var $this = $(this).wrapInner('<span class="innerspan" />') // reference anchor item and add <span> tag inside it
		if (this.tagName == "A"){ // only apply split menu to element if it's a link
			var menucolors = $this.attr('data-menucolors')
			if (menucolors){
				menucolors = jQuery.trim(menucolors).split(/,\s*/)
				$this.css('backgroundColor', menucolors[0])
			}
			var $dropmenu = $('ul#' + this.getAttribute('data-showmenu'))
			$dropmenu.data('timer', {})
			var splitit = $this.attr('data-splitmenu') || s.split
			splitit = (typeof splitit == "string")? (splitit == "true" ? true : false ) : splitit
			if (splitit && $dropmenu.length == 1){ // split up toggler and menu link itself?
				var $toggler = $('<a class="downtoggler dedicatedtoggler"><span class="innerspan downarrow"> </span></a>').insertAfter($this) // append new "toggler" element after menu button
				if (menucolors){
					$toggler.css('backgroundColor', $this.css('backgroundColor'))
				}
			}
			else{
				var $toggler = $this
				if ($dropmenu.length == 1){
					$toggler.addClass('downtoggler').find('span.innerspan:eq(0)').addClass('downarrow')
				}
			}
			$toggler.data({'mainanchor':$this, 'menucolors':menucolors}) // store ref to menu link (which may be different from toggler if splitit == true)
			$dropmenu.appendTo(document.body) //move drop down menu so it's a child of document.body
			if ($dropmenu.length == 1){
				$toggler.bind(s.triggerevt, function(e){ // action when toggler is activated
					clearTimeout($dropmenu.data('timer').hidetimer)
					var $this = $(this)
					var menucolors = $this.data('menucolors') // get menu colors (if data-menucolors attr defined)
					if (menucolors)
						$toggler.css('backgroundColor', menucolors[1])
					$toggler.addClass('selected') // add CSS class of 'selected' to toggler
					var slidefunc = (e.type =='click')? 'slideToggle' : 'slideDown'
					if ($dropmenu.data('$activetoggler') && $dropmenu.data('$activetoggler').get(0) != $this.get(0)){
						deselecttoggler($dropmenu)
						slidefunc = 'slideDown'
					}
					var menupos = (positionmenu(s, "toplevel", $toggler, $dropmenu))
					$dropmenu.css({zIndex:++startzindex, left:menupos.left, top:menupos.top + $this.outerHeight()})
						[slidefunc](s.fxduration, function(){
							var $this = $(this)
							if ($this.css('display') == 'none')
								deselecttoggler($this)
						})
					$dropmenu.data('$activetoggler', $this)
					return false
				}) // end $toggler.trigger
				if (s.hidetoplevelmouseout){
					$toggler.bind('mouseleave', function(e){ // action when mouse rolls out of toggler
						$dropmenu.data('timer').hidetimer = setTimeout(function(){
							hidemenu($dropmenu)
						}, s.hidedelay)
					})
				}
			} // end if $dropmenu.length == 1
			else{ // else if this button has no drop down menu
				$toggler.hover(
					function(){
						$toggler.addClass('selected')
						if ($toggler.data('menucolors'))
							$toggler.css('backgroundColor', menucolors[1])
					},
					function(){
						$toggler.removeClass('selected')
						if ($toggler.data('menucolors'))
							$toggler.css('backgroundColor', menucolors[0])
					}
				)
			}
			if ($dropmenu.data('isbuilt')) // if this drop down menu has been built already, move on to the next one
				return true
			$dropmenu.on('click mouseenter', function(e){
					clearTimeout($dropmenu.data('timer').hidetimer)
					if (e.type == "mouseenter")
						$(this).css({zIndex: startzindex++})
					else{
						if ($(e.target).parent('li').hasClass('headerli'))
							e.stopPropagation()
					}
				})
			if (s.hidetoplevelmouseout){
				$dropmenu.on('mouseleave', function(e){
					$dropmenu.data('timer').hidetimer = setTimeout(function(){
						hidemenu($dropmenu)
					}, s.hidedelay)
				})
			}
			var $headers = $dropmenu.find('ul').parent()
			$headers.each(function(i){
				var $li=$(this).css({zIndex: 1000+i}).addClass('headerli')
				var $subul = $li.find('ul:eq(0)').css({display:'block'}) //set sub UL to "block" so we can get dimensions
				$subul.data('$parentliref', $li) //cache parent LI of each sub UL
				$subul.data('timers', {})
				$li.data('$subulref', $subul) //cache sub UL of each parent LI
				$li.children("a:eq(0)").addClass('rightarrow')
				$li.bind(s.triggerevt, function(e){ //show sub UL when mouse moves over parent LI
					var $targetul=$(this).addClass("selected").data('$subulref')
					if ($targetul.queue().length<=1){ //if 1 or less queued animations
						clearTimeout($targetul.data('timers').hidetimer)
						var menupos = (positionmenu(s, "sublevel", $(this), $targetul))
						$targetul.css({left: menupos.left, top: menupos.top})
						$targetul.stop(true, true).slideDown(s.fxduration)
					}
				})
				$li.bind('mouseleave', function(e){ //hide sub UL when mouse moves out of parent LI
					var $targetul=$(this).data('$subulref')
					clearTimeout($targetul.data('timers').showtimer)
					$targetul.data('timers').hidetimer=setTimeout(function(){
						$targetul.stop(true, true).slideUp(s.fxduration).data('$parentliref').removeClass('selected')
					}, s.hidedelay)
				})
				$subul.bind('mouseenter', function(e){
					clearTimeout($(this).data('timers').hidetimer)
				})
			}) // end $headers.each()
			$dropmenu.find('ul').andSelf().css({display:'none', visibility:'visible'}) //collapse all ULs again
			$dropmenu.data('isbuilt', true)
			if (!$(document).data('hidemenuevt')){ // hide top level drop down menus when user clicks on document
				$(document).on('click', function(e){
					$('ul.splitdropdown:visible').find('ul').hide().end()
						.slideUp(s.fxduration, function(){
							var $this = $(this)
							if ($this.css('display') == 'none')
								deselecttoggler($this)
						})
				})
				$(document).data('hidemenuevt', true)
			}
		}
	})

}