import { findVehicle } from "./functions";
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
  describe("findVehicle", () => {
    it("using 'full' match works", () => {
      expect(findVehicle("Lada", "full", MAKES)).toBeUndefined(); // Not found
      expect(findVehicle("Volkswagen", "full", MAKES)).toEqual(VW); // Using name
      expect(findVehicle("VW", "full", MAKES)).toEqual(VW); // Using alt name
      expect(findVehicle("ac", "full", MAKES)).toEqual(AC); // Lower case
      expect(findVehicle("AC", "full", MAKES)).toEqual(AC); // Upper case
    });

    it("using 'contains' match works", () => {
      expect(findVehicle("A Lada Riva", "contains", MAKES)).toBeUndefined(); // Not found
      expect(findVehicle("A Volkswagen Golf", "contains", MAKES)).toEqual(VW); // Using name
      expect(findVehicle("A VW Golf", "contains", MAKES)).toEqual(VW); // Using alt name
      expect(findVehicle("AC", "contains", MAKES)).toEqual(AC);
      expect(findVehicle("A cadillac escalade", "contains", MAKES)).toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });

    it("using 'start' match works", () => {
      expect(findVehicle("Lada Riva", "start", MAKES)).toBeUndefined(); // Not found
      expect(findVehicle("Volkswagen Golf", "start", MAKES)).toEqual(VW); // Using name
      expect(findVehicle("VW Golf", "start", MAKES)).toEqual(VW); // Using alt name  
      expect(findVehicle("AC", "start", MAKES)).toEqual(AC);
      expect(findVehicle("cadillac escalade", "start", MAKES)).toEqual(CADILLAC);
    });

    it("using 'end' match works", () => {
      expect(findVehicle("My Lada", "end", MAKES)).toBeUndefined(); // Not found
      expect(findVehicle("My Volkswagen", "end", MAKES)).toEqual(VW); // Using name
      expect(findVehicle("My VW", "end", MAKES)).toEqual(VW); // Using alt name  
      expect(findVehicle("AC", "end", MAKES)).toEqual(AC);
      expect(findVehicle("My cadillac", "end", MAKES)).toEqual(CADILLAC); // Matches Cadillac even though the AC is first available
    });
  });
});
