import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  /**
   * 检测密码是否一致
   * @param password0 加密前密码
   * @param password1 加密后密码
   */
  static async comparePassword(password0, password1) {
    return bcrypt.compareSync(password0, password1);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Exclude()
  @Column({ length: 500 })
  password: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;

  /**
   * 插入数据前，对密码进行加密
   */
  @BeforeInsert()
  async encryptPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
