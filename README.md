# Tetris on Javascript pure

This project showcases a simple implementation of the classic game Tetris using JavaScript and the HTML <canvas> element. Tetris is a puzzle game that challenges player coordination and mental agility by manipulating falling blocks to complete lines on the game board.

In this project, Vite was utilized as the build tool. Vite is a modern front-end build tool known for its speed and developer-friendly features. 

It offers a fast development server with hot module replacement, supports modern JavaScript features, and provides efficient dependency management. The use of Vite enhances the development experience by enabling quick feedback loops during coding and optimizing the build process for speed.

## Key Features

Canvas: utilizes the HTML5 <canvas> element for real-time graphics rendering.
JavaScript programming: Learn fundamental JavaScript programming concepts such as array manipulation, flow control, and event handling.
Game Logic: implements core Tetris logic, including piece falling, rotation, line clearing, and game over detection.

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

## Snapshot

![image](https://github.com/diegomottadev/tetris-app/assets/64202326/b0b0fce5-b1d1-45ee-a5df-b9e7c31f4abb)
