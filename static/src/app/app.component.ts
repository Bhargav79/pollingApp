import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { PollService } from '../app/app.service';
import { forkJoin } from "rxjs/observable/forkJoin";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[PollService]
})
export class AppComponent implements OnInit {
  title = 'app';
  
  studentname:string;
  connection;
  apple:number;
  banana:number;
  pineapple:number;
  orange:number;
  snacks = [];

  constructor(private service:PollService){
  }

  // Bar Chart Properties
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = ['Apple', 'Banana', 'Orange', 'Pineapple'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {
      data: [],
      label: 'Snacks'
    }
  ];

 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
    ngOnInit() {


          let applefruit = this.service.getAllFruit('apple');
          let orangefruit = this.service.getAllFruit('orange');
          let bananafruit = this.service.getAllFruit('banana');
          let pineapplefruit = this.service.getAllFruit('pineapple');

        forkJoin([applefruit,bananafruit,orangefruit,pineapplefruit]).subscribe(results=>{
          this.apple = results[0].length;
          this.banana = results[1].length;
          this.orange = results[2].length;
          this.pineapple = results[2].length;
          this.snacks.push({
              Name:"Apple",
              Total:this.apple
            },
            {
              Name:"Orange",
              Total:this.orange 
            },
            {
              Name:"Banana",
              Total:this.banana
            },
            {
              Name:"Pineapple",
              Total:this.pineapple
            });
            this.barChartData =[this.apple, this.banana, this.orange , this.pineapple];
            this.snacks.sort(function(a, b){
              return b.Total-a.Total
            });
            console.log(this.snacks);
        });

    

    }




    //Sending Poll Using REST
    sendAway(value){
      console.log(value);
      let poll = {
        studentname:this.studentname,
        fruitname:value
      }
      this.service.startpoll(poll).subscribe(data=>{
        console.log(data);
        this.snacks = [];

            let applefruit = this.service.getAllFruit('apple');
            let orangefruit = this.service.getAllFruit('orange');
            let bananafruit = this.service.getAllFruit('banana');
            let pineapplefruit = this.service.getAllFruit('pineapple');

          forkJoin([applefruit,bananafruit,orangefruit,pineapplefruit]).subscribe(results=>{
            this.apple = results[0].length;
            this.banana = results[1].length;
            this.orange = results[2].length;
            this.pineapple = results[2].length;
            this.snacks.push({
                Name:"Apple",
                Total:this.apple
              },
              {
                Name:"Orange",
                Total:this.orange 
              },
              {
                Name:"Banana",
                Total:this.banana
              },
              {
                Name:"Pineapple",
                Total:this.pineapple
              });
              this.barChartData =[this.apple, this.banana, this.orange , this.pineapple];
              this.snacks.sort(function(a, b){
                return b.Total-a.Total
              });
              console.log(this.snacks);
          });

      });
    }


}