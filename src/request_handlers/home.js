module.exports = (request, responseCallback) => {
    console.log('Home Route');
    responseCallback(200, 'Return from home');
};
