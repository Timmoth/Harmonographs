export class Harmonographs {
  width: number;
  height: number;
  phaseDifference: number;
  points: [number, number][];
  phases: string[];
  iteration: number;
  iterationDelta: number;
  frequencyRatio: number;
  deltaPhaseDifference: number;
  A: number;
  B: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.A = this.width / 2 - 100;
    this.B = this.height / 2 - 100;
    this.points = [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 5],
      [5, 6],
    ];
    this.phases = ["0", "π/2", "3π/4", "π"];

    this.phaseDifference = 0.1;
    this.deltaPhaseDifference = 0.01;
    this.frequencyRatio = 0;
    this.iteration = 1;
    this.iterationDelta = 5;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.phaseDifference >= Math.PI) {
      this.frequencyRatio = (this.frequencyRatio + 1) % this.points.length;
      this.deltaPhaseDifference *= -1;
    } else if (this.phaseDifference <= 0) {
      this.deltaPhaseDifference *= -1;
    }

    this.phaseDifference += this.deltaPhaseDifference;

    var a = this.points[this.frequencyRatio][0];
    var b = this.points[this.frequencyRatio][1];

    ctx.lineWidth = 4;

    this.harmonograph(ctx);
    return;
    var d = 0.02;
    for (var i = d; i < 2 * Math.PI + d; i += d) {
      this.drawLineSegment(ctx, i - d, i, a, b);
    }

    ctx.shadowBlur = 0;
    ctx.font = "25px pixel";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "top";
    var text = `Freq ratio: ${a}:${b}, Phase: ${
      this.phases[
        Math.round((this.phaseDifference / Math.PI) * (this.phases.length - 1))
      ]
    }`;
    ctx.fillText(text, 10, this.height - 30);
  }

  harmonograph(ctx: CanvasRenderingContext2D) {
    var A = 390;
    var B = 390;
    var a = 2.0;
    var b = 2.01;
    var p1 = 0.3;
    var p2 = 1.7;
    var d1 = 0.001;
    var d2 = 0.001;
    if (this.iteration > 3000 || this.iteration <= 0) {
      this.iterationDelta *= -1;
    }
    this.iteration += this.iterationDelta;
    var t = this.iteration - 500;
    ctx.lineWidth = 3;

    var res = 0.1;

    var i = 0;
    while (t < this.iteration) {
      var x = Math.sin(a * t + p1) * A * Math.exp(-d1 * t);
      var y = Math.sin(b * t + p2) * B * Math.exp(-d2 * t);
      ctx.strokeStyle =
        "hsl(" + ((t - this.iteration) / 500) * 360 + ",100%,50%)";
      ctx.shadowBlur = 40;
      ctx.shadowColor =
        "hsl(" + ((t - this.iteration) / 500) * 360 + ",100%,50%)";
      ctx.beginPath();
      ctx.moveTo(this.width / 2 + x, this.height / 2 + y);

      for (var i = 0; i < 100 && t < this.iteration; i += res) {
        t += res;
        x = Math.sin(a * t + p1) * A * Math.exp(-d1 * t);
        y = Math.sin(b * t + p2) * B * Math.exp(-d2 * t);
        ctx.lineTo(this.width / 2 + x, this.height / 2 + y);
      }

      ctx.stroke();
      ctx.closePath();
    }
  }

  drawLineSegment(
    ctx: CanvasRenderingContext2D,
    start: number,
    end: number,
    a: number,
    b: number
  ) {
    var x = this.A * Math.sin(a * start + this.phaseDifference);
    var y = this.B * Math.sin(b * start);
    ctx.strokeStyle = "hsl(" + (start / (2 * Math.PI)) * 360 + ",100%,50%)";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "hsl(" + (start / (2 * Math.PI)) * 360 + ",100%,50%)";

    ctx.beginPath();
    ctx.moveTo(this.width / 2 + x, this.height / 2 + y);
    for (var t = start + 0.01; t <= end + 0.01; t += 0.01) {
      x = this.A * Math.sin(a * t + this.phaseDifference);
      y = this.B * Math.sin(b * t);
      ctx.lineTo(this.width / 2 + x, this.height / 2 + y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
