import { writeFileSync } from "fs";
import makes from "./assets/makes.json";

console.log(`Found ${Object.keys(makes).length} makes.`);
console.log("Building makes...");

const makesTs = `import { VehicleMake } from "./types";

export const VehicleMakes: ReadonlyArray<Readonly<VehicleMake>> = ${JSON.stringify(makes)};`;
writeFileSync("./src/makes.ts", makesTs, "utf-8");
