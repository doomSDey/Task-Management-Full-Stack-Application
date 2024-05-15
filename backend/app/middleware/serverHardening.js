function preventCrossSiteScripting(req, res, next) {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
}

function applyServerHardening(app) {
    app.disable('x-powered-by');
    app.use(preventCrossSiteScripting);
}

module.exports = {
    applyServerHardening,
};
