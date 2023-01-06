import { Harmonographs } from "./Harmonographs";

export default class HarmonographsApp {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  harmonographs: Harmonographs;
  lastTimeStamp: number;

  constructor() {
    this.canvas = document.getElementById(
      "Harmonographs-canvas"
    ) as HTMLCanvasElement;

    if (this.canvas == null) {
      throw new Error("Could not find canvas.");
    }

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.harmonographs = new Harmonographs(
      this.canvas.width,
      this.canvas.height
    );

    this.lastTimeStamp = 0;
  }

  Start() {
    this.animate(0);
  }

  animate(timestamp: number) {
    if (timestamp - this.lastTimeStamp >= 10) {
      this.lastTimeStamp = timestamp;
      this.draw();
    }
    requestAnimationFrame((n) => this.animate(n));
  }

  draw() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.harmonographs.draw(this.ctx);
  }
}
