class ContextDatabase {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    setDatabaseStrategy(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    create(hero) {
        return this._databaseStrategy.create(hero);
    }
}

module.exports = ContextDatabase;