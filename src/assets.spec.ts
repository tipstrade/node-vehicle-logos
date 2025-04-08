import { readdirSync } from "fs";
import { join } from "path";
import { VehicleMakes } from "./makes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rawMakes = require("../assets/makes.json") as typeof VehicleMakes;

// These are the allowed assets that don't trigger an orphaned test
const allowedAssets = ["makes.json", "bikes.svg", "commercial.svg", "vehicles.svg"];

describe("assets", () => {
  it("has no orphaned assets", () => {
    readdirSync(join("assets"))
      .filter((x) => !allowedAssets.includes(x))
      .forEach((fileName) => {
        fileName = fileName.replace(/\.svg$/, "");

        const found = rawMakes.find((x) => x.logo === fileName || x.shortLogo === fileName);

        expect(found).withContext(`'assets/${fileName}.svg' exists`).toBeDefined();
      })
      ;
  });
});
