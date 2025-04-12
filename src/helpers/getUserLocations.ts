export const getUserLocations = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    // sirve para observar la posicion del usuario en tiempo real
    // navigator.geolocation.watchPosition
    // sirve para obtener la posicion del usuario una sola vez
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        reject("Error getting location: " + error);
      }
    );
  });
};
