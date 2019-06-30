const iconv = require('iconv-lite');
const { exec } = require('child_process');

/**
 * 异步调用EXE
 */
module.exports = async function (cmdStr) {
  return new Promise((resolve, reject) => {
    exec(cmdStr, {
      encoding: 'buffer'
    }, (error, stdout) => {
      if (error) {
        reject({
          error,
          data: ''
        });
      } else {
        resolve({
          error,
          data: iconv.decode(stdout, 'cp936')
        });
      }
    });
  });
}