const jwt = require('jsonwebtoken');

function userAuth(req, res, next){
    // Rececendo token pelo header 'x-access-token'
    const token = req.headers['x-access-token'];

    // Verificando se o token está sendo enviado na requisição
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    // Verica se token passado está correto
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        // verifica se retornou erro
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;

        next();
    });
}

module.exports = userAuth;