import * as moment from 'moment';
import AppError from '../core/errors/AppError';

export class DateUtils {
  static addSeconds = (date: Date, seconds: number): Date => {
    return moment(date).add(seconds, 'seconds').toDate();
  };

  static addMinutes = (date: Date, minutes: number): Date => {
    return moment(date).add(minutes, 'minutes').toDate();
  };

  static addHours = (date: Date, hours: number): Date => {
    return moment(date).add(hours, 'hours').toDate();
  };

  static addDays = (date: Date, days: number): Date => {
    return moment(date).add(days, 'days').toDate();
  };

  static addMonths = (date: Date, days: number): Date => {
    return moment(date).add(days, 'months').toDate();
  };

  static addYears = (date: Date, days: number): Date => {
    return moment(date).add(days, 'years').toDate();
  };

  static subtractDays = (date: Date, days: number): Date => {
    return moment(date).subtract(days, 'days').toDate();
  };

  static subtractMonths = (date: Date, days: number): Date => {
    return moment(date).subtract(days, 'months').toDate();
  };

  static subtractYears = (date: Date, days: number): Date => {
    return moment(date).subtract(days, 'years').toDate();
  };

  static subtractHours = (date: Date, hours: number): Date => {
    return moment(date).subtract(hours, 'hours').toDate();
  };

  static lastMinuteOfTheDay = (date: Date): Date => {
    return moment(date)
      .hours(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(599)
      .toDate();
  };

  static firstMinuteOfTheDay = (date: Date): Date => {
    return moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
  };

  static diffDays = (date: Date, otherDate: Date): number => {
    return moment(date).diff(otherDate, 'days');
  };

  /**
   * @param diff - value: days, hours or years
   */
  static diff = (date: Date, otherDate: Date, diff: any): number => {
    return moment(date).diff(otherDate, diff);
  };

  /**
   * @param date - value: date to be formated
   * @param pattern - value: target pattern
   */
  static stringFormat = (date: Date, pattern: string): string => {
    return moment(date).format(pattern);
  };

  /**
   * @param date - value: date to be formated... this date should be in format YYYY-MM-DD
   * if the date can't be parsed, this method will return undefined
   */
  static convertStringToDate = (date: string): Date | undefined => {
    // 2021-10-14T13:55:00.270+00:00
    try {
      const dateParsed = moment(date, 'YYYY-MM-DD HH:mm:ss', true);
      if (dateParsed.isValid()) {
        return dateParsed.toDate();
      }
    } catch (err) {
      // se não conseguiu converter é pq não é data
    }
  };

  /**
   * @param date - value: date to be formated... this date should be in format YYYY-MM-DD
   * if the date can't be parsed, this method will return undefined
   */
  static convertStringToDateFormat = (
    date: string,
    format: string,
  ): Date | undefined => {
    try {
      const dateParsed = moment(date, format, true);
      if (dateParsed.isValid()) {
        return dateParsed.toDate();
      }
    } catch (err) {
      // se não conseguiu converter é pq não é data
    }
  };

  static generateDateSpecificHour(date: Date, hour: number) {
    date.setHours(0, 0, 0, 0);
    return DateUtils.addHours(date, hour);
  }

  static generateContractedDate(date: string | undefined) {
    if (!date) return undefined;
    return this.generateDateSpecificHour(new Date(date), 9);
  }

  /**
   * @param date - value: date to be formated... this date should be in format YYYYMMDD
   * if the date can't be parsed, this method will return undefined
   */
  static string_YYYYMMDD_To_Date(
    dateString: string | undefined,
  ): Date | undefined {
    if (!dateString) return undefined;
    try {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } catch (err) {
      return undefined;
    }
  }

  static isAfter(inputDate: Date, comparisonDate: Date): boolean {
    return moment(inputDate).isAfter(comparisonDate);
  }

  static buildBirthDate(birthDate: string | undefined) {
    if (!birthDate) return '';
    try {
      const dateParsed = moment(birthDate, 'DD-MM-YYYY', true);
      if (dateParsed.isValid()) {
        return moment(dateParsed.toDate()).format('DD-MM-YYYY').toString();
      } else {
        throw new AppError(
          'O campo data de nascimento precisa estar no formato DD-MM-AAAA.',
          400,
        );
      }
    } catch (err) {
      throw new AppError(
        'O campo data de nascimento precisa estar no formato DD-MM-AAAA.',
        400,
      );
    }
  }
}
