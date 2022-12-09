class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
} 

class DatabaseStrategy {
    create() {
        throw new NotImplementedException();
    }

    connect() {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }
}

module.exports = DatabaseStrategy;