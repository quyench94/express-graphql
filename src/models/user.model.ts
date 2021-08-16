import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, PrimaryKey, Default, DataType, BeforeSave, AfterFind} from "sequelize-typescript";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';

@Scopes({
  keepPassword: {}
})

@Table({tableName: 'qi_user'})
export default class UserModel extends Model<UserModel> {

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER()})
  id!: any

  @Column({type: DataType.STRING(50)})
  firstName!: string;

  @Column({type: DataType.STRING(50)})
  lastName!: string;

  @Column({type: DataType.STRING(50), unique: true})
  email!: string;

  @Column({type: DataType.STRING})
  password!: string;

  @Default(false)
  @Column({type: DataType.BOOLEAN})
  isPublisher: boolean;

  @Column({type: DataType.STRING})
  publisherWebhook: string;

  @Default(true)
  @Column({type: DataType.INTEGER})
  status: number;

  @CreatedAt
  @Column({type: DataType.DATE})
  createdAt!: Date;

  @UpdatedAt
  @Column({type: DataType.DATE})
  updatedAt: Date;

  @Column({type: DataType.INTEGER})
  createdBy!: number;

  @Column({type: DataType.INTEGER})
  updatedBy: number;

  @Column({type: DataType.VIRTUAL})
  jwtToken: string

  @AfterFind
  static removePassword(user: any | UserModel, options:any) {
    
    if (!user) return;
    if (Array.isArray(user)) {
      Array.from(user).map((_user: any, idx) => _user.setAttributes('password', undefined));
    } else {
      user.setAttributes('password', undefined)
    }
  }
}