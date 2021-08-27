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

            fields.photo = `images/${path.parse(files.photo.path).base}`;

            let sql, queryPhoto = '';
            let params = [
                fields.title,
                fields.description,
                fields.price
            ];

            if (files.photo.name) { 

                queryPhoto = ',photo = ?';
                params.push(fields.photo);
            }

            if (parseInt(fields.id) > 0) {

                console.info('update');

                params.push(fields.id);

                sql = `
                    UPDATE tb_menus SET
                    title = ?,
                    description = ?,
                    price = ?
                    ${queryPhoto}
                    WHERE id = ?
                `;

                console.log("sql",sql);
                
            } else {
                
                if(!fields.photo.name){
                    console.log('Envie a foto do prato');
                    reject('Envie a foto do prato');
                }else{
                    console.info('create');
                    sql = "INSERT INTO tb_menus (title, description, price, photo) VALUES(?,?,?,?)";
                }

            }

            conn.query(sql, params, (err, results) => {

                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.error('sucess');
                    resolve(results);
                }
            });

        });

    },

    delete(id){
        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_menus WHERE id = ?
            `, [id], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            });
        });
    }

};