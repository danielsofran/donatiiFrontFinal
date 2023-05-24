    import Geolocation from '@react-native-community/geolocation';

const getLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    resolve(position);
                },
                error => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        });
        const { latitude, longitude } = position.coords;
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        return data.address.city;
    } catch (error) {
        console.error(error);
    }
};

export default getLocation;