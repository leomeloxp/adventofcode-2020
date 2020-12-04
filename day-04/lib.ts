export const northPoleCredentialsFields: (keyof NorthPoleCredential)[] = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
];
export const passportFields: (keyof Passport)[] = [...northPoleCredentialsFields, 'cid'];

export type Passport = NorthPoleCredential & {
  /** Country ID */
  cid: string;
};

export type NorthPoleCredential = {
  /** Birth Year */
  byr: string;
  /** Issue Year */
  iyr: string;
  /** Expiration Year */
  eyr: string;
  /**(Height */
  hgt: string;
  /** Hair Color */
  hcl: string;
  /** Eye Color */
  ecl: string;
  /** Passport ID */
  pid: string;
};

export const extractPassportData = (input: string): Partial<Passport>[] => {
  const passportStrings = input.split('\n\n');
  const passports = passportStrings.map(entry =>
    Object.fromEntries(
      entry.split(/\s/gm).map(field => {
        const [key, value] = field.split(':');
        return [key, value];
      })
    )
  );
  return passports;
};

export const isPassport = (idDocument: Partial<Passport>): idDocument is Passport => {
  return passportFields.every((field: keyof Passport) => idDocument[field]);
};

export const isNorthPoleCredentials = (idDocument: Partial<NorthPoleCredential>): idDocument is NorthPoleCredential => {
  return northPoleCredentialsFields.every((field: keyof NorthPoleCredential) => idDocument[field]);
};

export const isValidByr = (value: string): boolean => {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  const byr = parseInt(value, 10);
  return byr >= 1920 && byr <= 2002;
};
export const isValidIyr = (value: string): boolean => {
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  const iyr = parseInt(value, 10);
  return iyr >= 2010 && iyr <= 2020;
};
export const isValidEyr = (value: string): boolean => {
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  const eyr = parseInt(value, 10);
  return eyr >= 2020 && eyr <= 2030;
};
export const isValidHgt = (value: string): boolean => {
  // hgt (Height) - a number followed by either cm or in:
  //     If cm, the number must be at least 150 and at most 193.
  //     If in, the number must be at least 59 and at most 76.
  const heightRegex = /(?<hgt>[0-9]+)(?<hgtUnit>[a-z]{2})/;
  const hgt = parseInt(heightRegex.exec(value)?.groups?.hgt || '0', 10);
  const hgtUnit = heightRegex.exec(value)?.groups?.hgtUnit;
  return (hgtUnit === 'cm' && hgt >= 150 && hgt <= 193) || (hgtUnit === 'in' && hgt >= 59 && hgt <= 76);
};
export const isValidHcl = (value: string): boolean => {
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  return /^#[a-f0-9]{6}/.test(value);
};
export const isValidEcl = (value: string): boolean => {
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
};
export const isValidPid = (value: string): boolean => {
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  const pid = value.replace(/[^0-9]/g, '');
  return pid.length === 9;
};

export const isValidNorthPoleCredentials = (northPoleCredential: NorthPoleCredential): boolean => {
  return (
    isValidByr(northPoleCredential.byr) &&
    isValidIyr(northPoleCredential.iyr) &&
    isValidEyr(northPoleCredential.eyr) &&
    isValidHgt(northPoleCredential.hgt) &&
    isValidHcl(northPoleCredential.hcl) &&
    isValidEcl(northPoleCredential.ecl) &&
    isValidPid(northPoleCredential.pid)
  );
};
