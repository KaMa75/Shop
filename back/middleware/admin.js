let admin = (request, response, next) => {
    if(request.user.role === 0) {
        return response.send('Nie masz uprawnień do tego zasobu.');
    }
    next();
};

module.exports = admin;
