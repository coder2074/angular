// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap';
import { Hero } from './hero';

import { QuestionService } from './question.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-edit',
  templateUrl: 'hero-edit.component.html',
  styleUrls: [ './hero-edit.component.css' ],
  providers:  [QuestionService]
})

export class HeroEditComponent implements OnInit {
  @Input() hero: Hero;

  questions: any[];

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService
  ) {
    this.questions = questionService.getQuestions();
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  this.heroService.update(this.hero)
    .then(() => this.goBack());
  }


}
