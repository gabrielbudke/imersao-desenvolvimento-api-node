const InterfaceStrategy = require("../InterfaceStrategy.js");
const { Sequelize } = require("sequelize");

const databaseConfig = require("./config/database-config.js");

class Postgres extends InterfaceStrategy {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.error("[postgres]: Unable to connect to the database:", error);
            return false;
        }
    }

    async create(hero) {
        const { dataValues } = await this._schema.create(hero);
        return dataValues;
    }

    async read(query = {}) {
        const heroes = await this._schema.findAll({
            raw: true,
            where: query
        });

        return heroes;
    }

    update(heroId, hero, upsert = false) {
        const method = upsert ? "upsert" : "update";
        return this._schema[method](hero, {
            where: {
                id: heroId
            }
        });
    }

    delete(heroId) {
        return this._schema.destroy({
            where: {
                id: heroId
            }
        });
    }

    async deleteAll() {
        await this._schema.destroy({
            truncate: true
        });
    }

    static async connect() {
        const connection = new Sequelize(databaseConfig);
        return connection;
    }

    static async defineModel(connection, schema) {
        const model = schema.init(connection);
        await model.sync();
        return model;
    }

    async disconnect() {
        await this._connection.close();
    }
}

module.exports = Postgres;