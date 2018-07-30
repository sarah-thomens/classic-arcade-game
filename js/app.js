/*============================================================================================================
 * Enemy Class
 *
 * This is the enemy class that our player class will need to avoid in the game.
 ===========================================================================================================*/
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
   * Update enemy's position
   * Parameter: dt, a time delta between ticks
   * TODO: Multiply movement by dt parameter to ensure game runs at same speed for all computers.
   =========================================================================================================*/
  update( )
  {

  };

  /*==========================================================================================================
   * render Function (for Enemies)
   *
   * Draw the enemy on the screen.
   =========================================================================================================*/
   render( )
   {
     ctx.drawImage( Resources.get( this.sprite ), this.x, this.y );
   };
}

/*============================================================================================================
 * Player Class
 *
 * This class requires an update(), render() and a handleInput() method.
 ===========================================================================================================*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Place the player object in a variable called player



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

                                    //  player.handleInput( allowedKeys[e.keyCode] );
                                    });
