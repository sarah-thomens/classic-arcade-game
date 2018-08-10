/*============================================================================================================
* Resources.js
*
* This is simply an image loading utility. It eases the process of loading image files so that they can be
* used within your game. It also includes a simple "caching" layer so it will reuse cached images if you
* attempt to load the same image multiple times.
============================================================================================================*/
( function( )
{
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];

	/*==========================================================================================================
  * load Function
  *
  * This is the publicly accessible image loading function. It accepts an array of strings pointing to image
	* files or a string for a single image. It will then call our private image loading function accordingly.
  ==========================================================================================================*/
	function load( urlOrArr )
	{
		//==If the developer passed in an array of images...======================================================
		if( urlOrArr instanceof Array )
		{
			//==loop through each value and call our image loader on that image file================================
			urlOrArr.forEach( function( url )
			{
				_load( url );
			} );
		}
		//==The developer did not pass an array to this function...===============================================
		else
		{
			//==assume the value is a string and call our image loader directly.====================================
			_load(urlOrArr);
		}
	}

	/*==========================================================================================================
  * _load Function
  *
  * This is our private image loader function, it is called by the public image loader function.
  ==========================================================================================================*/
	function _load( url )
	{
		//==If this URL has been previously loaded it will exist within our resourceCache array===================
		if( resourceCache[url] )
		{
			//==Just return that image rather than re-loading the image.============================================
			return resourceCache[url];
		}
		//==This URL has not been previously loaded and is not present within our cache===========================
		else
		{
			//==we'll need to load this image.======================================================================
			var img = new Image();

			//==Once our image has properly loaded...===============================================================
			img.onload = function( )
			{
				//==add to cache so we can return image if attempts to load file in future============================
				resourceCache[url] = img;

				//==Once the image is actually loaded and properly cached...==========================================
				if( isReady( ) )
				{
					//==call all of the onReady() callbacks we have defined.============================================
					readyCallbacks.forEach( function( func ) { func(); } );
				}
			};

			//==Set initial cache value to false, changes when image's onload event handler is called.==============
			resourceCache[url] = false;

			//==Finally, point the image's src attribute to the passed in URL.======================================
			img.src = url;
		}
	}

	/*==========================================================================================================
  * get Function
  *
  * This is used by developers to grab references to images they know have been previously loaded. If an
	* image is cached, this functions the same as calling load() on that URL.
  ==========================================================================================================*/
	function get( url )
	{
		return resourceCache[url];
	}

	/*==========================================================================================================
  * isReady Function
  *
  * This function determines if all of the images that have been requested for loading have in fact been
	* properly loaded.
	==========================================================================================================*/
	function isReady( )
	{
		var ready = true;
		for( var k in resourceCache )
		{
			if( resourceCache.hasOwnProperty( k ) && !resourceCache[k] )
			{
				ready = false;
			}
		}
		return ready;
	}

	/*==========================================================================================================
  * onReady Function
  *
  * This function will add a function to the callback stack that is called when all requested images are
  * properly loaded.
  ==========================================================================================================*/
	function onReady( func )
	{
		readyCallbacks.push( func );
	}

	/*==========================================================================================================
	* Resources Object
  *
  * This object defines the publicly accessible functions available to developers by creating a global
  * Resources object.
  ==========================================================================================================*/
	window.Resources =
    {
    	load: load,
    	get: get,
    	onReady: onReady,
    	isReady: isReady
    };

})();
