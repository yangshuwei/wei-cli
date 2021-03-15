const axios = require('axios');

axios.interceptors.response.use(res=>{
  return res.data
})
async function fetchRepoList(){
  return axios.get('https://api.github.com/orgs/weicli-template/repos')
}
async function fetchTagList(repo) {
  return axios.get(`https://api.github.com/repos/weicli-template/${repo}/tags`)
}

module.exports = {
  fetchRepoList,
  fetchTagList
}