// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
  var noteDB = client.db("node-note");
  //Update Request
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    noteDB.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
  // Delete Request
  app.delete('/notes/:id', function(req,res){
  	const id = req.params.id;
  	const details = { '_id': new ObjectID(id) };
  	noteDB.collection('notes').remove(details, function(err,item){
  		if(err){
  			res.send({ 'error': 'An error has occurred' }); 
  		} else {
  			res.send('Note ' + id + ' deleted!');
  		}
  	})
  });
  // Read Request
  app.get('/notes/:id', function(req,res){
  	const id = req.params.id;
  	const details = { '_id': new ObjectID(id) };
  	noteDB.collection('notes').findOne(details, function(err,item){
  		if(err){
  			res.send({ 'error': 'An error has occurred' }); 
  		} else {
  			res.send(item);
  		}
  	})
  });
  // Post request
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title, url: req.body.url };
    noteDB.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};