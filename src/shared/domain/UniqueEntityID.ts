import { ObjectId } from 'bson';
import AppError from '../core/errors/AppError';
import { Identifier } from './Identifier';

/**
 * @desc Este "UniqueEntityID" serve como identificador único de entidade.
 * Neste caso abaixo ele é um uuid e não nesseriamente único identificador do
 * sistema podem ser criadas outros tipos de identificadores, caso haja
 * necessidade, a única exigência é que esse identificador, seja filho da classe
 * "Identifier"
 */

export class UniqueEntityID extends Identifier<ObjectId> {
  private constructor(id?: string | ObjectId) {
    super(new ObjectId(id));
  }

  static isValid(id: string | ObjectId) {
    return ObjectId.isValid(id);
  }

  static create(id?: string | ObjectId): UniqueEntityID {
    if (id && !this.isValid(id)) {
      throw new AppError('', 400, { message: 'Id invalido' });
    }

    return new UniqueEntityID(id);
  }

  equals(id: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toString() === this.toString();
  }
}
