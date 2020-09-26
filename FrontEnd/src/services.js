import { doGet, doPost } from "./requests";

export const supplier_login = (username, password) => {
    return new Promise((resolve, reject) => {
        doPost(
            `supplier/login/`,
            {username, password},
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};

export const supplier_register = (data) => {
    return new Promise((resolve, reject) => {
        doPost(
            `supplier/save/`,
            data,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};

export const get_supplier = (id) => {
    return new Promise((resolve, reject) => {
        doGet(
            `supplier/get/${id}`,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};