const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

export default class Utilities {
  static fetchToJson(response) {
    return response.json();
  }

  static fetchToCSV(response) {
    return response.text().then(text => {
      return text.split('\n').map(line => {
        if (line === '') {
          return undefined;
        }
        return (line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []).map(cell => {
          return cell.replace(/(^"|"$)/g, '');
        });
      }).filter(item => item !== undefined);
    });
  }

  // modified from: https://stackoverflow.com/a/11486026/485048
  static timeFormat(seconds) {
    let hrs = ~~(seconds / 3600);
    let mins = ~~((seconds % 3600) / 60);
    let secs = seconds % 60;
    let ret = '';
    if (hrs > 0) {
        ret += `${hrs}:${(mins < 10 ? '0' : '')}`;
    }
    ret += `${mins}:${(secs < 10 ? '0' : '')}${secs}`;
    return ret;
  }

  static generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(Array(length)).map(() => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
  }

  static getHashParams(hash) {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = hash;
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  static isMobile() {
    return window.innerWidth < '480';
  }

  static debounce(func) {
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }
}
