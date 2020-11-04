import express from 'express';
import xss from 'xss';
import { client } from '../../index';

const router = express.Router();

router.post('/user', async (req, res) => {
  const { name, email } = req.body;

  if (!req.headers['content-type'].startsWith('application/json'))
    return res.status(400).send({
      message:
        'Content Type must be application/json not ' +
        req.headers['content-type'],
    });

  if (!name) {
    return res.status(400).send({ message: 'Please provide name field' });
  }

  if (!email) {
    return res.status(400).send({ message: 'Please provide email field' });
  }

  try {
    await client.query(
      `INSERT INTO users (name, email) VALUES ('${xss(name)}', '${xss(
        email
      )}');`
    );
    res.send({
      data: {
        name: xss(name),
        email: xss(email),
      },
      message: 'OK',
    });
  } catch (err) {
    console.error(err.detail);
    res.status(400).send({ message: err.detail });
  }
});

export { router as NewUserRouter };
