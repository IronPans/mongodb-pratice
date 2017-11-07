const fs = require('fs');
const root_path=process.argv[2];

function getAllFiles(root) {
    let res = [] , files = fs.readdirSync(root);
    files.forEach((file) => {
        const pathname = root+'/'+file, stat = fs.lstatSync(pathname);
        if (!stat.isDirectory()){
            res.push(pathname.replace(root_path,'.'));
        } else {
            res = res.concat(getAllFiles(pathname));
        }
    });
    return res
}

module.exports = {
    getAllFiles: getAllFiles
};