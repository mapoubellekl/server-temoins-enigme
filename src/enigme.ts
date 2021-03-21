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

  // @Column('text')
  // imgEnigme: string;

  @Column()
  responseEnigme: string;

  // @Column('text')
  // imgGeoCaching: string;

  // @Column('text')
  // imgHiddenObject: string;

}
//https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node

//pas regardé https://malcoded.com/posts/angular-backend-express/


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