#!./node_modules/.bin/babel-node

import glob from 'glob-promise';
import yargs from 'yargs';
import path from 'path';
import Promise from 'bluebird';
import fs from 'fs-promise';
import debug from 'debug';

const log = debug('hdo-cards:update')

const argv = yargs
    .usage('$0 <docs-path> [args]')
    .demand(1)
    .argv;

const [ docsPath ] = argv._;
const indexPath = path.resolve(__dirname, '../public/data/index.json');

glob(path.resolve(docsPath, '*.styled.json'))
    .then(files => {
        return Promise.map(files, f => fs.readFile(f, 'utf-8')
                .then(parseJson))
                .then(data => {
                    const index = { stacks: [] };

                    data.forEach((d, i) => {
                        const file = files[i];

                        if (!d || !d.data) {
                            log('invalid content', file)
                            return;
                        }

                        if (Array.isArray(d.data.cards) && d.data.title) {
                            index.stacks.push({
                                title: d.data.title,
                                modification: d.modification,
                                id: path.basename(file, '.styled.json')
                            });
                        }
                    });

                    return fs.writeFile(indexPath, JSON.stringify(index));
                });
    })
    .catch(console.error);


const parseJson = (content) => {
    try {
        return JSON.parse(content);
    } catch (err) {
        return null;
    }
};