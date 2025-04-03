import { VehicleMakes } from "./makes";
import { MatchType, VehicleMake } from "./types";

/**
 * Finds the make that best matches the specified name.
 * @param text The text to search
 * @param [match="full"] The type of match to execute
 * @param makes The optional list of VehicleMake objects, if not provided the internal list is used
 * @returns The VehicleMake if found, or undefined
 */
export function findMake(text: string, match: MatchType = "full", makes?: Iterable<Readonly<VehicleMake>>): Readonly<VehicleMake> | undefined {
  text = text.toLocaleUpperCase();
  makes ??= VehicleMakes;

  const allMatches = Array.from(makes).reduce((accum, make) => {
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

      if (found) {
        accum.set(name, make);
      }
    });

    return accum;
  }, new Map<string, Readonly<VehicleMake>>);

  if (!allMatches.size) {
    return undefined;
  }

  const longestMatch = [...allMatches.keys()].sort((a, b) => b.length - a.length)[0];

  return allMatches.get(longestMatch);
}
