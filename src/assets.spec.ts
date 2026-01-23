import { expect } from "chai";
import { readdirSync } from "fs";
import { join } from "path";
import rawMakes from "../assets/makes.json";

// These are the allowed assets that don't trigger an orphaned test
const allowedAssets = ["makes.json", "bikes.svg", "camper.svg", "commercial.svg", "vehicles.svg", "sport-cars.svg"];

describe("assets", () => {
  it("has no orphaned assets", () => {
    const orphanedAssets = readdirSync(join("assets"))
      .filter((x) => !allowedAssets.includes(x))
      .map((fileName) => {
        fileName = fileName.replace(/\.svg$/, "");

        const found = rawMakes.find((x) => x.logo === fileName || x.shortLogo === fileName);

        return found ? null : fileName
      })
      .filter(Boolean)
      ;

    expect(
      orphanedAssets,
      `Orphaned assets found:\n${orphanedAssets.map((x) => `- assets/${x}`).join("\n")}\n`
    ).to.be.empty;
  });
});
