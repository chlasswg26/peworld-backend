const { reject } = require('bcrypt/promises');
const db = require('../config/db');

module.exports = {
    register: (body) => new Promise((resolve, reject) => {
        const {
            id,
            name,
            email,
            hash,
            phone,
            level,
            createdDate
        } = body;

        db.query(
            'INSERT INTO login (id, name, email, password, phone, level, created_date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [
                id,
                name,
                email,
                hash,
                phone,
                level,
                createdDate
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            },
        );
    }),
    registerRecruiter: (body) => new Promise((resolve, reject) => {
        const {
            id,
            companyType = '',
            city = '',
            description = '',
            instagram = '',
            linkedin = '',
            loginId,
            createdDate,
            companyName = '',
            position = '',
            emailCompany = '',
            phoneCompany = '',
            photo = ''
        } = body;

        db.query(
            'INSERT INTO recruiters (id, company_type, city, description, instagram, linkedin, login_id, created_date, company_name, position, email_company, phone_company, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [
                id,
                companyType,
                city,
                description,
                instagram,
                linkedin,
                loginId,
                createdDate,
                companyName,
                position,
                emailCompany,
                phoneCompany,
                photo

            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            },
        );
    }),
    login: (email) => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM login WHERE email=$1',
            [email],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            },
        );
    }),
    selectByEmail: (email) => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM login WHERE email=$1',
            [email],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            },
        );
    }),
    // updateNameById: (id, name) => new Promise((resolve, reject) => {
    //     db.query(
    //         `UPDATE login SET name='${name}' WHERE id='${id}' `,
    //         (err, res) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve(res);
    //         },
    //     )
    // }),
    selectByIdUser: (id) => new Promise((resolve, reject) => {
        db.query(`SELECT * FROM recruiters WHERE login_id=$1`, [id], (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    }),
};
