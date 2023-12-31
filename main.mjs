import fs from 'fs';

const points = process.argv[2] || 1000;
const step = 2 * Math.PI / points;

function pushValue(table, value)
{
    if (Number.isInteger(value)) table.push(value + ".f");
    else table.push(value + "f");
}

const sinTable = [];

for (let i = 0; i < points; i++)
{
    pushValue(sinTable, Math.sin(i * step));
}

// Save them in a file LookupTable.h with the step size
fs.writeFileSync('out/LookupTableSin.h', `#pragma once\n\n` +
    `constexpr const float SinStep = ${step}f;\n` +
    `constexpr const size_t SinSize = ${points};\n\n` +
    `constexpr const float SinTable[SinSize] = { ${sinTable.join(', ')} };`);

// How to generate: `npm start <points or leave it empty>` in the terminal