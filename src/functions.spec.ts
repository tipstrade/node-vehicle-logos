import { findMake } from "./functions";
import { VehicleMakes } from "./makes";
import { VehicleMake } from "./types";

const AC: VehicleMake = {
  "name": "AC",
  "logo": "ac",
};
const CADILLAC: VehicleMake = {
  "name": "Cadillac",
  "logo": "cadillac",
};
const VW: VehicleMake = {
  "name": "Volkswagen",
  "logo": "volkswagen",
  "altNames": [
    "VW",
  ],
};
const MAKES = [AC, CADILLAC, VW];

describe("functions", () => {
  describe("findMake", () => {
    it("using built in makes", () => {
      const found = findMake("BMW", VehicleMakes);

      expect(found).withContext("BMW returns defined result").toBeDefined();
      expect(found?.name).withContext("BMW name is valid").toBe("BMW");
      expect(findMake("XXXXX", VehicleMakes)).withContext("Not found returns undefined").toBeUndefined();
    });

    it("not using match", () => {
      expect(findMake("2020 BMW i8", VehicleMakes)).withContext("Doesn't find partial using full match").toBeUndefined();
    });

    it("using 'full' match", () => {
      expect(findMake("Lada", MAKES, "full")).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("BMW i8", MAKES)).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("Volkswagen", MAKES, "full")).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("VW", MAKES, "full")).withContext("Finds Volkswgen using alias").toEqual(VW); // Using alt name
      expect(findMake("ac", MAKES, "full")).withContext("Finds AC").toEqual(AC); // Lower case
      expect(findMake("AC", MAKES, "full")).withContext("Finds AC").toEqual(AC); // Upper case
    });

    it("using 'contains' match", () => {
      expect(findMake("A Lada Riva", MAKES, "contains")).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("A Volkswagen Golf", MAKES, "contains")).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("A VW Golf", MAKES, "contains")).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name
      expect(findMake("AC", MAKES, "contains")).withContext("Finds AC").toEqual(AC);
      expect(findMake("A cadillac escalade", MAKES, "contains")).withContext("Finds AC").toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });

    it("using 'start' match", () => {
      expect(findMake("Lada Riva", MAKES, "start")).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("2020 BMW", MAKES)).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("Volkswagen Golf", MAKES, "start")).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("VW Golf", MAKES, "start")).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name  
      expect(findMake("AC", MAKES, "start")).withContext("Finds AC").toEqual(AC);
      expect(findMake("cadillac escalade", MAKES, "start")).withContext("Finds AC").toEqual(CADILLAC);
    });

    it("using 'end' match", () => {
      expect(findMake("My Lada", MAKES, "end")).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("BMW i8", MAKES)).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("My Volkswagen", MAKES, "end")).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("My VW", MAKES, "end")).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name  
      expect(findMake("AC", MAKES, "end")).withContext("Finds AC").toEqual(AC);
      expect(findMake("My cadillac", MAKES, "end")).withContext("Finds AC").toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });
  });
});
