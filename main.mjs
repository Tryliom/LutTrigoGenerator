/**
 * @fileoverview Create lookup tables for cos, sin, and tan
 * @author Tryliom
 */

import fs from 'fs';

const points = process.argv[2] || 1000;
const step = 2 * Math.PI / points;

function pushValue(table, value)
{
    if (Number.isInteger(value)) table.push(value + ".f");
    else table.push(value + "f");
}

/**
 * Create a lookup table for cos/sin in intervals of points
 * @param {function} mathFunc - math function to create table for
 * @returns {string[]} cosTable - lookup table for cos or sin
 */
function createTable(mathFunc)
{
    const table = [];

    for (let i = 0; i < points; i++)
    {
        pushValue(table, mathFunc(i * step));
    }

    return table;
}

/**
 * Create a lookup table for tan in intervals of points
 * @returns {string[]} tanTable - lookup table for tan
 */
function createTanTable()
{
    const table = [];
    const tanStep = Math.PI / points;
    let offset = -Math.PI / 2 + tanStep / 2;

    for (let i = 0; i < points; i++)
    {
        pushValue(table, Math.tan(offset + i * tanStep));
    }

    return table;
}

// Create lookup tables for cos, sin, and tan
const cosTable = createTable(Math.cos);
const sinTable = createTable(Math.sin);
const tanTable = createTanTable();

// Save them in a file LookupTable.h with the step size
fs.writeFileSync('out/LookupTable.h', `#pragma once\n\n` +
    `constexpr const float step = ${step}f;\n` +
    `constexpr const size_t size = ${points};\n\n` +
    `constexpr const float cosTable[size] = { ${cosTable.join(', ')} };\n` +
    `constexpr const float sinTable[size] = { ${sinTable.join(', ')} };\n` +
    `constexpr const float tanTable[size] = { ${tanTable.join(', ')} };`);

// How to generate: `npm start <points or leave it empty>` in the terminal