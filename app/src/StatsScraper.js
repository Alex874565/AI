import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://www.op.gg/statistics/champions')
.then(({ data }) => {
    
})