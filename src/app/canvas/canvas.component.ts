import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Machine } from '../Classes/machine';
import { Part } from '../Classes/part';
import { Queue } from '../Classes/queue';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  parts: Part[] = [];

  ngOnInit(): void {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.initMouseInput();
    let m0: Machine = new Machine(250, 100, 0);
    let m1: Machine = new Machine(200, 200, 1);
    let q0: Queue = new Queue(100, 100, 0);
    let q1: Queue = new Queue(400, 150, 1);
    q0.setNext([m0, m1]);
    m0.setNext([q1]);
    m1.setNext([q1]);
    this.parts.push(m0, m1, q0, q1);
  }

  render() {
    this.parts.forEach((part) => {
      part.update(this.ctx);
    });
  }

  initMouseInput() {
    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      this.render();
    });
  }
}
