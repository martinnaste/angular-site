import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as d3 from "d3";

declare function randomData(data: any):any;
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
/*
The code in here was worked from and copied from https://blog.logrocket.com/data-visualization-angular-d3/ 
and https://www.d3indepth.com/shapes/#centroid
I made reference to https://www.youtube.com/watch?v=P8KNr0pDqio&ab_channel=CryptersInfotech to understand some of the functionality of d3
however I did not have time to implement something myself inside angular.
So i could get a better understanding of how to implement javascript functionality/d3 inside angular components 
*/
export class PiechartComponent implements AfterViewInit {

  private data = [
    {name: "t", value: 19912018},
    {name: "e", value: 20501982},
    {name: "n", value: 21698010},
    {name: "l", value: 22525490},
    {name: "e", value: 21370368},
    {name: "t", value: 21354481},
    {name: "t", value: 18415681},
    {name: "e", value: 14547446},
    {name: "r", value: 7730129},
    {name: "s", value: 5938752},
  ]
  private colour:any;
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;

  @ViewChild('pie') elementRef!: ElementRef;//calling the html element
  private pie!: HTMLElement;
  
  constructor() { }
  
  onClick(){
    //fill an array with 10 random numbers
    //refresh the pie chart
    randomData(this.data);
    this.drawChart();
  } 

  ngAfterViewInit(): void {
    this.pie = this.elementRef.nativeElement;//referring to the html element
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select("#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colour = d3.scaleOrdinal(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782", "#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().sort(null).value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: string) => (this.colour(i)))
    .attr("stroke", "#ffffff")
    .style("stroke-width", "1px");

    //Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: { data: { name: any; }; }) => d.data.name)
    .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);    
  }

}
