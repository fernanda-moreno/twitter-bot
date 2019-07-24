PImage img;

void setup() {
  size(410, 273);
  img = loadImage("white.jpg");
  save("uh.png");
}

void draw() {
  image(img, 0, 0);
  exit();
}
