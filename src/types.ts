/** Represents a vehicle make record. */
export interface VehicleMake {
  /** The name of the make. */
  name: string;
  /** The optional list of alt names. */
  altNames?: string[];
  /** The name of the logo asset for the make. */
  logo: string;
  /** The name of the short logo asset for the make. */
  shortLogo?: string;
}
