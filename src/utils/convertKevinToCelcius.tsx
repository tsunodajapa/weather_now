export default (kelvin: number) => {
    
    const celcius = Math.round(kelvin - 273.15);

    return celcius;
};