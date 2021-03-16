const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require('inquirer');
const { warpFetchLoding } = require("./utils");
const downLoadGit  = require('download-git-repo');
const util = require('util');
const path  = require('path');
const revisePackageJson = require("./revisePackageJson");
class Creator{
  constructor(projectName,targetDir){
    this.name = projectName;
    this.target = targetDir;
    this.downLoadGit = util.promisify(downLoadGit)
    // console.log(targetDir + projectName)
  }
  
  async fetchRepo(){
    let repos = await warpFetchLoding(fetchRepoList,'稍等，正在拉取模板~~~')();
    if(!repos) return;
    repos = repos.map(item=>item.name);
    let { repo } = await Inquirer.prompt([
      {
        name:'repo',
        type:'list',
        choices: repos,
        message:'请选择一个模板'
      }
    ])
    return repo;
  }
  async fetchTag(repo){
    let tags = await warpFetchLoding(fetchTagList, '稍等，正在获取相关版本~~~')(repo);
    if (!tags) return;
    tags = tags.map(item => item.name);
    let { tag } = await Inquirer.prompt([
      {
        name: 'tag',
        type: 'list',
        choices: tags,
        message: '请选择一个版本号'
      }
    ])
    return tag;
  }
  async download(repo, tag) {
    let downUrl = `weicli-template/${repo}${tag?`#${tag}`:``}`;
    await warpFetchLoding(this.downLoadGit,'正在生成模板，请稍后~~~')(downUrl, path.resolve(process.cwd(), this.name))
    return path.resolve(process.cwd(), this.name)
  }
  async create(){
    let repo = await this.fetchRepo();
    let tag = await this.fetchTag(repo);
    await this.download(repo,tag)
    revisePackageJson(this.name,this.target)
  }
}

module.exports = Creator;