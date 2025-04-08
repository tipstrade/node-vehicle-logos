import { existsSync } from "fs";
import { join } from "path";
// import rawMakes from "../assets/makes.json";
import { VehicleMakes } from "./makes";

const rawMakes = (require as unknown as (path: string) => typeof VehicleMakes)("../assets/makes.json");

const validString = /^(?!\s)(?!.*\s\s).*(?<!\s)$/; // Any characters, but cannot start or end with whitespace. No double whitespace
const validLogo = /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/ // lowercase, numbers or hyphens, cannot start or end with hyphens. No double hyphens

const assetExists = (value: string) => {
  const path = join("assets", `${value}.svg`);
  const exists = existsSync(path);

  return exists;
}

describe("VehicleMakes", () => {
  it("has makes", () => {
    expect(Array.isArray(VehicleMakes)).withContext("VehicleMakes is an array").toBeTrue();
    expect(VehicleMakes.length).withContext("VehicleMakes has at least 1 item").toBeGreaterThan(0);

    VehicleMakes.forEach((x, index) => {
      expect(x).withContext(`VehicleMakes[${index}] is defined`).toBeDefined();
      expect(x).withContext(`VehicleMakes[${index}] is an object`).toBeInstanceOf(Object);
    });
  });

  it("are compileed", () => {
    expect(VehicleMakes).toEqual(rawMakes);
  });

  VehicleMakes.forEach((value, index) => {
    describe(`[${index}](${value.name})`, () => {
      it("name is valid", () => {
        expect(value.name).withContext("name is a string").toBeInstanceOf(String);
        expect(value.name).withContext("name is valid").toMatch(validString);
      });

      it("logo is valid", () => {
        const exists = assetExists(value.logo);

        expect(value.logo).withContext("logo is a string").toBeInstanceOf(String);
        expect(value.logo).withContext("logo is valid").toMatch(validLogo);
        expect(exists).withContext("logo SVG exists").toBeTrue();
      });

      it("shortLogo is valid", () => {
        if (value.shortLogo === undefined) {
          expect(value.shortLogo).withContext("shortLogo is undefined").toBeUndefined();
        } else {
          const exists = assetExists(value.shortLogo);

          expect(value.shortLogo).withContext("shortLogo is a string").toBeInstanceOf(String);
          expect(value.shortLogo).withContext("shortLogo is valid").toMatch(validLogo);
          expect(exists).withContext("shortLogo SVG exists").toBeTrue();
        }
      });

      it("altNames are valid", () => {
        if (value.altNames === undefined) {
          expect(value.altNames).withContext("altNames is undefined").toBeUndefined();
        } else {
          expect(Array.isArray(value.altNames)).withContext("shortNames is an array").toBeTrue();
          expect(value.altNames.length).withContext("shortNames has at least one item").toBeGreaterThan(0);

          value.altNames.forEach((altName, index) => {
            expect(altName).withContext(`altNames[${index}] is a string`).toBeInstanceOf(String);
            expect(altName).withContext(`altNames[${index}] is valid`).toMatch(validString);
          });
        }
      });
    });
  });
});
