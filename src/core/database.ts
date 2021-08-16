import CoreBase from './base';
import { Sequelize } from 'sequelize-typescript';

type Config = {
  database: string
  host: string
  port: any
  user: string
  pass: string
  options: any
}

class Database extends CoreBase {
  public connected: boolean = false;
  public sequelize: Sequelize;
  private config: Config;
  private logger = console;

  constructor(config: Config) {
    super();
    this.config = config;
    this.connect();
  }

  public connect():Sequelize {
    this.sequelize = new Sequelize({
      database: this.config.database,
      host: this.config.host,
      username: this.config.user,
      password: this.config.pass,
      port: this.config.port,
      dialect: 'mysql',
      logging: false,
      models: [
        process.env.PWD + '/**/*.model.ts',
        process.env.PWD + '/**/*.model.js'
      ]
    });
    // this.sequelize.sync({force: false, alter: true})
    this.authenticate({logging: false});
    return this.sequelize;
  }

  public authenticate(options = {}) {
    if (this.sequelize) {
      this.sequelize.authenticate(options).then(() => {
        this.connected = true;
        this.logger.info("Connected")
      }).catch((err) => {
        this.logger.info("Connection failed", err)
      });
    }
  }
}

export default Database;