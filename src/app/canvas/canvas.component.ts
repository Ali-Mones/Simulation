import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Machine } from '../Classes/machine';
import { Part } from '../Classes/part';
import { Queue } from '../Classes/queue';
import { LinkState } from '../States/LinkState';
import { NormalState } from '../States/NormalState';
import { State } from '../States/state';
import { UnlinkState } from '../States/UnlinkState';

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
  qID: number = 0;
  mID: number = 0;
  state: State = new NormalState(this);

  ngOnInit(): void {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.initMouseInput();
  }

  private render() {
    this.ctx.fillStyle = '#FFF';
    this.ctx.fillRect(0, 0, 1536, 661);
    this.parts.forEach((part) => {
      part.update(this.ctx);
    });
  }

  private initMouseInput() {
    this.canvas.nativeElement.addEventListener('mousedown', (e) => { this.render(); this.state.mouseDown(e); });
    this.canvas.nativeElement.addEventListener('mouseup', (e) => { this.render(); this.state.mouseUp(e); });
    this.canvas.nativeElement.addEventListener('mousemove', (e) => { this.render(); this.state.mouseMove(e); });
  }

  addQ() {
    let q: Queue = new Queue(500, 500, this.qID++);
    this.parts.push(q);
    this.render();
  }

  addM() {
    let m: Machine = new Machine(500, 500, this.mID++);
    this.parts.push(m);
    this.render();
  }

  addLink() {
    this.state = new LinkState(this);
  }

  unlink() {
    this.state = new UnlinkState(this);
  }
}
