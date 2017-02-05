"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var question_dropdown_1 = require('./question-dropdown');
var question_textbox_1 = require('./question-textbox');
var question_date_1 = require('./question-date');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var QuestionService = (function () {
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    function QuestionService(http) {
        this.http = http;
    }
    QuestionService.prototype.getQuestions = function () {
        var questions = [];
        questions = this.getQuestionsPrivate();
        return questions.sort(function (a, b) { return a.order - b.order; });
    };
    QuestionService.prototype.getQuestionsPrivate = function () {
        var privateQuestions = new Array();
        var vocabOptions = [
            { key: 'solid', value: 'Solid' },
            { key: 'great', value: 'Great' },
            { key: 'good', value: 'Good' },
            { key: 'unproven', value: 'Unproven' }
        ];
        var dropDownOption = { "key": "brave", "label": "Bravery Rating", "vocabOptions": vocabOptions, "value": "", "required": true, "order": 1 };
        var q1 = this.createDropdownQuestion(dropDownOption);
        var textBoxOption = { "key": "name", "label": "name", "vocabOptions": "", "value": "Homer", "required": true, "order": 1 };
        var q2 = this.createTextboxQuestion(textBoxOption);
        var emailOption = { "key": "emailAddress", "label": "Email", "vocabOptions": "", "value": "", "required": true, "order": 2 };
        var q3 = this.createEmailQuestion(emailOption);
        privateQuestions.push(q1, q2, q3);
        var dataType = 'string';
        dataType = 'date';
        if (dataType === 'date') {
            var dateOption = { "key": "bravedate", "label": "DateReg", "vocabOptions": "", "value": "", "required": true, "order": 3 };
            var q = this.createDateQuestion(dateOption);
            privateQuestions.push(q);
        }
        this.getModel();
        return privateQuestions;
    };
    QuestionService.prototype.getModel = function () {
        console.log('asdfasdfasdfsadfdsaf');
        var url = 'http://services.odata.org/V4/(S(my2yztyjudav0kux2tm5f2bn))/TripPinServiceRW/$metadata';
        url = 'api/metadata';
        var user = 'lims';
        var password = 'lims#1';
        var authHash = this.make_base_auth(user, password);
        var authHeader = new http_1.Headers();
        authHeader.append('Authorization', authHash);
        this.http.get(url, {}).toPromise()
            .then(function (response) {
            var meta = odatajs.oData.parseMetadata(response.json().data);
            var schema = meta.dataServices.schema[0];
            var entityTypes = meta.dataServices.schema[0].entityType;
            var firstEntityType = entityTypes[0];
            var entityTypeName = firstEntityType.name;
            var props = firstEntityType.property;
            var navProps = firstEntityType.navigationProperty;
            console.log('meta: ', meta);
            console.log('schema: ', schema);
        })
            .catch(this.handleError);
        // var settings = {
        //   "async": true,
        //   "crossDomain": true,
        //   "context" : this,
        //   "dataType" : "text",
        //   "url": url + '$metadata',
        //   "method": "GET",
        //   "headers": {
        //     "content-type": "application/json",
        //     "authorization": authHash
        //   }
        // }
        //             $.ajax(settings).done(function (response:any) {
        //                var meta = odatajs.oData.parseMetadata(response);
        //                deferred.resolve();
        //             }, odatajs.oData.metadataHandler);
    };
    ;
    QuestionService.prototype.make_base_auth = function (user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    };
    QuestionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    QuestionService.prototype.createDropdownQuestion = function (componentOptions) {
        var q1 = new question_dropdown_1.DropdownQuestion({
            key: componentOptions.key,
            label: componentOptions.label,
            value: componentOptions.value,
            required: componentOptions.required,
            order: componentOptions.order,
            options: componentOptions.vocabOptions
        });
        return q1;
    };
    QuestionService.prototype.createTextboxQuestion = function (componentOptions) {
        var q2 = new question_textbox_1.TextboxQuestion({
            key: componentOptions.key,
            label: componentOptions.label,
            value: componentOptions.value,
            required: componentOptions.required,
            order: componentOptions.order
        });
        return q2;
    };
    QuestionService.prototype.createEmailQuestion = function (componentOptions) {
        var q3 = new question_textbox_1.TextboxQuestion({
            key: componentOptions.key,
            label: componentOptions.label,
            value: componentOptions.value,
            required: componentOptions.required,
            order: componentOptions.order
        });
        return q3;
    };
    QuestionService.prototype.createDateQuestion = function (componentOptions) {
        var q1 = new question_date_1.DateQuestion({
            key: componentOptions.key,
            label: componentOptions.label,
            value: componentOptions.value,
            required: componentOptions.required,
            order: componentOptions.order
        });
        return q1;
    };
    QuestionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionService);
    return QuestionService;
}());
exports.QuestionService = QuestionService; // end
//# sourceMappingURL=question.service.js.map