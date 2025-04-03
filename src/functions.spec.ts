import { findMake } from "./functions";
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
      const found = findMake("BMW");

      expect(found).withContext("BMW returns defined result").toBeDefined();
      expect(found?.name).withContext("BMW name is valid").toBe("BMW");
      expect(findMake("XXXXX")).withContext("Not found returns undefined").toBeUndefined();
    });

    it("not using match", () => {
      expect(findMake("2020 BMW i8")).withContext("Doesn't find partial using full match").toBeUndefined();
    });

    it("using 'full' match", () => {
      expect(findMake("Lada", "full", MAKES)).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("BMW i8")).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("Volkswagen", "full", MAKES)).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("VW", "full", MAKES)).withContext("Finds Volkswgen using alias").toEqual(VW); // Using alt name
      expect(findMake("ac", "full", MAKES)).withContext("Finds AC").toEqual(AC); // Lower case
      expect(findMake("AC", "full", MAKES)).withContext("Finds AC").toEqual(AC); // Upper case
    });

    it("using 'contains' match", () => {
      expect(findMake("A Lada Riva", "contains", MAKES)).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("A Volkswagen Golf", "contains", MAKES)).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("A VW Golf", "contains", MAKES)).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name
      expect(findMake("AC", "contains", MAKES)).withContext("Finds AC").toEqual(AC);
      expect(findMake("A cadillac escalade", "contains", MAKES)).withContext("Finds AC").toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });

    it("using 'start' match", () => {
      expect(findMake("Lada Riva", "start", MAKES)).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("2020 BMW")).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("Volkswagen Golf", "start", MAKES)).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("VW Golf", "start", MAKES)).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name  
      expect(findMake("AC", "start", MAKES)).withContext("Finds AC").toEqual(AC);
      expect(findMake("cadillac escalade", "start", MAKES)).withContext("Finds AC").toEqual(CADILLAC);
    });

    it("using 'end' match", () => {
      expect(findMake("My Lada", "end", MAKES)).withContext("Doesn't find Lada").toBeUndefined(); // Not found
      expect(findMake("BMW i8")).withContext("Doesn't find partial using full match").toBeUndefined();
      expect(findMake("My Volkswagen", "end", MAKES)).withContext("Finds Volkswagen").toEqual(VW); // Using name
      expect(findMake("My VW", "end", MAKES)).withContext("Finds Volkswagen using alias").toEqual(VW); // Using alt name  
      expect(findMake("AC", "end", MAKES)).withContext("Finds AC").toEqual(AC);
      expect(findMake("My cadillac", "end", MAKES)).withContext("Finds AC").toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });
  });
});
