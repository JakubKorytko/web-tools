const path = require('path');

const SQLite = require('better-sqlite3');

const sqlite = SQLite(path.join(`${__dirname}/data.db`));
const isDemo = JSON.parse(process.env.demo);

class Database {
  create = async () => {
    this.db = sqlite;
    await this.db.prepare(
      'CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, src TEXT NOT NULL, link TEXT NOT NULL);',
    ).run();
    await this.db.prepare(
      'CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, src TEXT NOT NULL, link TEXT NOT NULL);',
    ).run();
  };

  connection = async () => {
    if (this.db === undefined || this.db === null) {
      await this.create();
    }
  };

  insert = async (table, src, link) => {
    if (isDemo) { return false; }
    await this.connection();
    return this.db.prepare(`INSERT into ${table} (src, link) VALUES ('${src}', '${link}')`).run();
  };

  remove = async (table, id) => {
    if (isDemo) { return false; }
    await this.connection();
    return this.db.prepare(`DELETE FROM ${table} WHERE id=${id}`).run();
  };

  getData = async (table) => {
    await this.connection();
    return this.db.prepare(`SELECT * FROM ${table}`).all();
  };
}

module.exports = Database;
