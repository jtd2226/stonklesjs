import { uniqueId } from 'lodash';
import fs from 'fs';

export default async function register(req, res) {
  const user = req.body;
  user.id = uniqueId();
  const userJson = fs.readFileSync('meta/users.json', { encoding: 'utf-8' });
  const users = JSON.parse(userJson);
  users[user.id] = user;
  fs.writeFileSync('meta/users.json', JSON.stringify(users, null, 2));
  const message = `Thanks for registering ${user.first_name}!`;
  return res.status(200).json({ message });
}
