let conn = require('./db');
var path = require('path');

module.exports = {

    getMenus() {

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_menus ORDER BY title`,
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });

        });

    },

    save(fields, files) {
        return new Promise((resolve, reject) => {

            files.photo = `images/${path.parse(files.photo.path).base}`;
            conn.query(
                `INSERT INTO tb_menus (title,description, price, photo) VALUES(?,?,?,?)`,
                [
                    fields.title,
                    fields.description,
                    fields.price,
                    files.photo
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results)
                    }
                }
            );
        });
    }

};