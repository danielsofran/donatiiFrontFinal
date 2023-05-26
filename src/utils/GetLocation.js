import * as Geolocation from 'expo-location';

const getLocation = async () => {
    let { status } = await Geolocation.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return "";
    }
    try {
        const position = await Geolocation.getCurrentPositionAsync({});
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