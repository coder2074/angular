import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<string> {
  controlType = 'date';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
