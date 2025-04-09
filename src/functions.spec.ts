import { expect } from "chai";
import { findMake } from "../src/functions";
import { VehicleMakes } from "../src/makes";
import { VehicleMake } from "../src/types";

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

      expect(found, "BMW returns defined result").to.not.be.undefined;
      expect(found?.name, "BMW name is valid").to.equal("BMW");
      expect(findMake("XXXXX", VehicleMakes), "Not found returns undefined").to.be.undefined;
    });

    it("not using match", () => {
      expect(findMake("2020 BMW i8", VehicleMakes), "Doesn't find partial using full match").to.be.undefined;
    });

    it("using 'full' match", () => {
      expect(findMake("Lada", MAKES, "full"), "Doesn't find Lada").to.be.undefined; // Not found
      expect(findMake("BMW i8", MAKES), "Doesn't find partial using full match").to.be.undefined;
      expect(findMake("Volkswagen", MAKES, "full"), "Finds Volkswagen").to.equal(VW); // Using name
      expect(findMake("VW", MAKES, "full"), "Finds Volkswgen using alias").to.equal(VW); // Using alt name
      expect(findMake("ac", MAKES, "full"), "Finds AC").to.equal(AC); // Lower case
      expect(findMake("AC", MAKES, "full"), "Finds AC").to.equal(AC); // Upper case
    });

    it("using 'contains' match", () => {
      expect(findMake("A Lada Riva", MAKES, "contains"), "Doesn't find Lada").to.be.undefined; // Not found
      expect(findMake("A Volkswagen Golf", MAKES, "contains"), "Finds Volkswagen").to.equal(VW); // Using name
      expect(findMake("A VW Golf", MAKES, "contains"), "Finds Volkswagen using alias").to.equal(VW); // Using alt name
      expect(findMake("AC", MAKES, "contains"), "Finds AC").to.equal(AC);
      expect(findMake("A cadillac escalade", MAKES, "contains"), "Finds AC").to.equal(CADILLAC); // Matches Cadillac even though the AC is first available
    });

    it("using 'start' match", () => {
      expect(findMake("Lada Riva", MAKES, "start"), "Doesn't find Lada").to.be.undefined; // Not found
      expect(findMake("2020 BMW", MAKES), "Doesn't find partial using full match").to.be.undefined;
      expect(findMake("Volkswagen Golf", MAKES, "start"), "Finds Volkswagen").to.equal(VW); // Using name
      expect(findMake("VW Golf", MAKES, "start"), "Finds Volkswagen using alias").to.equal(VW); // Using alt name  
      expect(findMake("AC", MAKES, "start"), "Finds AC").to.equal(AC);
      expect(findMake("cadillac escalade", MAKES, "start"), "Finds AC").to.equal(CADILLAC);
    });

    it("using 'end' match", () => {
      expect(findMake("My Lada", MAKES, "end"), "Doesn't find Lada").to.be.undefined; // Not found
      expect(findMake("BMW i8", MAKES), "Doesn't find partial using full match").to.be.undefined;
      expect(findMake("My Volkswagen", MAKES, "end"), "Finds Volkswagen").to.equal(VW); // Using name
      expect(findMake("My VW", MAKES, "end"), "Finds Volkswagen using alias").to.equal(VW); // Using alt name  
      expect(findMake("AC", MAKES, "end"), "Finds AC").to.equal(AC);
      expect(findMake("My cadillac", MAKES, "end"), "Finds AC").to.equal(CADILLAC); // Matches Cadillac even though the AC is first available
    });
  });
});
