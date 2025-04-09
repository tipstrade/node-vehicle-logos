import { expect } from "chai";
import { existsSync } from "fs";
import { join } from "path";
import rawMakes from "../assets/makes.json";
import { VehicleMakes } from "../src/makes";

const validString = /^(?!\s)(?!.*\s\s).*(?<!\s)$/; // Any characters, but cannot start or end with whitespace. No double whitespace
const validLogo = /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/ // lowercase, numbers or hyphens, cannot start or end with hyphens. No double hyphens

const assetExists = (value: string) => {
  const path = join("assets", `${value}.svg`);
  const exists = existsSync(path);

  return exists;
}

describe("VehicleMakes", () => {
  it("has makes", () => {
    expect(Array.isArray(VehicleMakes), "VehicleMakes is an array").to.be.true;
    expect(VehicleMakes.length, "VehicleMakes has at least 1 item").to.be.greaterThan(1);

    VehicleMakes.forEach((x, index) => {
      expect(x, `VehicleMakes[${index}] is defined`).to.not.be.undefined;
      expect(x, `VehicleMakes[${index}] is an object`).to.be.a.string;
    });
  });

  it("are compileed", () => {
    expect(VehicleMakes).to.deep.equal(rawMakes);
  });

  VehicleMakes.forEach((value, index) => {
    describe(`[${index}](${value.name})`, () => {
      it("name is valid", () => {
        expect(value.name, "name is a string").to.be.a.string;
        expect(value.name, "name is valid").to.match(validString);
      });

      it("logo is valid", () => {
        const exists = assetExists(value.logo);

        expect(value.logo, "logo is a string").to.be.a.string;
        expect(value.logo, "logo is valid").to.match(validLogo);
        expect(exists, "logo SVG exists").to.be.true;
      });

      it("shortLogo is valid", () => {
        if (value.shortLogo === undefined) {
          expect(value.shortLogo, "shortLogo is undefined").to.be.a.string;
        } else {
          const exists = assetExists(value.shortLogo);

          expect(value.shortLogo, "shortLogo is a string").to.be.a.string;
          expect(value.shortLogo, "shortLogo is valid").to.match(validLogo);
          expect(exists, "shortLogo SVG exists").to.be.true;
        }
      });

      it("altNames are valid", () => {
        if (value.altNames === undefined) {
          expect(value.altNames, "altNames is undefined").to.be.a.string;
        } else {
          expect(Array.isArray(value.altNames), "shortNames is an array").to.be.true;
          expect(value.altNames.length, "shortNames has at least one item").to.be.greaterThan(0);

          value.altNames.forEach((altName, index) => {
            expect(altName, `altNames[${index}] is a string`).to.be.a.string;
            expect(altName, `altNames[${index}] is valid`).to.match(validString);
          });
        }
      });
    });
  });
});
