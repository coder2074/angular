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
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var QuestionService = (function () {
    // Todo: get from a remote source of question metadata
    // Todo: make asynchronous
    function QuestionService(http) {
        this.http = http;
    }
    QuestionService.prototype.getQuestions = function () {
        var questions = new Array();
        // --------------------------------------------------------------------
        console.log('asdfasdfasdfsadfdsaf');
        var url = 'http://services.odata.org/V4/(S(my2yztyjudav0kux2tm5f2bn))/TripPinServiceRW/$metadata';
        url = 'api/metadata';
        var user = 'lims';
        var password = 'lims#1';
        var authHash = this.make_base_auth(user, password);
        var authHeader = new http_1.Headers();
        authHeader.append('Authorization', authHash);
        //    return this.http.get(url, {
        //       headers: authHeader
        //      }).toPromise()
        //        .then(function(response) {
        //           var metaString = response.json().data;       
        //            getMetaAsync(metaString);
        //        })
        //  .then(function(response) {              
        //     var qs = response;
        //     console.log(qs);
        //     for (var i in qs) {
        //       questions.push(qs[i]);
        //     }
        // })
        //       .catch(this.handleError);
        return this.http.get(url)
            .map(getMeta)
            .catch(this.handleError);
        // --------------------------------------------------------------------
        //   questions = this.getQuestionsPrivate();
        //   questions.sort((a, b) => a.order - b.order);
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
        var q1 = createDropdownQuestion(dropDownOption);
        var textBoxOption = { "key": "name", "label": "name", "vocabOptions": "", "value": "Homer", "required": true, "order": 1 };
        var q2 = createTextboxQuestion(textBoxOption);
        var emailOption = { "key": "emailAddress", "label": "Email", "vocabOptions": "", "value": "", "required": true, "order": 2 };
        var q3 = createEmailQuestion(emailOption);
        privateQuestions.push(q1, q2, q3);
        var dataType = 'string';
        dataType = 'date';
        if (dataType === 'date') {
            var dateOption = { "key": "bravedate", "label": "DateReg", "vocabOptions": "", "value": "", "required": true, "order": 3 };
            var q = createDateQuestion(dateOption);
            privateQuestions.push(q);
        }
        this.getModel();
        return privateQuestions;
    };
    QuestionService.prototype.getModel = function () {
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
    QuestionService.prototype.getQuestionAsync = function (name, type, mandatory) {
        var p = new Promise(function (resolve, reject) {
            return this.createQuestion(name, type, mandatory);
        }).catch(function (err) {
            console.log('absent.json error', err.message);
        });
        return p;
    };
    QuestionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionService);
    return QuestionService;
}());
exports.QuestionService = QuestionService; // end
function getMetaAsync(res) {
    var metaString = res.json().data;
    var p = new Promise(function (resolve, reject) {
        resolve(getMeta(metaString));
    }).catch(function (err) {
        console.log('absent.json error', err.message);
    });
    return p;
}
function getMeta(res) {
    var metaString = res.json().data;
    var meta = odatajs.oData.parseMetadata(metaString);
    var schema = meta.dataServices.schema[0];
    var entityTypes = meta.dataServices.schema[0].entityType;
    var firstEntityType = entityTypes[0];
    var entityTypeName = firstEntityType.name;
    var props = firstEntityType.property;
    var navProps = firstEntityType.navigationProperty;
    console.log('meta: ', meta);
    console.log('schema: ', schema);
    var questions = new Array();
    var count = 0;
    for (var i in props) {
        count++;
        var prop = props[i];
        console.log(props[i]);
        var name = prop.name;
        var type = prop.type;
        var mandatory = !prop.nullable;
        var question = createQuestion(name, type, mandatory, count);
        questions.push(question);
    }
    for (var i in navProps) {
        console.log(navProps[i]);
    }
    console.log(questions);
    return questions;
}
function createQuestion(name, type, mandatory, order) {
    var question;
    var key = 'ci_' + name;
    var value = null;
    value = "";
    switch (type) {
        case "Edm.Int32":
            var componentOption = { "key": key, "label": name, "value": value, "required": mandatory, "order": order };
            question = createTextboxQuestion(componentOption);
            break;
        case "Edm.String":
            var vocabOptions = [
                { key: 'solid', value: 'Solid' },
                { key: 'great', value: 'Great' },
                { key: 'good', value: 'Good' },
                { key: 'unproven', value: 'Unproven' }
            ];
            var dropDownOption = { "key": key, "label": name, "vocabOptions": vocabOptions, "value": value, "required": mandatory, "order": order };
            question = createDropdownQuestion(dropDownOption);
            break;
        case "Edm.DateTimeOffset":
            var componentOption = { "key": key, "label": name, "value": value, "required": mandatory, "order": order };
            question = createTextboxQuestion(componentOption);
        case "Edm.Int16":
            var componentOption = { "key": key, "label": name, "value": value, "required": mandatory, "order": order };
            question = createTextboxQuestion(componentOption);
            break;
        case "Edm.Double":
            var componentOption = { "key": key, "label": name, "value": value, "required": mandatory, "order": order };
            question = createTextboxQuestion(componentOption);
            break;
        default:
            var componentOption = { "key": key, "label": name, "value": value, "required": mandatory, "order": order };
            question = createTextboxQuestion(componentOption);
    }
    return question;
}
function createDropdownQuestion(componentOptions) {
    var q1 = new question_dropdown_1.DropdownQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order,
        options: componentOptions.vocabOptions
    });
    return q1;
}
function createTextboxQuestion(componentOptions) {
    var q2 = new question_textbox_1.TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
    });
    return q2;
}
function createEmailQuestion(componentOptions) {
    var q3 = new question_textbox_1.TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
    });
    return q3;
}
function createDateQuestion(componentOptions) {
    var q1 = new question_date_1.DateQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
    });
    return q1;
}
//# sourceMappingURL=question.service.js.map