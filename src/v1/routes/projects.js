const express = require('express');
const router = express.Router();
const axios = require('axios');
const titlify = require('title-case');

router.get('/', (req, res, next) => {
  axios.get('https://gist.githubusercontent.com/brianjleeofcl/3e195fe45a71373f33ba2de1e022893b/raw/cef0c75b0d1b786d666400e8bfd3e67a69113dfc/projects.txt').then(({data}) => {
    const promises = data.replace(/\$/g, 'brianjleeofcl').split('\n').map(title => {
      return axios.get(`https://api.github.com/repos/${title}`)
    });

    return Promise.all(promises)
  }).then(results => {
    const projects = results.map(({data}) => {
      const { html_url, homepage, name, description } = data
      const title = titlify(name);
      const url = {
        github: html_url,
        web: homepage
      }
      return { title, desc: description, url }
    })

    console.log(projects);
    res.send('')
  })
})

module.exports = router;