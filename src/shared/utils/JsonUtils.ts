import AppError from '../core/errors/AppError';

export class JsonUtils {
  static parse(json: any) {
    if(typeof json === 'string') {
      try {
        const replacedNull = json.replace(/ /gi, '');
        const replacedSub = replacedNull.replace(//gi, '');

        return JSON.parse(replacedSub);
      } catch (err) {
        throw new AppError('', 500, 'Erro ao converter string para JSON.');
      }
    }
    return json;
  }
}
