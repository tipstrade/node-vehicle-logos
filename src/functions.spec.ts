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

      expect(found).toBeDefined();
      expect(found?.name).toBe("BMW");
    });

    it("using 'full' match works", () => {
      expect(findMake("Lada", "full", MAKES)).toBeUndefined(); // Not found
      expect(findMake("Volkswagen", "full", MAKES)).toEqual(VW); // Using name
      expect(findMake("VW", "full", MAKES)).toEqual(VW); // Using alt name
      expect(findMake("ac", "full", MAKES)).toEqual(AC); // Lower case
      expect(findMake("AC", "full", MAKES)).toEqual(AC); // Upper case
    });

    it("using 'contains' match works", () => {
      expect(findMake("A Lada Riva", "contains", MAKES)).toBeUndefined(); // Not found
      expect(findMake("A Volkswagen Golf", "contains", MAKES)).toEqual(VW); // Using name
      expect(findMake("A VW Golf", "contains", MAKES)).toEqual(VW); // Using alt name
      expect(findMake("AC", "contains", MAKES)).toEqual(AC);
      expect(findMake("A cadillac escalade", "contains", MAKES)).toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });

    it("using 'start' match works", () => {
      expect(findMake("Lada Riva", "start", MAKES)).toBeUndefined(); // Not found
      expect(findMake("Volkswagen Golf", "start", MAKES)).toEqual(VW); // Using name
      expect(findMake("VW Golf", "start", MAKES)).toEqual(VW); // Using alt name  
      expect(findMake("AC", "start", MAKES)).toEqual(AC);
      expect(findMake("cadillac escalade", "start", MAKES)).toEqual(CADILLAC);
    });

    it("using 'end' match works", () => {
      expect(findMake("My Lada", "end", MAKES)).toBeUndefined(); // Not found
      expect(findMake("My Volkswagen", "end", MAKES)).toEqual(VW); // Using name
      expect(findMake("My VW", "end", MAKES)).toEqual(VW); // Using alt name  
      expect(findMake("AC", "end", MAKES)).toEqual(AC);
      expect(findMake("My cadillac", "end", MAKES)).toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });
  });
});
