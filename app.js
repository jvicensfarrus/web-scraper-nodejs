const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')

const express = require('express')

const app = express()

const url = "https://www.thetimes.co.uk"

axios(url)
    .then(response => {
        const html = response.data
        const articles = []
        const $ = cheerio.load(html)
        $('.Item-content', html).each(function(){
            let title = $(this).find('.Item-headline').text();
            let link = url+$(this).find('.Item-headline a').attr('href')

            articles.push({
                'title': title,
                'link': link
            })
            
        })

        console.log(articles);
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server runing on port: ', PORT))

