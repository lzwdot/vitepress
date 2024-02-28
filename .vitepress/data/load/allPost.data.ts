import fs from 'fs';
import path from 'path';

export default {
  async load() {
    return await JSON.parse(
      fs.readFileSync(path.join(__dirname, './../', 'allPost.json'), 'utf8'),
    );
  },
};
