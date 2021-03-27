import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Enigme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  month: string;

  @Column()
  found: boolean;

  @Column()
  responseEnigme: string;

  @Column()
  geocachText: string;

}
//https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node


let connection:Connection;

export async function getEnigmeRepository(): Promise<Repository<Enigme>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'enigmeDB',
      synchronize: true,
      entities: [
        Enigme
      ],
    });
  }
  return connection.getRepository(Enigme);
}