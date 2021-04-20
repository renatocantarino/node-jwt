const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get('/api', (request, response) => {
    response.json({ message: "get" })
})


app.post('/api/login', (request, response) => {
    const user = { id: 1, nome: 'renato' };
    jwt.sign({ user: user }, "secretKey", (err, token) => {
        response.json({ token })
    });
})


app.get('/api/posts', verifyToken, (request, response) => {
    jwt.verify(request.token, "secretKey", (err, authData) => {
        if (err)
            response.send(403)
        else
            response.json({ message: "posts", authData })
    })
})


function verifyToken(request, response, next) {

    const header = request.headers['authorization'];
    if (typeof header !== 'undefined') {
        const token = header.split(' ')[1];
        request.token = token;
        next();
    }
    else
        response.send(403)

}

app.listen(3001, (request, response) => console.log('server up'));




