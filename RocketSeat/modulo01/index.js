const express = require('express');

const server = express();

server.use(express.json());

//CRUD -  Create, Read, Update, Delete

const users = ['Betin', 'Lidi', 'Binho', 'Vini', 'Lucão'];

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}: URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

function validateName(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'user name is required'});
    }

    return next();
}

function checkUserExist(req, res, next) {
    const user = users[req.params.index];

    if(!user) {
        return res.status(404).json({ error: 'user not found'});
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
})

server.get('/users/:index', checkUserExist, (req, res) =>{

    return res.json(req.user);
})

server.post('/users', validateName, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', validateName, checkUserExist, (req, res) =>{
    const { name } = req.body;
    const { index } = req.params;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', checkUserExist, (req, res) =>{
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
});

server.listen(3000);