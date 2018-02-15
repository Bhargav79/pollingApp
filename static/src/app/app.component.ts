import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { PollService } from '../app/app.service';
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

   
      this.service.getAllFruit('apple').subscribe(apple=>{
        console.log(apple.length);
        this.apple = apple.length;
        this.snacks.push({
          Name:"Apple",
          Total:this.apple
        });


        this.service.getAllFruit('orange').subscribe(orange=>{
          console.log(orange.length);
          this.orange = orange.length;
          this.snacks.push({
            Name:"Orange",
            Total:this.orange
          });

          this.service.getAllFruit('banana').subscribe(banana=>{
            console.log(banana.length);
            this.banana = banana.length;
            this.snacks.push({
              Name:"Banana",
              Total:this.banana
            });


            this.service.getAllFruit('pineapple').subscribe(pineapple=>{
              console.log(pineapple.length);
              this.pineapple = pineapple.length;
              this.snacks.push({
                Name:"Pineapple",
                Total:this.pineapple
              });
      
          });

        });


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
        this.service.getAllFruit('apple').subscribe(apple=>{
          console.log(apple.length);
          this.apple = apple.length;
          this.snacks.push({
            Name:"Apple",
            Total:this.apple
          });


          this.service.getAllFruit('orange').subscribe(orange=>{
            console.log(orange.length);
            this.orange = orange.length;
            this.snacks.push({
              Name:"Orange",
              Total:this.orange
            });

            this.service.getAllFruit('banana').subscribe(banana=>{
              console.log(banana.length);
              this.banana = banana.length;
              this.snacks.push({
                Name:"Banana",
                Total:this.banana
              });


              this.service.getAllFruit('pineapple').subscribe(pineapple=>{
                console.log(pineapple.length);
                this.pineapple = pineapple.length;
                this.snacks.push({
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


        });
       
     
       
          
        
        });

      })
    }


}