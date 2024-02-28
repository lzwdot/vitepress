import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default {
  async load() {
    return await yaml.load(
      fs.readFileSync(path.join(__dirname, './../', 'author.yml'), 'utf8'),
    );
  },
};
