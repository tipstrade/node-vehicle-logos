const fs = require("fs");
const makes = require("./assets/makes.json");

console.log(`Found ${Object.keys(makes).length} makes.`);
console.log("Building makes...");

const makesTs = `import { VehicleMake } from "./types";

export const VehicleMakes: ReadonlyArray<Readonly<VehicleMake>> = ${JSON.stringify(makes)};`;
fs.writeFileSync("./src/makes.ts", makesTs, "utf-8");
