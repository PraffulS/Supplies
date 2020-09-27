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
            `supplier/get/${id ? id : ''}`,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};

export const get_products = (id) => {
    return new Promise((resolve, reject) => {
        doGet(
            `product/get/${id}`,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};

export const product_register = (data) => {
    return new Promise((resolve, reject) => {
        doPost(
            `product/save/`,
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

export const delete_product = (id) => {
    return new Promise((resolve, reject) => {
        doGet(
            `product/delete/${id}`,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};

export const admin_login = (username, password) => {
    return new Promise((resolve, reject) => {
        doPost(
            `admins/login/`,
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

export const get_all_products = () => {
    return new Promise((resolve, reject) => {
        doGet(
            `product/get/`,
            (response) => {
                return resolve(response);
            },
            (error) => {
                return reject(error);
            }
        );
    });
};