const ora = require('ora');
async function sleep(n){
  return new Promise(resolve=>setTimeout(() => {
    resolve()
  }, n))
}
const warpFetchLoding = (fn,message) => async (...args)=>{
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('faild!!!  Restart request ')
    await sleep(2000)
    return warpFetchLoding(fn, message)(...args)
  }
  
}

module.exports = {warpFetchLoding};