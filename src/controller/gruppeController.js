const express = require('express');
const router = express.Router();
const client = require('../repository/db');

router.use('/', (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('grupper: ip ' + ip);
  next();
});

router.get('/', (req, res) => {
  client
    .getConnection()
    .then(connection => {
      connection
        .getGrupper()
        .then(grupper => {
          res.send(grupper);
        })
        .catch(err => {
          res.status(404).send({ error: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

router.get('/:navn', (req, res) => {
  client
    .getConnection()
    .then(connection => {
      connection
        .get(req.params.navn)
        .then(gruppe => {
          res.send(gruppe);
        })
        .catch(err => {
          res.status(404).send({ error: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

// Vurderer å ikke bruke parameter på post, men heller fra body?
router.post('/:navn', (req, res) => {
  client
    .getConnection()
    .then(connection => {
      connection
        .insert(req.params.navn, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => {
          res.status(400).send({ error: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

router.put('/:navn', (req, res) => {
  client
    .getConnection()
    .then(connection => {
      connection
        .put(req.params.navn, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => {
          res.status(400).send({ error: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

router.delete('/:navn', (req, res) => {
  client
    .getConnection()
    .then(connection => {
      connection
        .delete(req.params.navn)
        .then(() => res.sendStatus(200))
        .catch(err => {
          res.status(400).send({ error: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;
