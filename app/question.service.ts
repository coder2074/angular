import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { DateQuestion }  from './question-date';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';

declare var odatajs: any;

@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous

  constructor(private http: Http) { }

  getQuestions() {
    let questions: QuestionBase<any>[] = [

    ];


    questions = this.getQuestionsPrivate();

    return questions.sort((a, b) => a.order - b.order);
  }

  getQuestionsPrivate(): QuestionBase<any>[] {

    let privateQuestions = new Array<QuestionBase<any>>();


      var vocabOptions = [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ];
      var dropDownOption = {"key":"brave","label":"Bravery Rating", "vocabOptions":vocabOptions,"value":"", "required":true,"order":1};
      var q1 =  this.createDropdownQuestion(dropDownOption);
      

      var textBoxOption = {"key":"name","label":"name", "vocabOptions":"","value":"Homer", "required":true,"order":1};
      var q2 = this.createTextboxQuestion(textBoxOption);
      
      var emailOption = {"key":"emailAddress","label":"Email", "vocabOptions":"","value":"", "required":true,"order":2};
      var q3 = this.createEmailQuestion(emailOption);

     privateQuestions.push(q1, q2, q3);

      var dataType = 'string';             

      dataType = 'date';
      if (dataType === 'date') {
        var dateOption = {"key":"bravedate","label":"DateReg", "vocabOptions":"","value":"", "required":true,"order":3};
        var q = this.createDateQuestion(dateOption);
        privateQuestions.push(q);
      }

     this.getModel();

     return privateQuestions;

  }

  
  getModel(): any {
      console.log('asdfasdfasdfsadfdsaf');
      var url = 'http://services.odata.org/V4/(S(my2yztyjudav0kux2tm5f2bn))/TripPinServiceRW/$metadata';
      url = 'api/metadata';

        var user = 'lims';
        var password = 'lims#1';

        let authHash = this.make_base_auth(user, password);

          var authHeader = new Headers();
  
          authHeader.append('Authorization', authHash);      

          
      this.http.get(url, {
   //       headers: authHeader
         }).toPromise()
           .then(function(response) {
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

  make_base_auth(user:string, password:string) : string  {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
  }  


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private createDropdownQuestion(componentOptions:any) {
        var q1 =  new DropdownQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order,
        options: componentOptions.vocabOptions
      });
      return q1;
  }

  private createTextboxQuestion(componentOptions:any) {

      var q2 = new TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      })
      return q2;
  }

  private createEmailQuestion(componentOptions:any) {
      var q3 = new TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      });
      return q3;
  }
    private createDateQuestion(componentOptions:any) {
        var q1 =  new DateQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      });
      return q1;
  }

} // end
