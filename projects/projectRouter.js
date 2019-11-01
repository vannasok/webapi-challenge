const express = require('express');
const projectDB = require('../data/helpers/projectModel');
const router = express.Router();

router.use(express.json());

// Get #################
router.get('/', (req, res) => {
   projectDB
      .get()
      .then(pro => {
         res.status(200).json(pro);
      })
      .catch(err => {
         console.log('err :', err);
         res.status(500).json({ Error: 'Could Not Retrieve Data !' });
      });
});
// get by id #################
router.get('/:id', validateProjectId, (req, res) => {
   const id = req.params.id;
   projectDB
      .get(id)
      .then(pro => {
         res.status(200).json(pro);
      })
      .catch(err => {
         res.status(500).json({
            Error: 'Could Not Retrieve Project with ID !'
         });
      });
});
//post ######################
router.post('/', (req, res) => {
   const project = req.body;
   projectDB
      .insert(project)
      .then(pro => {
         res.status(200).json(pro);
      })
      .catch(err => {
         res.status(500).json({ error: 'Could Not Add, Missing Data' });
      });
});
//delete #################
router.delete('/:id', validateProjectId, (req, res) => {
   const id = req.params.id;
   projectDB
      .remove(id)
      .then(pro => {
         res.status(200).json({ message: 'Project Deleted' });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({ error: 'Could Not Delete Project !' });
      });
});
//edit #################
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const changes = req.body;
   projectDB
      .update(id, changes)
      .then(updated => {
         res.status(200).json(updated);
      })
      .catch(err => {
         res.status(500).json({ error: 'Could Not Change the Data !' });
      });
});

function validateProjectId(req, res, next) {
   const id = req.params.id;

   projectDB
      .get(id)
      .then(pro => {
         if (pro) {
            next();
         } else {
            res.status(400).json({ error: 'Could Not Find Project with ID' });
         }
      })
      .catch(err => {
         res.status(500).json({ error: 'Validation Project Error' });
      });
}

module.exports = router;
