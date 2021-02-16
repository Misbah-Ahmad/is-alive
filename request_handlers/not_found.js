module.exports = (request, responseCallback) => {
    console.log('Not Found Route');
    responseCallback(404, 'Return from 404');
};
