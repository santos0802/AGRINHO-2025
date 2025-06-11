let trator;
let produtos = [];
let entregas = [];
let bandeirinhas = [];

function setup() {
  createCanvas(800, 400);

  // Cria o trator no meio do mapa
  trator = createVector(100, height / 2);

  // Cria produtos no campo
  for (let i = 0; i < 3; i++) {
    produtos.push(createVector(random(50, 300), random(50, height - 50)));
  }

  // Cria pontos de entrega na cidade
  for (let i = 0; i < 3; i++) {
    entregas.push(createVector(random(500, 750), random(50, height - 50)));
  }
}

function draw() {
  background(200, 255, 200);

  // Divide o campo e cidade
  fill(150, 255, 150);
  rect(0, 0, 400, height); // campo
  fill(180, 220, 255);
  rect(400, 0, 400, height); // cidade

  // Título
  fill(0);
  textSize(20);
  text("Caminhos da Colheita", 10, 25);

  // Desenha os produtos
  for (let i = 0; i < produtos.length; i++) {
    fill(255, 215, 0);
    ellipse(produtos[i].x, produtos[i].y, 20, 20);
    fill(0);
    textSize(10);
    text("Milho", produtos[i].x - 15, produtos[i].y + 15);
  }

  // Desenha os pontos de entrega
  for (let i = 0; i < entregas.length; i++) {
    fill(255, 100, 100);
    rect(entregas[i].x, entregas[i].y, 30, 30);
    fill(0);
    textSize(10);
    text("Feira", entregas[i].x - 5, entregas[i].y + 45);
  }

  // Desenha o trator
  fill(0, 100, 255);
  rect(trator.x, trator.y, 30, 30);

  // Move o trator
  if (keyIsDown(LEFT_ARROW)) trator.x -= 2;
  if (keyIsDown(RIGHT_ARROW)) trator.x += 2;
  if (keyIsDown(UP_ARROW)) trator.y -= 2;
  if (keyIsDown(DOWN_ARROW)) trator.y += 2;

  // Verifica coleta
  for (let i = produtos.length - 1; i >= 0; i--) {
    if (dist(trator.x, trator.y, produtos[i].x, produtos[i].y) < 30) {
      produtos.splice(i, 1);
      trator.coletou = true;
    }
  }

  // Verifica entrega
  if (trator.coletou) {
    for (let i = entregas.length - 1; i >= 0; i--) {
      if (dist(trator.x, trator.y, entregas[i].x, entregas[i].y) < 30) {
        bandeirinhas.push(createVector(entregas[i].x, entregas[i].y));
        entregas.splice(i, 1);
        trator.coletou = false;
      }
    }
  }

  // Desenha bandeirinhas de festa
  for (let i = 0; i < bandeirinhas.length; i++) {
    fill(random(255), random(255), random(255));
    triangle(
      bandeirinhas[i].x,
      bandeirinhas[i].y,
      bandeirinhas[i].x + 10,
      bandeirinhas[i].y - 15,
      bandeirinhas[i].x + 20,
      bandeirinhas[i].y
    );
  }

  // Instruções
  fill(0);
  textSize(12);
  text("Use as setas para mover. Pegue o milho no campo e leve para a feira!", 10, height - 10);
}

