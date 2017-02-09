import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { DateQuestion }  from './question-date';

import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

declare var odatajs: any;

@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous

  constructor(private http: Http) { }

  getQuestions (): Observable<QuestionBase<any>[]> {

    let questions = new Array<QuestionBase<any>>();

    // --------------------------------------------------------------------

      console.log('asdfasdfasdfsadfdsaf');
      var url = 'http://services.odata.org/V4/(S(my2yztyjudav0kux2tm5f2bn))/TripPinServiceRW/$metadata';
      url = 'api/metadata';

        var user = 'lims';
        var password = 'lims#1';

        let authHash = this.make_base_auth(user, password);

          var authHeader = new Headers();
  
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
             //     .map(response => <QuestionBase<any>[]>response.json())
                  .catch(this.handleError);

                  
    // --------------------------------------------------------------------


 //   questions = this.getQuestionsPrivate();

 //   questions.sort((a, b) => a.order - b.order);
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
      var q1 =  createDropdownQuestion(dropDownOption);
      

      var textBoxOption = {"key":"name","label":"name", "vocabOptions":"","value":"Homer", "required":true,"order":1};
      var q2 = createTextboxQuestion(textBoxOption);
      
      var emailOption = {"key":"emailAddress","label":"Email", "vocabOptions":"","value":"", "required":true,"order":2};
      var q3 = createEmailQuestion(emailOption);

     privateQuestions.push(q1, q2, q3);

      var dataType = 'string';             

      dataType = 'date';
      if (dataType === 'date') {
        var dateOption = {"key":"bravedate","label":"DateReg", "vocabOptions":"","value":"", "required":true,"order":3};
        var q = createDateQuestion(dateOption);
        privateQuestions.push(q);
      }

     this.getModel();

     return privateQuestions;

  }

  
  getModel(): any {

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

    getQuestionAsync(name:string, type:string, mandatory:boolean): Promise<any> {

      let p = new Promise<any>(function (resolve, reject) {

          return this.createQuestion(name, type, mandatory)

      }).catch(function (err) {
          console.log('absent.json error', err.message);
      })
      return p;
    }




} // end
 
    function getMetaAsync(res: Response): Promise<QuestionBase<any>[]> {
      var metaString = res.json().data;
      let p = new Promise<QuestionBase<any>[] >(function (resolve, reject) {

          resolve( getMeta(metaString));

      }).catch(function (err) {
          console.log('absent.json error', err.message);
      })
      return p;
   }


      function getMeta(res:Response): QuestionBase<any>[]  {
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
            
             let questions = new Array<QuestionBase<any>>();

             var count = 0;             
             for (var i in props) {
               count++;
               var prop = props[i];
               console.log(props[i]);
               var name = prop.name;
               var type = prop.type;
               var mandatory = !prop.nullable;

               var question : QuestionBase<any> = createQuestion(name, type, mandatory, count);

               questions.push(question);
             }

             for (var i in navProps) {
               console.log(navProps[i]);
             }

             console.log(questions);
             return questions;

   }

   function createQuestion(name:string, type:string, mandatory:boolean, order:number) {
    var question:any;

    var key = 'ci_' + name;
    var value:any = null;
    value = "";
    
        switch (type) {
        case "Edm.Int32":
          var componentOption = {"key":key,"label":name,"value":value, "required":mandatory,"order":order};
          question = createTextboxQuestion(componentOption);
          break;
        case "Edm.String":
          var vocabOptions = [
            {key: 'solid',  value: 'Solid'},
            {key: 'great',  value: 'Great'},
            {key: 'good',   value: 'Good'},
            {key: 'unproven', value: 'Unproven'}
          ];
          var dropDownOption = {"key":key,"label":name, "vocabOptions":vocabOptions,"value":value, "required":mandatory,"order":order};
          question = createDropdownQuestion(dropDownOption);
          break;
        case "Edm.DateTimeOffset":
          var componentOption = {"key":key,"label":name,"value":value, "required":mandatory,"order":order};
          question = createTextboxQuestion(componentOption);
        case "Edm.Int16":
          var componentOption = {"key":key,"label":name,"value":value, "required":mandatory,"order":order};
          question = createTextboxQuestion(componentOption);
          break;
        case "Edm.Double":
          var componentOption = {"key":key,"label":name,"value":value, "required":mandatory,"order":order};
          question = createTextboxQuestion(componentOption);
          break;
        default:
           var componentOption = {"key":key,"label":name,"value":value, "required":mandatory,"order":order};
          question = createTextboxQuestion(componentOption);
      }

    return question;
  }

  function createDropdownQuestion(componentOptions:any) {
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

  function createTextboxQuestion(componentOptions:any) {

      var q2 = new TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      })
      return q2;
  }

  function createEmailQuestion(componentOptions:any) {
      var q3 = new TextboxQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      });
      return q3;
  }
    function createDateQuestion(componentOptions:any) {
        var q1 =  new DateQuestion({
        key: componentOptions.key,
        label: componentOptions.label,
        value: componentOptions.value,
        required: componentOptions.required,
        order: componentOptions.order
      });
      return q1;
  }
