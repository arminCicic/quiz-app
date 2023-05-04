import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Autoplay, Pagination, Navigation } from "swiper";
import Swiper from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizComponent {

  questions = [
    {
      name: "Question 1",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique. 1"
    },
    {
      name: "Question 2",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    },
    {
      name: "Question 3",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    }
  ];
  


  answerVisible = [false, false, false];

  swiper: Swiper | undefined;

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper', {
     
      direction: 'horizontal',
      loop: true,

           
      pagination: {
        el: '.swiper-pagination',
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });   
   
  } 

  showAnswer(index: number) {
    this.answerVisible[index] = !this.answerVisible[index];
  }



}
