#!./node_modules/.bin/babel-node

import glob from 'glob-promise';
import yargs from 'yargs';
import path from 'path';
import Promise from 'bluebird';
import fs from 'fs-promise';
import debug from 'debug';
import moment from 'moment';

const log = debug('hdo-cards:update');

const {
    input,
    output
} = yargs
    .usage('$0 --input <path> --output <path>')
    .option('input', {
        alias: 'i',
        type: 'string',
        describe: 'Where to find docs data.',
    })
    .option('output', {
        alias: 'o',
        type: 'string',
        describe: 'Where to save the result data.',
        required: true
    })
    .help('help')
    .demand('input', 'output')
    .argv;

const indexPath = path.resolve(output, 'index.json');

glob(path.resolve(input, '*.styled.json'))
    .then(files => {
        return Promise.map(files, f => fs.readFile(f, 'utf-8')
                .then(parseJson))
                .then(data => {
                    const index = { stacks: [], lastUpdate: moment().format() };

                    return Promise.map(data, (d, i) => {
                        const file = files[i];

                        if (!d || !d.data) {
                            log('invalid content', file)
                            return;
                        }

                        if (Array.isArray(d.data.cards) && d.data.title) {
                            index.stacks.push({
                                title: d.data.title,
                                modification: d.modification,
                                description: getFirstParagraph(d.data),
                                id: path.basename(file, '.styled.json')
                            });

                            // return fs.writeFile(path.join(output, path.basename(file)), JSON.stringify(data));
                        }
                    })
                    .then(() => fs.writeFile(indexPath, JSON.stringify(index)));
                });
    })
    .catch(console.error);

const getFirstParagraph = (cardStack) => {
    const paras = cardStack.cards[0] ? cardStack.cards[0].text : null;
    return paras && paras[0] ? paras[0].value : '';
}

const parseJson = (content) => {
    try {
        return JSON.parse(content);
    } catch (err) {
        return null;
    }
};