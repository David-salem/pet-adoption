const fs = require('fs');
const path = 'db';
const { v4: uuidv4 } = require('uuid');
const { jwtSign } = require("./lib/JWT");

// CRUD
class DB {
    constructor(name) {
        this.name = name;
        this.path = `${path}/${name}.json`;
    };

    create = (json) => {
        this.save(json);
    };

    save = (list) => {
        fs.writeFileSync(this.path, JSON.stringify(list));
    };

    get = () => {
        const content = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(content);
    };

    getById = (id) => {
        const list = this.get();
        const item = list.find(i => i.id === id);

        return item;
    };

    add = (json) => {
        const list = this.get();

        const newItem = {
            ...json,
            id: uuidv4()
        }

        list.push(newItem);
        this.save(list);

        return newItem;
    };

    deleteById = (id) => {
        const list = this.get();
        const filteredList = list.filter(i => i.id !== parseInt(id));
        this.save(filteredList);

        return 1;
    };

    updateItem = (id, json) => {
        const list = this.get();

        const index = list.findIndex(i => i.id === parseInt(id));
        list[index] = { ...json, id: parseInt(id) };

        this.save(list);

        return 1;
    };

    getUserByEmail = (Email) => {
        const list = this.get();
        const user = list.find(i => i.Email === Email);
    
        return user;
    };

    getUserToken = (user) => {
        const { id } = user;
        delete user.Password;
    
        const access_token = jwtSign({ id });
    
        return access_token;
    };
};

module.exports = DB;