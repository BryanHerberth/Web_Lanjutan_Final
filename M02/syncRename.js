const fs = require('fs');

try {
    fs.renameSync("mwsore.json" , "mwpagi.json");
    console.log("Berhasil Mengganti Nama");
}catch (err) {
    console.error(err);
}