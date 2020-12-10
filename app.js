const config_data = require('./config.json')
const axios = require('axios');
const cheerio = require('cheerio');
const open = require('open');

//node app.js
const costco_url        = config_data.costco_url;
const minutes_til_log   = config_data.minutes_til_log;
const sec_til_refresh   = config_data.sec_til_refresh;
const cycle_cnt         = (minutes_til_log * 60)/sec_til_refresh;

let cycle_temp  = 0;
let seconds = 0;
let cycle_total_cnt = 0;

//Log initial options
console.log('CONFIG:\n-- minutes_til_log: ', minutes_til_log, 'min\n-- sec_til_refresh: ', sec_til_refresh, 'sec');

//call function
costcoScraper();

async function costcoScraper() {
  let html = await axios.get(config_data.costco_url);
  let $ = await cheerio.load(html.data);
  let imageOverlay = $('#productImageOverlay')[0].children[1].attribs.class;

  //HIDE
  if(imageOverlay.includes('hide')){
    await open(config_data.url, {app: ['chrome', '--guest']});

    cycle_total_cnt += cycle_temp;
    console.log('IN STOCK!!!');
    console.log('---Bot Info:\n---Runtime(s): ', seconds, '\n---Cycles: ', cycle_total_cnt);

  } else {
    setTimeout(() => { 
      seconds += sec_til_refresh;
      cycle_temp += 1;
      if(cycle_temp >= cycle_cnt) {
        cycle_total_cnt += cycle_temp;
        cycle_temp = 0;
        console.log('Status Update, Cycles: ', cycle_total_cnt, ' Seconds: ', seconds);
      }
      costcoScraper();
    }, (sec_til_refresh*1000));
  }
}
