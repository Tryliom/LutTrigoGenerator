import fs from 'fs';

// Make functions that create lookup tables for cos, sin, and tan
// Get args from the command line to set points
const points = process.argv[2] || 1000;
const step = 2 * Math.PI / points;

/**
 * Create a lookup table for cos/sin/tan in intervals of points degrees
 * @param {function} mathFunc - math function to create table for
 * @returns {float[]} cosTable - lookup table for cos or sin or tan
 */
function createTable(mathFunc)
{
    const table = [];

    for (let i = 0; i < points; i++)
    {
        table.push(mathFunc(i * step));
    }

    return table;
}

// Create lookup tables for cos, sin, and tan
const cosTable = createTable(Math.cos);
const sinTable = createTable(Math.sin);
const tanTable = createTable(Math.tan);

// Save them in a file LookupTable.h with the step size
fs.writeFileSync('out/LookupTable.h', `#pragma once\n\n` +
    `constexpr float step = ${step};\n` +
    `constexpr size_t size = ${points};\n\n` +
    `constexpr float cosTable[size] = { ${cosTable.join(', ')} };\n` +
    `constexpr float sinTable[size] = { ${sinTable.join(', ')} };\n` +
    `constexpr float tanTable[size] = { ${tanTable.join(', ')} };`);

// How to generate: `npm start <points or leave it empty>` in the terminal