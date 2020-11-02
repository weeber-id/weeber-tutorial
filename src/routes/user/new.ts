import express from 'express';
import xss from 'xss';
import { client } from '../../index';

const router = express.Router();

router.post('/user', async (req, res) => {
  const { name, email } = req.body;
  if (!name) {
    res.status(400).send({ message: 'Please provide name field' });
  }

  if (!email) {
    res.status(400).send({ message: 'Please provide email field' });
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
    res.send({ message: err.detail });
  }
});

export { router as NewUserRouter };
