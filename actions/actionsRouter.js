const express = require('express');
const actionDB = require('../data/helpers/actionModel');
const router = express.Router();

router.use(express.json());

// get all actions ##################
router.get('/', (req, res) => {
   actionDB
      .get()
      .then(act => {
         res.status(200).json(act);
      })
      .catch(err => {
         console.log('err :', err);
         res.status(500).json({ Error: 'Could Not Retrieve Data !' });
      });
});

// get action by ID ##################
router.get('/:id', validateActionId, (req, res) => {
   const id = req.params.id;
   actionDB
      .get(id)
      .then(act => {
         res.status(200).json(act);
      })
      .catch(err => {
         res.status(500).json({ Error: 'Could Not Retrieve Data with ID !' });
      });
});

// post ##########################
router.post('/', (req, res) => {
   const action = req.body;
   actionDB
      .insert(action)
      .then(act => {
         res.status(200).json(act);
      })
      .catch(err => {
         res.status(500).json({ error: 'Could Not Add, Missing Data' });
      });
});

// Delete ####################
router.delete('/:id', validateActionId, (req, res) => {
   const id = req.params.id;
   actionDB
      .remove(id)
      .then(act => {
         res.status(200).json({ message: 'Action Deleted' });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({ error: 'Could Not Delete Data !' });
      });
});

// Edit ###################
router.put('/:id', (req, res) => {
   const id = req.params.id;
   const changes = req.body;
   actionDB
      .update(id, changes)
      .then(updated => {
         res.status(200).json(updated);
      })
      .catch(err => {
         res.status(500).json({ error: 'Could Not Change the Data !' });
      });
});

function validateActionId(req, res, next) {
   const id = req.params.id;
   actionDB
      .get(id)
      .then(act => {
         if (act) {
            next();
         } else {
            res.status(400).json({ message: 'Could Not Found' });
         }
      })
      .catch(err => {
         res.status(500).json({ Error: 'validation error' });
      });
}

module.exports = router;
