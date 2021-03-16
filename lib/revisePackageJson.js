
const Inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
module.exports = async function(projectName,targetDir){
  const reviseKeys = ['name','author'];
  const prompList=[
    {
      type:'confirm',
      name:'action',
      message: `${chalk.green('是否要修改package.json中相关信息')}`,
    }
  ]
  const { action } = await Inquirer.prompt(prompList);
  if(action){
    let { name,author } = await Inquirer.prompt([
      {
        type: 'input',
        message: chalk.green('修改package.json.name:'),
        name: 'name',
      }, {
        type: 'input',
        message: chalk.green('修改package.json.author:'),
        name: 'author',
      }
    ])
    if(!name) return;
    if(!author) return;
    reviseFileContent(targetDir, [name, author], reviseKeys)
  }
}
function reviseFileContent(targetDir,values,keys){
  fs.readFile(targetDir + `/package.json`, function (err, res) {
    if (err) throw err;
    let content = res.toString();
    const contentJSON = JSON.parse(content)
    for (let i = 0; i < keys.length;i++){
      contentJSON[keys[i]] = values[i];
    }
    const result = JSON.stringify(contentJSON,null,2);
    const bufferStr = Buffer.from(result)
    fs.writeFile(targetDir + `/package.json`, bufferStr, (err,data) => {
      if(err) throw err;
      console.log('修改配置成功')
    })
  })
}