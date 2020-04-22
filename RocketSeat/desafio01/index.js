const express = require('express');

const server = express();

server.use(express.json());

var projects = [
        {id: 0, title: "Novo projeto", tasks: ["Nova tarefa"]},
        {id: 1, title: "New project", tasks: ["New task"]}
    ];

var requisicoes = 1;

server.use((req, res, next) => {

    console.log(`Resiquições feitas até o momento ${requisicoes}`);

    requisicoes++;

    next();
});

function validateField(req, res, next){
    const { id, title } = req.body;

    if(!id){
        return res.status(400).json( {error: 'Id is required'});
    }

    if(!title){
        return res.status(400).json( { error: 'Title is required'});
    }

    const project = {
        id: id,
        title: title, 
        tasks: []
    }

    req.project = project;

    return next();

}

function idValidation(req, res, next){    
    
    const project = projects.find(projeto => projeto.id == req.params.id);

    if(!project){
        return res.status(404).json({error: 'Id not found'});
    }

    req.project = project;

    return next();
};

server.get('/projects', (req, res) =>{
    return res.json(projects);
});

server.post('/projects', validateField, (req, res) =>{

    projects.push(req.project);

    return res.json(projects);

});

server.post('/projects/:id/tasks', idValidation,  (req, res) => {
    const { title } = req.body;
    
    req.project.tasks.push(title);

    return res.json(projects);
});


server.put('/projects/:id', idValidation, (req, res) => {
    const { title } = req.body;

    req.project.title = title;

    return res.json(projects);
});

server.delete('/projects/:id', idValidation, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(project => project.id == id);

    projects.splice(index, 1);

    return res.send();
});

server.listen(3000);