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

            // let query, queryPhoto = '', params = [
            //     fields.title,
            //     fields.description,
            //     fields.price
            // ];

            // if (fields.photo.name) { 
            //     queryPhoto = ',photo = ?';
            //     params.push(files.photo);
            // }

            // if (parseInt(fields.id) > 0) {

            //     params.push(files.id);

            //     query = `
            //         UPDATE tb_menus SET
            //         title = ?,
            //         description = ?,
            //         price = ?
            //         ${queryPhoto}
            //         WHERE id = ?
            //     `;
                
            // } else {

            //     if(!fields.photo.name){
            //         reject('Envie a foto do prato');
            //     }

                query = `
                    INSERT INTO tb_menus 
                    (title,description, price, photo) 
                    VALUES(?,?,?,?)
                    `;

            // }

            conn.query(query, [
                fields.title,
                fields.description,
                fields.price,
                fields.photo
            ], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });

        });

    }

};