function Webcrawler() {
  this.request = require('request');
  this.cheerio = require('cheerio');
  this.fs = require('fs');

}

Webcrawler.prototype.getContent = function(site, callback) {
  var myThis = this;
  var content = [];

  this.request(site, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = myThis.cheerio.load(body);

    $('div#siteTable > div.link').each(function(index) {
      var title = $(this).find('p.title > a.title').text().trim();
      var score = $(this).find('div.score.unvoted').text().trim();
      var user = $(this).find('a.author').text().trim();
      var link = $(this).find('p.title > a.title').attr('href');
      
      content.push({
        title: title,
        score: score,
        user: user,
        link: link
      });
      //fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
    });
    
    callback(content);
  });

}

exports.Webcrawler = Webcrawler;
