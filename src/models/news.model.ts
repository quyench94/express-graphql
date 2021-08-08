import {Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, PrimaryKey, Default, DataType, BeforeSave, AfterFind, BelongsTo, ForeignKey, AllowNull} from "sequelize-typescript";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import UserModel from "./user.model";
import CategoryModel from "./category.model";


@Table({tableName: 'qi_news'})
export default class NewsModel extends Model<NewsModel> {

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER()})
  id!: any

  @Column({type: DataType.STRING(255)})
  title!: string;

  @Column({type: DataType.TEXT})
  description: string;

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


  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER})
  publisherId!: number
  
  @BelongsTo(() => UserModel)
  publisher: UserModel


  @AllowNull(false)
  @ForeignKey(() => CategoryModel)
  @Column({type: DataType.INTEGER})
  categoryId!: number
  
  @BelongsTo(() => CategoryModel)
  category: CategoryModel
}