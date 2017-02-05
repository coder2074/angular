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
// Keep the Input import for now, we'll remove it later:
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var hero_service_1 = require('./hero.service');
require('rxjs/add/operator/switchMap');
var hero_1 = require('./hero');
var question_service_1 = require('./question.service');
var HeroEditComponent = (function () {
    function HeroEditComponent(heroService, route, location, questionService) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
        this.questionService = questionService;
        this.questions = questionService.getQuestions();
    }
    HeroEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.heroService.getHero(+params['id']); })
            .subscribe(function (hero) { return _this.hero = hero; });
    };
    HeroEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    HeroEditComponent.prototype.save = function () {
        var _this = this;
        this.heroService.update(this.hero)
            .then(function () { return _this.goBack(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hero_1.Hero)
    ], HeroEditComponent.prototype, "hero", void 0);
    HeroEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-hero-edit',
            templateUrl: 'hero-edit.component.html',
            styleUrls: ['./hero-edit.component.css'],
            providers: [question_service_1.QuestionService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.ActivatedRoute, common_1.Location, question_service_1.QuestionService])
    ], HeroEditComponent);
    return HeroEditComponent;
}());
exports.HeroEditComponent = HeroEditComponent;
//# sourceMappingURL=hero-edit.component.js.map