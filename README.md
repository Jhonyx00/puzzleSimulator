# puzzleSimulator

A simple and interactive 3x3 Cube simulator built with pure HTML, CSS, and JavaScript -- no frameworks or libraries required.
Freely explore, scramble and solve a virtual cube using keyboard controls (touch controls coming soon).


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ae6e22f2-9646-4e32-a331-013779563238" />

<img width="620" alt="Screenshot 2025-07-26 155238" src="https://github.com/user-attachments/assets/de6be3a5-270f-4dab-bed4-5f7fdc0f4008" />

<img width="369" alt="responsivede_design" src="https://github.com/user-attachments/assets/50c9da8f-b9b1-47cc-a4b1-5c11f9468927" />

## Features

- Adjustable cube size
- Smooth animations for layer rotations
- Customizable cube skin and base color
- Rotate the cube with mouse **drag or touch input**
- Responsive design for desktop and mobile devices
- Saves user preferences using localStorage (skin, base color, size, etc)

## Usage

- **Rotate the entire cube:** Click and drag anywhere on the white background to freely rotate the cube in 3D space.
- **Rotate layers using the keyboard:** Use the following keys to rotate specific layers of the cube:
- **U**: Upper layer
- **L**: Left layer
- **R**: Right layer
- **B**: Back layer
- **F**: Front layer
- **D**: Down layer
- **M**: Middle layer (between L and R)
- **E**: Equatorial layer (between U and D)
- **S**: Standing layer (between F and B)

- **Rotation direction:**
  Press a key to rotate the corresponding layer **clockwise**.
  Hold **Shift** while pressing the key to rotate the layer **counterclockwise**.

- **Reset the cube:**
  Click the **Reset** button on the screen to return the cube to its solved state.
- **Scramble the cube:**
  Click the **Scramble** button on the screen randomly shuffle the cube.

## Roadmap

- [x] Basic cube simulation with 3D rotation
- [x] Keyboard controls support 
- [ ] Touch interactions for mobile devices
- [ ] Timer functionality

## Technology Used

- HTML
- CSS
- JavaScript

## Author

Jhonatan Reyes - [@Jhonyx00](https://github.com/Jhonyx00)

## License

This project is licensed under the Creative Commons Attribution-NonComercial 4.0 International License.
See the [LICENSE](LICENSE) file for details.
