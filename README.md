# Look-up table generator for trigonometric functions

## Description

This program generates a look-up table for trigonometric functions. 
The look-up table is used to calculate the tan, sin and cos of an angle in the range [0, 2π] with a resolution given by the number of points. 
The look-up table is stored in a file called `LookupTable.h` in `out/` folder and can be included in a C program.

## Usage

You need npm and nodejs to run this program. Can be installed all-in-one with [nodejs](https://nodejs.org/en/download/).

To install the dependencies, run:

```bash
npm install
```

To run the program, run:

```bash
npm start <number of points, default: 1000>
```

## Example

```bash
npm start 2500
```

This will generate a look-up table with 2500 points and store it in `out/LookupTable.h`.
