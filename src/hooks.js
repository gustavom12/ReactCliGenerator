const fs = require('fs');
export function hooks(prog) {
    prog
        .command('hook', 'generate component')
        .alias("h")
        .argument('[src]', 'src where generate hook', "", "hooks/useName")
        .argument('[type]', 'type of file', "", "tsx")
        .action(function (args, options, logger) {
            const { src, type } = args
            //get the Name of component
            let splited = src.split("/")
            const name = splited[splited.length - 1]
            splited.pop()
            const srcWithoutName = splited.join("/")
            fs.promises.mkdir(`src/${srcWithoutName}/${name}`, { recursive: true })
                .then(() => {
                    const stream = fs.createWriteStream(`src/${srcWithoutName}/${name}.${type}`);
                    stream.once('open', function () {
                        stream.write("import { useEffect, useState } from 'react';\n");
                        stream.write(`const ${name} = ()=>{\n`);
                        stream.write(`}\n`);
                        stream.write(`export default ${name}\n`);
                        stream.end();
                    });
                })
                .catch(console.error);
        });
}