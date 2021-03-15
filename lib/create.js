const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const chalk = require('chalk');
const Creator = require('./creator');
module.exports = async function (projectName, options) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    if (options.force) { //用户传递强制覆盖命令  --force ，直接删除已经存在的文件夹
      await fs.remove(targetDir)
    } else {
      //提示是否要覆盖文件夹
      const proptList = [
        {
          name: 'action',
          type: 'list',
          message: `${chalk.green('Target directory is already exits Please pick an action')}`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false }
          ]
        }
      ];
      let { action } = await Inquirer.prompt(proptList);
      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log(`\r\n${chalk.green(`Removing.....`)}`)
        await fs.remove(targetDir)
      }
    }
  }
  let creator = new Creator(projectName, targetDir)
  await creator.create()
}