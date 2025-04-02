import { existsSync } from "fs";
import { join } from "path";
import { VehicleMakes } from "./makes";

const validString = /^[^\s].*[^\s]$/;

const assetExists = (value: string) => {
  const path = join("assets", `${value}.svg`);
  const exists = existsSync(path);

  return exists;
}

describe("VehicleMakes", () => {
  it("Has Makes", () => {
    expect(Array.isArray(VehicleMakes)).toBeTrue();
    expect(VehicleMakes.length).toBeGreaterThan(0);

    VehicleMakes.forEach((x) => {
      expect(x).toBeDefined();
      expect(x).toBeInstanceOf(Object);
    });
  });

  VehicleMakes.forEach((value) => {
    describe(`VehicleMakes['${value.name}']`, () => {
      it("Name is valid", () => {
        expect(value.name).toBeInstanceOf(String);
        expect(value.name).toMatch(validString);
      });

      it("Logo is valid", () => {
        const exists = assetExists(value.logo);

        expect(value.logo).toBeInstanceOf(String);
        expect(value.logo).toMatch(validString);
        expect(exists).toBeTrue();
      });

      it("Short Logo is valid", () => {
        if (value.shortLogo === undefined) {
          expect(value.shortLogo).toBeUndefined();
        } else {
          const exists = assetExists(value.shortLogo);

          expect(value.shortLogo).toBeInstanceOf(String);
          expect(value.shortLogo).toMatch(validString);
          expect(exists).toBeTrue();
        }
      });

      it("Alt Names are valid", () => {
        if (value.altNames === undefined) {
          expect(value.altNames).toBeUndefined();
        } else {
          expect(Array.isArray(value.altNames)).toBeTrue();
          expect(value.altNames.length).toBeGreaterThan(0);

          value.altNames.forEach((altName) => {
            expect(altName).toBeInstanceOf(String);
            expect(altName).toMatch(validString);
          });
        }
      });
    });
  });
});
