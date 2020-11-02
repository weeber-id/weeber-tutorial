import express from 'express';
import fs from 'fs';
import path from 'path';
import { client } from '../../index';

const router = express.Router();

router.get('/user', async (_, res) => {
  const query = (await client.query('SELECT * FROM users')).rows;

  const queryElement: string[] = [];
  query.forEach((val) => {
    const el = `<div class="table-row"><div>${val.user_id}</div><div>${val.name}</div><div>${val.email}</div></div>`;
    queryElement.push(el);
  });

  const html = fs
    .readFileSync(path.join(__dirname, '../../views/user.html'))
    .toString()
    .replace('{{ELEMENT}}', queryElement.join(' '));

  res.send(html);
});

export { router as indexUserRouter };
