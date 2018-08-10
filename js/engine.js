/*============================================================================================================
* Engine.js
*
* This file provides the game loop functionality (update entities and render), draws the initial game board
* on the screen, and then calls the update and render methods on your player and enemy objects (defined in
* your app.js).
*
* A game engine works by drawing the entire game screen over and over, kind of like a flipbook you may have
* created as a kid. When your player moves across the screen, it may look like just that image/character is
* moving or being drawn but that is not the case. What's really happening is the entire "scene" is being
* drawn over and over, presenting the illusion of animation.
*
* This engine makes the canvas' context (ctx) object globally available to make writing app.js a little
* simpler to work with.
============================================================================================================*/
var Engine = ( function( global )
{
	var doc = global.document,							// Predefube variables used within this scope
		win = global.window,
		canvas = doc.createElement('canvas'),	// Create canvas element
		ctx = canvas.getContext('2d'),				// Grab 2D context for canvas
		lastTime;

	canvas.width = 505;											// Set canvas elements height/width
	canvas.height = 606;
	doc.body.appendChild(canvas);          	// Add canvas to the DOM

	/*==========================================================================================================
  * main Function
  *
  * This function serves as the kickoff point for the game loop itself and handles properly calling the
	* update and render methods.
  ==========================================================================================================*/
	function main( )
	{
		//==Get our time delta information, required if game requires smooth animation.===========================
		//==Computers process instructions at different speeds, need constant value===============================
		var now = Date.now( ),
			dt = ( now - lastTime ) / 1000.0;

		//==Call update/render functions, pass time delta to update function======================================
		update(dt);
		render();

		//==Set lastTime variable to determine time delta for next time function is called.=======================
		lastTime = now;

		//==Use browser's requestAnimationFrame function to call function again as soon as browser is able to draw another frame.=======================================================================================
		win.requestAnimationFrame(main);
	}

	/*==========================================================================================================
  * init Function
  *
  * This function does some initial setup that should only occur once, particularly setting the lastTime
	* variable that is required for the game loop.
  ==========================================================================================================*/
	function init( )
	{
		reset( );
		lastTime = Date.now( );
		main( );
	}

	/*==========================================================================================================
  * update Function
  *
  * This function is called by main (our game loop) and itself calls all of the functions which may need to
	* update entity's data. Based on how you implement your collision detection (when two entities occupy the
	* same space, for instance when your character should die), you may find the need to add an additional
	* function call here. For now, we've left it commented out - you may or may not want to implement this
	* functionality this way (you could just implement collision detection on the entities themselves within
	* your app.js file).
  ==========================================================================================================*/
	function update( dt )
	{
		updateEntities( dt );
		// checkCollisions( );
	}

	/*==========================================================================================================
  * updateEntities Function
  *
  * This is called by the update function and loops through all of the objects within your allEnemies array
	* as defined in app.js and calls their update() methods. It will then call the update function for your
	* player object. These update methods should focus purely on updating the data/properties related to the
	* object. Do your drawing in your render methods.
	==========================================================================================================*/
	function updateEntities( dt )
	{
		allEnemies.forEach( function( enemy )
		{
			enemy.update( dt );
		} );
		player.update( dt );
	}

	/*==========================================================================================================
  * render Function
  *
  * This function initially draws the "game level", it will then call the renderEntities function. Remember,
	* this function is called every game tick (or loop of the game engine) because that's how games work - they
	* are flipbooks creating the illusion of animation but in reality they are just drawing the entire screen
	* over and over.
	==========================================================================================================*/
	function render( )
	{
		//==Array holds relative URL to image used for that row of game level.====================================
		var rowImages =
                  [
                  	'images/water-block.png',   // Top row is water
                  	'images/stone-block.png',   // Row 1 of 3 of stone
                  	'images/stone-block.png',   // Row 2 of 3 of stone
                  	'images/stone-block.png',   // Row 3 of 3 of stone
                  	'images/grass-block.png',   // Row 1 of 2 of grass
                  	'images/grass-block.png'    // Row 2 of 2 of grass
                  ],
			numRows = 6,
			numCols = 5,
			row, col;

		//==Before drawing, clear existing canvas=================================================================
		ctx.clearRect( 0,0,canvas.width,canvas.height )

		//==Loop through rows & columns, using rowImages array, draw correct image for portion of "grid"==========
		for( row = 0; row < numRows; row++ )
		{
			for( col = 0; col < numCols; col++ )
			{
				//==drawImage requires 3 parameters: image to draw, x coordinate and y coordinate=====================
				ctx.drawImage( Resources.get( rowImages[row] ), col * 101, row * 83 );
			}
		}

		renderEntities( );
	}

	/*==========================================================================================================
  * renderEntities Function
  *
  * This function is called by the render function and is called on each game tick. Its purpose is to then
	* call the render functions you have defined on your enemy and player entities within app.js
  ==========================================================================================================*/
	function renderEntities( )
	{
	//==Loop through allEnemies array and call render function==================================================
		allEnemies.forEach( function( enemy )
		{
			enemy.render( );
		} );

		player.render();
	}

	/*==========================================================================================================
  * reset Function
  *
  * This function does nothing but it could have been a good place to handle game reset states - maybe a new
	* game menu or a game over screen those sorts of things. It's only called once by the init() method.
  ==========================================================================================================*/
	function reset( )
	{
		// noop
	}

	//==Load all images to draw game level. Set init as callback method, so when all images are properly loaded game will start.============================================================================================
	Resources.load(
		[
			'images/stone-block.png',
			'images/water-block.png',
			'images/grass-block.png',
			'images/enemy-bug.png',
			'images/char-boy.png',
			'images/char-horn-girl.png',
			'images/Heart.png'
		] );
	Resources.onReady( init );

	//==Assign canvas' context object to global variable so developers can use it more easily from within app.js files.===============================================================================================
	global.ctx = ctx;
})( this );
