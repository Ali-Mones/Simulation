import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, lastValueFrom, take, takeWhile, tap } from 'rxjs';
import { BackendCommunicatorService } from '../Services/backend-communicator.service';
import { Adapter, MachineInfo, QueueInfo } from '../Classes/Adapter';
import { Machine } from '../Classes/Machine';
import { Part } from '../Classes/Part';
import { Queue } from '../Classes/Queue';
import { LinkState } from '../States/LinkState';
import { NormalState } from '../States/NormalState';
import { UnlinkState } from '../States/UnlinkState';
import { State } from '../States/state';

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
  input: number = 0;
  
  constructor(
    private backend: BackendCommunicatorService
  ) {}
    
  ngOnInit() {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.initMouseInput();
    setInterval(this.update.bind(this), 1000);
  }

  update() {
    this.ctx.clearRect(0, 0, 1536, 661);
    this.parts.forEach((part) => {
      part.update(this.ctx);
    });
    this.backend.isSimulationFinished().pipe(take(1), tap((value) => {
      if (value)
        console.log(value);
    })).subscribe();
  }
  
  startSimulation() {
    let machines: MachineInfo[] = [];
    let queues: QueueInfo[] = [];
    this.parts.forEach((part) => {
      if (part instanceof Machine)
        machines.push(Adapter.toMachineInfo(part));
      else if (part instanceof Queue)
        queues.push(Adapter.toQueueInfo(part));
    });
    if (this.input > 0) {
      this.backend.startSimulation(JSON.stringify(machines), JSON.stringify(queues), this.input).pipe(take(1)).subscribe();
    }
  }
  
  private initMouseInput() {
    this.canvas.nativeElement.addEventListener('mousedown', (e) => { this.state.mouseDown(e); });
    this.canvas.nativeElement.addEventListener('mouseup', (e) => { this.state.mouseUp(e); });
    this.canvas.nativeElement.addEventListener('mousemove', (e) => { this.state.mouseMove(e); });
  }

  
  addQ() {
    let q: Queue = new Queue(500, 500, this.qID++);
    this.parts.push(q);
    this.update();
  }

  addM() {
    let m: Machine = new Machine(500, 500, this.mID++);
    this.parts.push(m);
    this.update();
  }

  addLink() {
    this.state = new LinkState(this);
  }

  unlink() {
    this.state = new UnlinkState(this);
  }
}
