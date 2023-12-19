# Tetris on Javascript

This project showcases a simple implementation of the classic game Tetris using JavaScript and the HTML <canvas> element. Tetris is a puzzle game that challenges player coordination and mental agility by manipulating falling blocks to complete lines on the game board.

In this project, Vite was utilized as the build tool. Vite is a modern front-end build tool known for its speed and developer-friendly features. 

It offers a fast development server with hot module replacement, supports modern JavaScript features, and provides efficient dependency management. The use of Vite enhances the development experience by enabling quick feedback loops during coding and optimizing the build process for speed.

## Key Features

- Canvas: utilizes the HTML5 <canvas> element for real-time graphics rendering.
- JavaScript programming: learn fundamental JavaScript programming concepts such as array manipulation, flow control, and event handling.
- Game logic: implements core tetris logic, including piece falling, rotation, line clearing, and game over detection.

## Considerations in the Project:

### Inclusions:

- Game logic: the project includes well-defined game logic for handling the falling blocks, scoring, and game over.
- Modular code: the code is organized into separate modules or classes for better maintainability and readability (e.g., Game, Shape, UI, etc.).
- User interface: there is a User Interface (UI) module (UI.js) that handles the display of game-related information, score, and game over messages.
- Input handling: the InputHandler.js module manages user input, such as keyboard and mouse events, for controlling the game.
- Random shape heneration: shapes are randomly generated for the falling blocks using predefined configurations (PIECES in Pieces.js).
- Collision detection: the code includes collision detection logic to determine when blocks collide with each other.}

### Exclusions:

- Testing: the project lacks explicit testing mechanisms or test cases to ensure the reliability of the code.
- Documentation: the provided code does not include comprehensive inline comments or external documentation, making it less accessible for future maintenance or collaboration.
- Scalability: while the current code handles basic game mechanics, it might not be optimized for scalability, especially for more complex features or future expansions.
- Code Efficiency: the efficiency of the code (in terms of algorithms and performance) is not explicitly addressed. Further optimization may be required for resource-intensive scenarios.
- User Experience (UX): the code focuses on functionality but does not include considerations for improving the overall user experience, such as animations or visual effects.

### Limitations and areas for improvement

- The game currently does not implement a visual reset functionality.
- The restart option is available but can be visually improved with a more user-friendly interface.
- There is no level system or increasing speed as the game progresses.
- The aesthetics and overall design of the game can be enhanced for a more appealing experience.
- A more elaborate start and end screen can be implemented.

## Installation Guide

To run this project on your computer, you'll need to install Node.js and a Node.js package manager like npm or Yarn. Then, you can follow these steps to set up your development environment:

### Clone the project:

    git clone https://github.com/diegomottadev/tetris-app.git
    
### Install dependencies:

    npm install

### Run the application

    npm run dev
    
### Check in your favorite browser

    http://127.0.0.1:5173/

## Snapshot

![image](https://github.com/diegomottadev/tetris-app/assets/64202326/b0b0fce5-b1d1-45ee-a5df-b9e7c31f4abb)

# Project Overview:

- The project follows an object-oriented structure with classes representing different game elements.
- It utilizes ES6 features such as classes, arrow functions, and template literals.
- The game loop in Game.js orchestrates the update and draw processes for continuous gameplay.
- The code seems to be organized, providing clear separation of concerns for different components.

## More details

### Block.js

- Class Definition (Block): represents a block in the game.
- Constructor initializes game-related properties and block dimensions.
- update method moves the block down if not stopped.
- draw method renders the block on the canvas.

### UI.js

- Class Definition (UI): manages the game's user interface.
- Constructor initializes UI properties such as message position and combo timer.
- update method updates the UI based on the game's combo state.
- drawScore method renders the score on the canvas.
- gameOver method renders the game over message.
- confirmReset method renders the reset confirmation.

### Shape.js

- Class Definition (Shape - extends Block): represents a shape composed of multiple blocks.
- Constructor generates a random shape, sets its color, and initializes its position.
- update method moves the shape down if not stopped.
- draw method renders the entire shape on the canvas.
- Additional methods handle shape manipulation (rotation, movement, etc.).

### Pieces.js

- Constant Definition (PIECES): defines various shapes as arrays of 0s and 1s.

### InputHandler.js

- Class Definition (InputHandler):
- Handles user input events.
- Listens for keydown and click events to trigger game actions (move, rotate, pause, etc.).

### Game.js
- Class Definition (Game): manages the game state, including the falling block, stopped blocks, and UI.
- Constructor initializes game properties such as width, height, and block size.
- update method handles game logic based on different states (reset, game over, paused).
- draw method renders the game elements on the canvas.
- Various methods handle game actions (move, drop, rotate, reset confirmation).
- Collision detection logic ensures proper block interaction.

# A challenge for you

If you want to challenge your algorithmic logic and use JavaScript, follow this prompt to develop a Tetris game using JavaScript with Vite:

### General Description:

Develop a Tetris game using JavaScript and the Vite build tool to facilitate development and dependency management. The game should follow the basic rules of Tetris, where pieces fall from the top of the screen, and the player must arrange them to complete rows and earn points.

## Specific Requirements:

### Project Structure:

- Use Vite to set up the project and manage dependencies.
- Divide the code into modules and classes for clear and maintainable organization.

### Game Elements:

- Implement a Block class representing individual blocks in the game.
- Create a Shape class that extends the Block class and represents different falling shapes.
- Define constants for different piece shapes using a matrix of 0s and 1s.

### Game Logic:

- Manage the game state with a main class named Game.
- Implement logic for pieces to fall, move, rotate, and stop when touching other pieces.
- Check for completed rows and update the player's score.

### User Interface (UI):

- Design a simple yet effective user interface to display the score, game messages, and any other relevant information.
- Add pause and restart functionalities.

### User Input:

- Handle user input to allow lateral movement, rotation, and pausing of the game.

### Optional Extras:

- Implement smooth animations for piece movement and rotation.
- Add visual and sound effects to enhance the player's experience.
- Provide configuration options, such as piece falling speed.
- Include support for mobile devices.
