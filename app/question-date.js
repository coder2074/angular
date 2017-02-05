"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var question_base_1 = require('./question-base');
var DateQuestion = (function (_super) {
    __extends(DateQuestion, _super);
    function DateQuestion(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'date';
        this.options = [];
        this.options = options['options'] || [];
    }
    return DateQuestion;
}(question_base_1.QuestionBase));
exports.DateQuestion = DateQuestion;
//# sourceMappingURL=question-date.js.map