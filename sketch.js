// Variáveis de jogo
var gameState = 0
var dialogueState = 0
var BulletState = 0
var player;
var cube;
var cube1;
var invisible_ball
var GuiHeart, GuiHeartImg;
var Dialog, DialogImg
var testGuy, testGuyImg
var closeGame, closeGameImg;
let lastShotTime = 0; 
const COOLDOWN_TIME = 800;
var bulletGui, bulletGuiImg;
let BulletCount = 15;
var invisibleBlock;



function preload() {
  GuiHeartImg = loadImage("./Assets/GUI/Heart.png");
  DialogImg = loadImage("./Assets/Dialog/Dialog.png");
  testGuyImg = loadImage("./Assets/Dialog/TEST_GUY.png");
  closeGameImg = loadImage("./Assets/Dialog/Close.png");
  bulletGuiImg = loadImage("./Assets/GUI/BulletGUI.png")
  
}

// Configurações iniciais
function setup() {
  createCanvas(2200, 1200);
  noStroke();

  player = createSprite(1040, 720, 130, 160);
  cube = createSprite(1040, 720, 90, 90);
  cube1 = createSprite(1140, 720, 90, 90);
  
  GuiHeart = createSprite(170, 120, 90, 90);
  GuiHeart.addImage(GuiHeartImg);

  Dialog = createSprite(1040, 940, 90, 90);
  Dialog.addImage(DialogImg);
  Dialog.scale = 4;
  Dialog.visible = false;

  testGuy = createSprite(340, 870, 90, 90);
  testGuy.addImage(testGuyImg);
  testGuy.scale = 2.3;
  testGuy.visible = false;

  closeGame = createSprite(2100, 90, 90, 90);
  closeGame.addImage(closeGameImg);
  closeGame.scale=2.0;
  closeGame.visible = false;
  
  bulletGui = createSprite(2100, 90, 90, 90);
  bulletGui.addImage(bulletGuiImg);
  bulletGui.scale = 1.2;

  invisibleBlock = createSprite(1800, 90, 50, 50);
  invisibleBlock.visible = false
  

  // Bullets

}

// Loop principal do jogo
function draw() {

  background(200, 240, 200);  





  if(gameState === 0){  
    if(dialogueState === 0){

    // Mover o jogador com as teclas W, A, S e D
      if (keyIsDown(87)) {
        player.position.y -= 10;
        camera.position.y -= 10;
      }
      if (keyIsDown(83)) {
        player.position.y += 10;
        camera.position.y += 10;
      }
      if (keyIsDown(65)) {
        player.position.x -= 10;
        camera.position.x -= 10;
      }
      if (keyIsDown(68)) {
        player.position.x += 10;
        camera.position.x += 10;
      }

    // movimentaçao do gui
      if (keyIsDown(87)) {
        GuiHeart.position.y -= 10;
      
      }
      if (keyIsDown(83)) {
        GuiHeart.position.y += 10;

      }
      if (keyIsDown(65)) {
        GuiHeart.position.x -= 10;

      } 
      if (keyIsDown(68)) {
        GuiHeart.position.x += 10;

      }
// movimento do close    
      if (keyIsDown(87)) {
        closeGame.position.y -= 10;
      
      }
      if (keyIsDown(83)) {
        closeGame.position.y += 10;

      }
      if (keyIsDown(65)) {
        closeGame.position.x -= 10;

      }
      if (keyIsDown(68)) {
        closeGame.position.x += 10;

      }
      // movimento do dialog
      if (keyIsDown(87)) {
        Dialog.position.y -= 10;
        testGuy.position.y -= 10;
      }
      if (keyIsDown(83)) {
        Dialog.position.y += 10;
        testGuy.position.y += 10;
      }
      if (keyIsDown(65)) {
        Dialog.position.x -= 10;
        testGuy.position.x -= 10;
      }
      if (keyIsDown(68)) {
        Dialog.position.x += 10;
        testGuy.position.x += 10;
      }  

      // movimento do dialog
      if (keyIsDown(87)) {
        bulletGui.position.y -= 10;
      }
      if (keyIsDown(83)) {
        bulletGui.position.y += 10;
      }
      if (keyIsDown(65)) {
        bulletGui.position.x -= 10;
      }
      if (keyIsDown(68)) {
        bulletGui.position.x += 10;
      }  

      // not poggers
      if (keyIsDown(87)) {
        invisibleBlock.position.y -= 10;
      }
      if (keyIsDown(83)) {
        invisibleBlock.position.y += 10;
      }
      if (keyIsDown(65)) {
        invisibleBlock.position.x -= 10;
      }
      if (keyIsDown(68)) {
        invisibleBlock.position.x += 10;
      }    



      // sistema de atirar
    if(BulletState === 0){
        const elapsedTime = millis() - lastShotTime;
        if (elapsedTime > COOLDOWN_TIME){
 
        if (keyIsDown(UP_ARROW)) {
          shootProjectile(0, -15);
          BulletCount--;
        }
        if (keyIsDown(DOWN_ARROW)) {
          shootProjectile(0, 15);
          BulletCount--;
        }
        if (keyIsDown(LEFT_ARROW)) {
          shootProjectile(-15, 0);
          BulletCount--;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          shootProjectile(15, 0);
          BulletCount--;
        }
    }       
  }
 }



}
  if(player.isTouching(cube)){
    if(keyIsDown(32)){
      dialogueState = 1
    }
  }




  // Limpar o fundo


  if(dialogueState === 1){
    background("gray")
    Dialog.visible = true
    testGuy.visible = true
    closeGame.visible = true
    GuiHeart.visible = false
    bulletGui.visible = false
  }

  if(BulletCount == 0){
    BulletState = 1
  }

  if(mousePressedOver(closeGame)) {
     dialogueState = 0
     Dialog.visible = false
     testGuy.visible = false
     closeGame.visible = false
     GuiHeart.visible = true
     bulletGui.visible = true
  }
  let bulletText = `Bullet Count: ${max(BulletCount, 0)}`; 
  textFont('Minecraft'); 
  textSize(32)
  text(bulletText, invisibleBlock.x, invisibleBlock.y)

  if(BulletState === 1){
    projectile = false
  }

    


  // Desenhar o jogador  
  drawSprites();  
} 

function shootProjectile(xSpeed, ySpeed) {
  lastShotTime = millis(); // atualiza o tempo do último disparo

  // cria um projetil na posição do jogador com a velocidade especificada
  const projectile = createSprite(player.x, player.y, 10, 10);
  projectile.velocity.x = xSpeed;
  projectile.velocity.y = ySpeed;
}