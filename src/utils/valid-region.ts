export function validRegion(region: string): boolean {
  const regions = [
    "BR1",
    "EUN1",
    "EUW1",
    "JP1",
    "KR",
    "KR",
    "LA1",
    "LA2",
    "ME1",
    "NA1",
    "OC1",
    "RU",
    "SG2",
    "TR1",
    "TW2",
    "VN2",
    "americas",
    "europe",
    "korea",
  ];

  if (regions.includes(region)) {
    return true;
  } else {
    return false;
  }
}
