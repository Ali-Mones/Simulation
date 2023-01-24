import { CanvasComponent } from "../canvas/canvas.component";
import { Part } from "../Classes/part";
import { NormalState } from "./NormalState";
import { State } from "./state";

export class MoveState extends State {

    constructor(
        canvas: CanvasComponent,
        private part: Part,
        private oldMouseX: number,
        private oldMouseY: number
    ) { super(canvas); }

    override mouseUp(): void {
        this.canvas.state = new NormalState(this.canvas);
    }

    override mouseMove(e: MouseEvent): void {
        let diffX = e.x - this.oldMouseX;
        let diffY = e.y - 28 - this.oldMouseY;

        if (this.part) {
            this.part.x += diffX;
            this.part.y += diffY;
        }

        this.oldMouseX = e.x;
        this.oldMouseY = e.y - 28;
    }

    mouseDown(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }

}