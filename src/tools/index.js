const Def = {
  colors: [
    "rgba(5, 232, 221,0.7)",
    "rgba(5, 39, 232,0.7)",
    "rgba(160, 5, 232,0.7)",
    "rgba(232, 96, 5,0.7)",
    "rgba(232, 5, 111,0.7)",
    "rgba(232, 221, 5,0.7)",
    "rgba(100, 232, 5,0.7)",
  ],
};
let Img = {
  robot: "../assets/robot.png",
};
Object.keys(Img).forEach((name) => {
  const img = new Image();
  img.src = Img[name];
  Img[name] = img;
});
// https://www.npmjs.com/package/floorplan-builder
const Tools = {
  drawCanvas(canvas, rooms, robot) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, 1200, 800);
    Tools.drawGrid(ctx, canvas);
    Tools.drawRooms(ctx, rooms);
    Tools.drawRobot(ctx, robot);
  },
  drawGrid(ctx, canvas, size = 50) {
    const cols = canvas.width / size;
    const rows = canvas.height / size;

    Array.from({ length: rows }, (x, i) => {
      return Array.from({ length: cols }, (y, u) => {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(u * 50, i * 50, 50, 50);
        return false;
      });
    });
  },
  drawRooms(ctx, rooms) {
    rooms.forEach((room) => {
      ctx.fillStyle = room.color;
      ctx.fillRect(
        room.pos.x * 50,
        room.pos.y * 50,
        room.size.width * 50,
        room.size.height * 50
      );
      ctx.strokeStyle = "rgba(220,220,220,1)";
      ctx.lineWidth = 10;
      ctx.strokeRect(
        room.pos.x * 50,
        room.pos.y * 50,
        room.size.width * 50,
        room.size.height * 50
      );
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        room.pos.x * 50 + 5,
        room.pos.y * 50 + 5,
        room.size.width * 50 - 11,
        room.size.height * 50 - 11
      );
      ctx.fillStyle = "#000";
      ctx.fillText(room.name, room.pos.x * 50 + 10, room.pos.y * 50 + 20);
    });
  },
  drawRobot(ctx, robot) {
    ctx.fillStyle = "rgba(120, 120, 120, 0.9)";
    ctx.beginPath();
    ctx.moveTo(robot.pos.x, robot.pos.y);
    ctx.arc(
      robot.pos.x + 50 - 16,
      robot.pos.y + 50 - 16,
      10,
      0,
      2 * Math.PI,
      false
    );
    // ctx.closePath();
    ctx.fill();
    // ctx.fillRect(
    //   robot.pos.x * 50 + 50 - 16,
    //   robot.pos.y * 50 + 50 - 16,
    //   20,
    //   20
    // );
  },
  makeMap(size = 6) {
    const rooms = Tools.randomRooms(size);
    const robot = Tools.newRobot(rooms);
    return {
      rooms,
      robot,
    };
  },
  newRobot() {
    return {
      findRoom(rooms) {
        return rooms.find((room) => {
          return room.allCoord().find((test) => {
            return (
              test.x * 50 >= this.pos.x &&
              (test.x + 1) * 50 <= this.pos.x &&
              test.y === this.pos.y &&
              (test.y + 1) * 50 <= this.pos.y
            );
          });
        });
      },
      status: "waiting",
      pos: { x: 100, y: 100 },
    };
  },

  randomRooms(size) {
    return Array.from({ length: size }, (x, i) => {
      return {
        name: `Piece ${i}`,
        size: { width: Tools.randomInt(3, 4), height: Tools.randomInt(2, 3) },
        color: Def.colors[i],
        allCoord() {
          const sizeWidth = this.size.width;
          const sizeHeight = this.size.height;

          let allCoord = [];
          Array.from({ length: sizeWidth }, (x, i) => {
            return Array.from({ length: sizeHeight }, (y, u) => {
              return allCoord.push({ x: this.pos.x + i, y: this.pos.y + u });
            });
          });

          return allCoord;
        },
      };
    }).map((room, index, self) => {
      if (self[index - 1]) {
        const XorY = Math.random() >= 0.5 ? true : false;
        room.pos = {
          x: self[index - 1].pos.x + (XorY ? self[index - 1].size.width : 0),
          y: self[index - 1].pos.y + (!XorY ? self[index - 1].size.height : 0),
        };
      } else {
        room.pos = { x: 1, y: 1 };
      }
      return room;
    });
  },
  randomInt(min = 1, max = 6) {
    return Math.floor(Math.random() * max) + min;
  },
};
module.exports = Tools;
