import { MatchType, VehicleMake } from "./types";

/**
 * Finds the make that best matches the specified name in the provided list of makes.
 * @param text The text to search
 * @param makes The list of VehicleMake objects. An internal list is provided by {@link VehicleMakes}
 * @param [match="full"] The type of match to execute
 * @returns The VehicleMake if found, or undefined
 */
export function findMake(text: string, makes: Iterable<Readonly<VehicleMake>>, match: MatchType = "full"): Readonly<VehicleMake> | undefined {
  text = text.toLocaleUpperCase();

  // Instead of using reduce or keeping track of all matches, track the best match only
  const bestMatch = {
    name: "",
    make: undefined as Readonly<VehicleMake> | undefined,
  };

  for (const make of makes) {
    const allNames = [
      make.name.toLocaleUpperCase(),
      ...make.altNames?.map((x) => x.toLocaleUpperCase()) ?? [],
    ];

    allNames.forEach((name) => {
      const found = (match === "full" && text === name)
        || (match === "contains" && text.includes(name))
        || (match === "end" && text.endsWith(name))
        || (match === "start" && text.startsWith(name))
        ;

      if (found && name.length > bestMatch.name.length) {
        bestMatch.name = name;
        bestMatch.make = make;
      }
    });
  }

  return bestMatch.make;
}
