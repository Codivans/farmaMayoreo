const formatPhoneNumber = (numeroCel) => {
    // Convierte el número en una cadena y agrega espacios en las posiciones deseadas
    const formattedNumber = numeroCel.toString().replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
    return formattedNumber;
};

export default formatPhoneNumber;