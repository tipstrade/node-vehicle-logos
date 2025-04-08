# node-vehicle-logos
A collection of vehicle manufacturer logos. All logos are registered trademarks of their respective owners.

# Installation

``` bash
npm i node-vehicle-logos
```

# Logo Assets
The [assets](/assets) directory contains SVGs of all the available logos. There is also [makes.json](/assets/makes.json) file which contains the definition for each make, including possible alternative names.
In some cases where a logo may contain text, there may also be _"short"_ version. For example
## Standard vs Short
| rolls-royce | rolls-royce-short |
| ----------| --------------- |
| ![rolls-royce](/assets/rolls-royce.svg) | ![rolls-royce-short](/assets/rolls-royce-short.svg) |

## Additional assets
In addition, there are some SVG assets for generic vehicle types:
- [bikes.svg](/assets/bikes.svg)
- [commercial.svg](/assets/commercial.svg)
- [vehicles.svg](/assets/vehicles.svg)

# Typescript library
The package also includes some typescript helpers and constants:
## VehicleMakes
This is an the list of definitions from [makes.json](/assets/makes.json) exported as a `ReadonlyArray<Readonly<VehicleMake>>`.

## Functions
### findMake
`findMake` is a function that can take a string and find the best matching make using the `VehicleMake.name` and `VehicleMake.altNames`. It can also take:
- an optional `MatchType` property to specify what kind of match to use. Defaults to `full` if not specified
- an optional `VehicleMake` list instead of using the built-in list

##### Usage
```ts
import { findMake, MatchType, VehicleMake } from "node-vehicle-logos";

const bmw1 = findMake("BMW");
const bmw2 = findMake("2020 BMW i8", "contains");
const bmw3 = findMake("BMW i8", "start");
const bmw4 = findMake("2020 BMW", "end");

const notFound = findMake("BMW i8"); // Returns undefined as 'BMW i8' is not a full match
```
