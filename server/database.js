const sqlite = require("better-sqlite3")('./data.db');
const isDemo = JSON.parse(process.env.demo);

class Database {

    create = async () => {
        this.db = sqlite;
        await this.db.prepare(
            "CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, src TEXT NOT NULL, link TEXT NOT NULL);"
        ).run();
        await this.db.prepare(
            "CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, src TEXT NOT NULL, link TEXT NOT NULL);"
        ).run();
    }

    connection = async () => {
        if (this.db == undefined || this.db == null) {
            await this.create();
        }
    }

    insert = async (table, src, link) => {
        if (isDemo) {return false;}
        await this.connection();
        return await this.db.prepare(`INSERT into ${table} (src, link) VALUES ('${src}', '${link}')`).run();
    }

    remove = async (table, id) => {
        if (isDemo) {return false;}
        await this.connection();
        return await this.db.prepare(`DELETE FROM ${table} WHERE id=${id}`).run();
    }

    getData = async (table) => {
        await this.connection();
        const res = await this.db.prepare(`SELECT * FROM ${table}`).all();
        return res;
    }
}

module.exports = Database;