console.log("daw")
const prog = require('caporal');
const fs = require('fs');

//Create Component
prog
  .version('1.0.0')
  .command('component', 'generate component')
  .alias("c")
  .argument('[src]', 'src where generate component', "", "components/Name")
  .argument('[type]', 'type of file', "", "tsx")
  .option('--skip-sass')
  .action(function (args, options, logger) {
    logger.info(args, options);
    const { src, type } = args
    //get the Name of component
    let splited = src.split("/")
    const name = splited[splited.length - 1]
    splited.pop()
    const srcWithoutName = splited.join("/")
    const { skipSass } = options
    fs.promises.mkdir(`src/${srcWithoutName}/${name}`, { recursive: true })
      .then(() => {
        const stream = fs.createWriteStream(`src/${srcWithoutName}/${name}/${name}.${type}`);
        stream.once('open', function () {
          stream.write("import React,{} from 'react';\n");
          if (!skipSass) stream.write(`import './${name}.sass'\n`);
          stream.write(`const ${name} = ()=>{\n`);
          stream.write(`  return(\n`);
          stream.write(`    <div className="${name}">\n`);
          stream.write(`    </div>\n`);
          stream.write(`  )\n`);
          stream.write(`}\n`);
          stream.write(`export default ${name}\n`);
          stream.end();
        });
        //STYLES
        if (!skipSass) {
          const sassStream = fs.createWriteStream(`src/${srcWithoutName}/${name}/${name}.sass`);
          sassStream.once('open', function () {
            sassStream.write(`.${name}`);
            sassStream.end();
          });
        }
      })
      .catch(console.error);
  });

prog.parse(process.argv);