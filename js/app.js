/*============================================================================================================
* Enemy Class
*
* This is the enemy class that our player class will need to avoid in the game.
============================================================================================================*/
class Enemy
{
	constructor( x, y, speed )
	{
		this.sprite = 'images/enemy-bug.png';   // Image/sprite for enemies, uses a helper to easily load images

		this.x = x;                             // Enemy start x position
		this.y = y;                             // Enemy start y position

		this.speed = speed;                     // Enemy speed
	}

	/*==========================================================================================================
  * update Function (for Enemies)
  *
  * Updates the enemy's position on the screen.
  * Parameter: dt, a time delta between ticks
  ==========================================================================================================*/
	update( dt )
	{
		//==If the enemy is still on screen...====================================================================
		if( this.x <=505 )
		{
			//==move to the right based on the enemy's speed========================================================
			this.x += this.speed * dt;
		}
		//==If the enemy is not on screen...======================================================================
		else
		{
			//==reset the location on the left side of the screen===================================================
			this.x = -100;
		}

		//==If the enemy comes within range of the player...======================================================
		if( this.x >= (player.x - 75) && this.x <= (player.x + 75 ) && this.y >= (player.y - 75) && this.y<=(player.y +75))
		{
			//==...reset the player's position to the start=========================================================
			player.resetPlayer( );
		}
	}

	/*==========================================================================================================
  * render Function (for Enemies)
  *
  * Draws the enemy on the screen.
  ==========================================================================================================*/
	render( )
	{
		ctx.drawImage( Resources.get( this.sprite ), this.x, this.y );
	}
}

/*============================================================================================================
* Player Class
*
* This class requires an update(), render() and a handleInput() method.
============================================================================================================*/
class Player
{
	constructor( x, y )
	{
		this.sprite = 'images/char-horn-girl.png';   // Image/sprite for player

		this.x = x;                                  // Player start x position
		this.y = y;                                  // Player start y position
		this.resetX = x;                             // Player reset x position
		this.resetY = y;                             // Player reset y position
		this.targetX = x;                            // Target location x position
		this.targetY = y;                            // Target location y position
	}

	/*==========================================================================================================
  * update Function
  *
  * Updates the player's position on the screen.
  ==========================================================================================================*/
	update( dt )
	{
		let speed = 300;       // Setting a speed for the player

		//==If the player's x value is less than the target location x value...===================================
		if( this.x < this.targetX )
		{
			//==...move the player to the right=====================================================================
			this.x += speed * dt;

			//==If the player's x value is within range of the target location's x value...=========================
			if( this.x >= (this.targetX - 1 ) )
			{
				//==...set the player's x to the target location's x value to move out of the loop====================
				this.x = this.targetX;
			}
		}
		//==If the player's x value is greater than the target location x value...================================
		else if( this.x > this.targetX )
		{
			//==...move the player to the left======================================================================
			this.x -= speed * dt;
		}
		//==If the player's y value is less than the target location y value...===================================
		else if( this.y < this.targetY )
		{
			//==...move the player down=============================================================================
			this.y += speed * dt;
			//==If the player's y value is within range of the target location's y value...=========================
			if( this.y >= (this.targetY - 1) )
			{
				//==...set the player's y to the target location's y value to move out of the loop====================
				this.y = this.targetY;
			}
		}
		//==If the player's y value is greater than the target location y value...================================
		else if( this.y > this.targetY )
		{
			//==...move the player up===============================================================================
			this.y -= speed * dt;
		}
	}

	/*==========================================================================================================
  * handleInput Function
  *
  * Takes the input from the user and determines what direction and where the player should go.
  ==========================================================================================================*/
	handleInput( allowedKeys )
	{
		//==Determine what the player input is and move the target x or y values accordingly====================
		switch( allowedKeys )
		{
		case 'left':
			if( this.targetX > 0 ) this.targetX -= 100;
			break;
		case 'up':
			if( this.targetY > 0 ) this.targetY -= 85;
			break;
		case 'right':
			if( this.targetX < 400 ) this.targetX += 100;
			break;
		case 'down':
			if( this.targetY < 400 ) this.targetY += 85;
			break;
		}
	}

	/*==========================================================================================================
  * resetPlayer Function
  *
  * Resets the player to it's starting position.
  ==========================================================================================================*/
	resetPlayer( )
	{
		this.x = this.resetX;
		this.y = this.resetY;

		this.targetX = this.resetX;
		this.targetY = this.resetY;
	}

	/*==========================================================================================================
  * render Function
  *
  * Draws the player on the screen.
  ==========================================================================================================*/
	render( )
	{
		ctx.drawImage( Resources.get( this.sprite ), this.x, this.y );
	}
}


//==Instantiating enemy objects===============================================================================
let e1 = new Enemy( -100, 140, 100 );
let e2 = new Enemy( -200, 60, 500 );
let e3 = new Enemy( -150, 230, 300 );

//==Placing all enemy objects in an array called allEnemies===================================================
let allEnemies = [e1, e2, e3];

//==Instantiating a player opject=============================================================================
let player = new Player( 200, 400 );


//==Listens for key presses and sends keys to Player.handleInput(). You don't need to modify this.============
document.addEventListener( 'keyup', function( e )
{
	var allowedKeys =
  {
  	37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

	player.handleInput( allowedKeys[e.keyCode] );
});
