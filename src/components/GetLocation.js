// eslint-disable-next-line no-unused-vars
const geolocation = (function() {
    function getLocation() {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error("La geolocalización no está disponible."));
        }
      });
    }
    
    return {
      async getCurrentLocation() {
        try {
          const position = await getLocation();
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          return { latitude, longitude };
        } catch (error) {
          console.error(error);
        }
      }
    };
  })();

  export default geolocation