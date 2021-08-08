import {Model, Column, Table, DataType, AllowNull } from "sequelize-typescript";

@Table({tableName: 'qi_category'})
export default class CategoryModel extends Model<CategoryModel> {

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER()})
  id!: any

  @AllowNull(false)
  @Column({type: DataType.STRING(100)})
  name!: string;

  @AllowNull(false)
  @Column({type: DataType.STRING(100)})
  code!: string;
}