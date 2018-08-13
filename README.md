# FEND Arcade Game Project
#### Project by: Sarah Thomens

##### Code Information
The engine.js, resources.js, and game art of this project were provided by the FEND Nanodegree program as a base to create an object oriented game. Everything that was added to the project was created by Sarah Thomens, mostly in the app.js file.

##### How to Load the Game Locally
* Make sure you have all files included in the project:
	1. css folder - **style.css**
	2. images folder - 17 png images for the game including player, enemies, gems, and background
	3. js folder - **app.js**, **engine.js**, **resources.js**
		* To make changes to the project, work mostly in the app.js file.
		* The engine.js file provides the underlying game engine
		* The resources.js file saves all images in an array for easier reload
	4. misc files - **eslintrc.js**, **package.json**, **index.html**
		* .eslintrc.js and package.json are both used if you want to use eslint for code validation. To use eslint, download to your system.
		* Open index.html in your browser to view the project locally.

##### How to Play
* The player can move the character with the arrow keys. Player will not be able to move outside of the bounds of the game screen.
* Avoid the bugs moving across the stone. The player will be sent back to their starting point if they hit a bug.
* The goal is to reach the water on the other side of the screen. If this is done, the player wins!
