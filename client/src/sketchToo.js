const sketchToo = p5 => {
  let height = 600;
  let width = 700;

  let c1r = p5.random(255);
  let c1g = p5.random(255);
  let c1b = p5.random(255);

  let c2r = p5.random(255);
  let c2g = p5.random(255);
  let c2b = p5.random(255);

  let chance = Math.floor(Math.random() * 1000);

  p5.setup = () => {
    p5.createCanvas(width, height);
    p5.angleMode(p5.DEGREES);
    p5.noLoop();

    let c1 = p5.color(c1r, c1b, c1g);
    let c2 = p5.color(c2r, c2b, c2g);

    for(let y = 0; y < height; y++) {
      let n = p5.map(y, 0, height, 0, 1);
      let newc = p5.lerpColor(c1, c2, n);
      p5.stroke(newc);
      p5.line(0, y, width, y);
    }
  };

  p5.draw = () => {
    p5.translate(width / 2, height / 2 + 200);
    p5.branch(75);
  }

  p5.branch = (length) => {
    p5.push();
    if (length > 10) {
      p5.strokeWeight(p5.map(length, 10, p5.random(150, 250), 1, 15), true);
      p5.stroke(70, 40, 10);
      p5.line(0, 0, 0, -length);
      p5.translate(0, -length);
      p5.rotate(p5.random(-10, -40));
      p5.branch(length * p5.random(p5.random(0.7, 0.99), p5.random(0.2, 0.99)));
      p5.rotate(p5.random(40, 80));
      p5.branch(length * p5.random(p5.random(0.7, 0.99), p5.random(0.2, 0.99)));
    } else {
      let r, g, b;

      if (chance < 4) {
        r = p5.random(255);
        g = p5.random(255);
        b = p5.random(255);
      } else {
        r = p5.random(c1r, c2r);
        g = p5.random(c1g, c2g);
        b = p5.random(c1b, c2b);
      }

      p5.fill(r, g, b, p5.random(125, 200));
      p5.noStroke();

      p5.beginShape()
      for (let k = 45; k < 135; k++) {
        let rad = 15;
        let x = rad * p5.cos(k);
        let y = rad * p5.sin(k);
        p5.vertex(x, y);
      }
      for (let k = 135; k > 40; k--) {
        let rad = 15;
        let x = rad * p5.cos(k);
        let y = rad * p5.sin(-k) + 20;
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);
    }
    p5.pop();
  }
}

module.exports = {
  sketchToo
}
