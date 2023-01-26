import { CanvasComponent } from "../canvas/canvas.component";
import { Part } from "../Classes/part";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class LinkState extends State {

    private to!: Part;
    private from!: Part;

    mouseUp(e: MouseEvent): void {
        this.canvas.parts.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 28)) {
                if (!this.from) {
                    this.from = part;
                }
                else {
                    this.to = part;
                    this.from.addNext(this.to);
                    this.canvas.state = new NormalState(this.canvas);
                }
            }
        });
    }
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
}