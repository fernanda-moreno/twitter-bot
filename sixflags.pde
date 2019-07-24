PImage img;

void setup() {
  size(400, 500);
  img = loadImage("rsz_six.jpg");
  save("uh2.png");
}

void draw() {
  image(img, 0, 0);
  exit();
}
