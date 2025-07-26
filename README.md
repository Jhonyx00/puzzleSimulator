# puzzleSimulator

A simple and interactive 3x3 Cube simulator built with pure HTML, CSS and JavaScript -- no frameworks or libraries required.
This simulator lets you freely explore, scramble and solve a virtual cube with intiutive controls an customizable appearance.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ae6e22f2-9646-4e32-a331-013779563238" />

<img width="539" height="404" alt="responsivede_design" src="https://github.com/user-attachments/assets/3dbc6b68-6ce9-4486-ae3a-8ae989acceba" />

## Features

- Rotate the cube with mouse input
- Smooth animations for layer rotations
- Responsive design for desktop and mobile devices
- Customizable cube skin and base color
- Adjustable cube size
- Saves user preferences using localStorage (skin, base color, size, etc.)

## Usage

- **Rotate the entire cube:** Click and drag anywhere on the white background to freely rotate the cube in 3D space.
- **Rotate layers using keyboard:** Use the following keys to rotate specific layers of the cube:
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
  Press the desired key to rotate the layer **clockwise**.
  Hold **Shift** while pressing the key to rotate the layer **counter-clockwise** (anticlockwise).

- **Reset the cube:**
  Click the **Reset** button on the screen to return the cube to its solved state.
- **Scramble the cube:**
  Click the **Scramble** button on the screeen to shuffle the cube ramdomly.

## Roadmap

- [x] Basic cube simulation with 3D rotation
- [x] Add support for keyboard controls 
- [ ] Add touch interactions for mobile devices
- [ ] Add timer

## Technology Used

- HTML
- CSS
- JavaScript

## Author

Jhonatan Reyes - [@Jhonyx00](https://github.com/Jhonyx00)

## License

This project is licensed under the Creative Commons Attribution-NonComercial 4.0 International License.
See the [LICENSE](LICENSE) file for details.
