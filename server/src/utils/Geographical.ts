export const getDistance = (
  pinPoint: { latitude: number; longitude: number },
  currentLocation: { latitude: number; longitude: number },
  unit: "km" | "mi" = "mi",
) => {
  const R = unit === "mi" ? 3958.8 : 6371; // Earth radius
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(pinPoint.latitude - currentLocation.latitude);
  const dLon = toRad(pinPoint.longitude - currentLocation.longitude);

  const lat1 = toRad(currentLocation.latitude);
  const lat2 = toRad(pinPoint.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// export const getDistanceInMiles = (pinPoint: Coordinates, currentLocation: Coordinates) => {
//
//
// }
