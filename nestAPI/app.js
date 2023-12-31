const morgan = require('morgan');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use
(
    morgan('dev'),
    express.json(),
    express.urlencoded({extended: true})
);

let boardList = [];
let numOfBoards = 0;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/board', (req, res) => {
    res.json(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        id: ++numOfBoards,
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        user_id: req.body.user_id
    };
    boardList.push(board);
    res.json(board);
    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    const findItem = boardList.find(item => {
        return item.id === +req.params.id;
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1, {
        id: findItem.id,
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        user_id: req.body.user_id
    });

    res.json(boardList);
    res.redirect('/board');
    
});



app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});