function load() {
    canvas = document.getElementById('box');
    var ctx = canvas.getContext('2d');
    var canvasWidth = 1344;//10752;
    var canvasHeight = 640;//5120;
    var tileSize = 8;
    var tileLayer = canvasWidth / tileSize;
    globalX = 0;
    globalY = 0;
    function tile(id, x, y, size, type, blockType, blockVariation) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        this.block = {};
        this.block.type = blockType;
        this.block.variant = blockVariation;

        this.draw = function () {

            this.x = x + globalX;
            this.y = y + globalY;

            if (this.type == 1) {//Path
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "gray";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                    if (this.block.variant == 2) {//Green painted
                        ctx.fillStyle = "white";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "green";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }
            if (this.type == 2) {//Room
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "gray";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "white";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                    if (this.block.variant == 2) {//Green painted
                        ctx.fillStyle = "white";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "green";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }

            if (this.type == 3) {//Wall
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "gray";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "black";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }

            if (this.type == 4) {//Pre-Wall
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "black";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }

            if (this.type == 5) {//Empty space
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "black";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }

            if (this.type == 6) {//Door
                if (this.block.type == 1) {//Basic
                    if (this.block.variant == 1) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "brown";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                    if (this.block.variant == 2) {//Green painted
                        ctx.fillStyle = "brown";
                        ctx.fillRect(this.x, this.y, size, size);
                        ctx.fillStyle = "green";
                        ctx.fillRect(this.x + tileSize / 16, this.y + tileSize / 16, size - tileSize / 8, size - tileSize / 8);
                    }
                }
            }
        }
    }

//  /------------------------|Creating Tiles|------------------------\

    var TCP = {}; //tileCreatingProperties
    TCP.x = 0;
    TCP.y = 0;
    TCP.ids = 0;

    var tiles = [];

    for (var a = 0; a < canvasHeight / tileSize; a++) {
        for (var l = 0; l < canvasWidth / tileSize; l++) {
            tiles.push(new tile(TCP.ids, TCP.x, TCP.y, tileSize, 1, 1, 1));
            TCP.ids++;
            TCP.x += tileSize;
        }
        TCP.x = 0;
        TCP.y += tileSize;
    }

//  \-----------------------------|END|------------------------------/

//  /============================|TOOLS|============================\
    function getTile(direction, id, distanceX, distanceY) {

        if (direction == "up") {
            if (tiles[id - tileLayer * distanceY] === undefined) {
                return false;
            } else {
                return tiles[id - tileLayer * distanceY];
            }
        }
        if (direction == "down") {
            if (tiles[id + tileLayer * distanceY] === undefined) {
                return false;
            } else {
                return tiles[id + tileLayer * distanceY];
            }
        }
        if (direction == "left") {
            if (tiles[id - 1 * distanceX] === undefined) {
                return false;
            } else {
                return tiles[id - 1 * distanceX];
            }
        }
        if (direction == "right") {
            if (tiles[id + 1 * distanceX] === undefined) {
                return false;
            } else {
                return tiles[id + 1 * distanceX];
            }
        }

        if (direction == "leftUp") {
            if (tiles[id - (1 * distanceX) - (tileLayer * distanceY)] === undefined) {
                return false;
            } else {
                return tiles[id - (1 * distanceX) - (tileLayer * distanceY)];
            }
        }
        if (direction == "rightUp") {
            if (tiles[id + (1 * distanceX) - (tileLayer * distanceY)] === undefined) {
                return false;
            } else {
                return tiles[id + (1 * distanceX) - (tileLayer * distanceY)];
            }
        }
        if (direction == "leftDown") {
            if (tiles[id - (1 * distanceX) + (tileLayer * distanceY)] === undefined) {
                return false;
            } else {
                return tiles[id - (1 * distanceX) + (tileLayer * distanceY)];
            }
        }
        if (direction == "rightDown") {
            if (tiles[id + (1 * distanceX) + (tileLayer * distanceY)]) {
                return false;
            } else {
                return tiles[id + (1 * distanceX) + (tileLayer * distanceY)];
            }
        }
    }

    function checkArea(id, width, height, type, detail, mode) {
        var info = [];
        var trues = 0;
        for (var g = 0; g < height; g++) {
            for (var z = 0; z < width; z++) {
                if (mode == "fill") {
                    var tilex = tiles[id + z + (g * tileLayer)];
                    if (!(tilex === undefined)) {
                        if (tilex.type == type) {
                            info.push(true);
                        } else {
                            info.push(false);
                        }
                    }
                }
                if (mode == "stroke") {
                    if (g == 0 || g == height - 1) {
                        tilex = tiles[id + z + (g * tileLayer)];
                        if (!(tilex === undefined)) {
                            if (tilex.type == type) {
                                info.push(true);
                            } else {
                                info.push(false);
                            }
                        }
                    } else {
                        if (z == 0 || z == width - 1) {
                            tilex = tiles[id + z + (g * tileLayer)];
                            if (!(tilex === undefined)) {
                                if (tilex.type == type) {
                                    info.push(true);
                                } else {
                                    info.push(false);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (detail == "simple") {
            for (var h = 0; h < info.length; h++) {
                var infos = info[h];
                if (infos) {
                    trues++;
                }
            }
            return (trues == info.length);
        }
        if (detail == "detailed") {
            return info;
        }
    }

    function drawArea(tileId, width, height, type, mode) {
        var tilez = tiles[tileId];
        if (!(tilez === undefined)) {
            for (var g = 0; g < height; g++) {
                for (var z = 0; z < width; z++) {
                    if (mode == "fill") {
                        var tilex = tiles[tilez.id + z + (g * tileLayer)];
                        if (!(tilex === undefined)) {
                            tilex.type = type;
                        }
                    }
                    if (mode == "stroke") {
                        if (g == 0 || g == height - 1) {
                            tilex = tiles[tilez.id + z + (g * tileLayer)];
                            if (!(tilex === undefined)) {
                                tilex.type = type;
                            }
                        } else {
                            if (z == 0 || z == width - 1) {
                                tilex = tiles[tilez.id + z + (g * tileLayer)];
                                if (!(tilex === undefined)) {
                                    tilex.type = type;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function digPath(id, direction, distance, wall, floor) {
        if (direction == "up") {
            for (k = 1; k < distance; k++) {
                var dirTile = getTile("up", id, 0, k);
                dirTile.type = floor;
                dirTile.block.variant = 1;
                if (getTile("left", dirTile.id, 1, 0).type == 5) {
                    getTile("left", dirTile.id, 1, 0).type = wall;
                    getTile("left", dirTile.id, 1, 0).block.variant = 1;
                }
                if (getTile("right", dirTile.id, 1, 0).type == 5) {
                    getTile("right", dirTile.id, 1, 0).type = wall;
                    getTile("right", dirTile.id, 1, 0).block.variant = 1;
                }
            }
        }
        if (direction == "down") {
            for (k = 1; k < distance; k++) {
                dirTile = getTile("down", id, 0, k);
                dirTile.type = floor;
                dirTile.block.variant = 1;
                if (getTile("left", dirTile.id, 1, 0).type == 5) {
                    getTile("left", dirTile.id, 1, 0).type = wall;
                    getTile("left", dirTile.id, 1, 0).block.variant = 1;
                }
                if (getTile("right", dirTile.id, 1, 0).type == 5) {
                    getTile("right", dirTile.id, 1, 0).type = wall;
                    getTile("right", dirTile.id, 1, 0).block.variant = 1;
                }
            }
        }
        if (direction == "left") {
            for (k = 1; k < distance; k++) {
                dirTile = getTile("left", id, k, 0);
                dirTile.type = floor;
                dirTile.block.variant = 1;
                if (getTile("up", dirTile.id, 0, 1).type == 5) {
                    getTile("up", dirTile.id, 0, 1).type = wall;
                    getTile("up", dirTile.id, 0, 1).block.variant = 1;
                }
                if (getTile("down", dirTile.id, 0, 1).type == 5) {
                    getTile("down", dirTile.id, 0, 1).type = wall;
                    getTile("down", dirTile.id, 0, 1).block.variant = 1;
                }
            }
        }
        if (direction == "right") {
            for (k = 1; k < distance; k++) {
                dirTile = getTile("right", id, k, 0);
                dirTile.type = floor;
                dirTile.block.variant = 1;
                if (getTile("up", dirTile.id, 0, 1).type == 5) {
                    getTile("up", dirTile.id, 0, 1).type = wall;
                    getTile("up", dirTile.id, 0, 1).block.variant = 1;
                }
                if (getTile("down", dirTile.id, 0, 1).type == 5) {
                    getTile("down", dirTile.id, 0, 1).type = wall;
                    getTile("down", dirTile.id, 0, 1).block.variant = 1;
                }
            }
        }
    }

    function detect(id) {
        if ((tiles[id].type == 2) || (tiles[id].type == 1) || (tiles[id].type == 6)) {
            tiles[id].block.variant = 2;
            if ((getTile("up", id, 0, 1).type == 2) && (getTile("up", id, 0, 1).block.variant == 1)) {
                tiles[getTile("up", id, 0, 1).id].block.variant = 2;
                detect(getTile("up", id, 0, 1).id);
            }
            if ((getTile("down", id, 0, 1).type == 2) && (getTile("down", id, 0, 1).block.variant == 1)) {
                tiles[getTile("down", id, 0, 1).id].block.variant = 2;
                detect(getTile("down", id, 0, 1).id);
            }
            if ((getTile("left", id, 1, 0).type == 2) && (getTile("left", id, 1, 0).block.variant == 1)) {
                tiles[getTile("left", id, 1, 0).id].block.variant = 2;
                detect(getTile("left", id, 1, 0).id);
            }
            if ((getTile("right", id, 1, 0).type == 2) && (getTile("right", id, 1, 0).block.variant == 1)) {
                tiles[getTile("right", id, 1, 0).id].block.variant = 2;
                detect(getTile("right", id, 1, 0).id);
            }

            if ((getTile("up", id, 0, 1).type == 1) && (getTile("up", id, 0, 1).block.variant == 1)) {
                tiles[getTile("up", id, 0, 1).id].block.variant = 2;
                detect(getTile("up", id, 0, 1).id);
            }
            if ((getTile("down", id, 0, 1).type == 1) && (getTile("down", id, 0, 1).block.variant == 1)) {
                tiles[getTile("down", id, 0, 1).id].block.variant = 2;
                detect(getTile("down", id, 0, 1).id);
            }
            if ((getTile("left", id, 1, 0).type == 1) && (getTile("left", id, 1, 0).block.variant == 1)) {
                tiles[getTile("left", id, 1, 0).id].block.variant = 2;
                detect(getTile("left", id, 1, 0).id);
            }
            if ((getTile("right", id, 1, 0).type == 1) && (getTile("right", id, 1, 0).block.variant == 1)) {
                tiles[getTile("right", id, 1, 0).id].block.variant = 2;
                detect(getTile("right", id, 1, 0).id);
            }

            if ((getTile("up", id, 0, 1).type == 6) && (getTile("up", id, 0, 1).block.variant == 1)) {
                tiles[getTile("up", id, 0, 1).id].block.variant = 2;
                detect(getTile("up", id, 0, 1).id);
            }
            if ((getTile("down", id, 0, 1).type == 6) && (getTile("down", id, 0, 1).block.variant == 1)) {
                tiles[getTile("down", id, 0, 1).id].block.variant = 2;
                detect(getTile("down", id, 0, 1).id);
            }
            if ((getTile("left", id, 1, 0).type == 6) && (getTile("left", id, 1, 0).block.variant == 1)) {
                tiles[getTile("left", id, 1, 0).id].block.variant = 2;
                detect(getTile("left", id, 1, 0).id);
            }
            if ((getTile("right", id, 1, 0).type == 6) && (getTile("right", id, 1, 0).block.variant == 1)) {
                tiles[getTile("right", id, 1, 0).id].block.variant = 2;
                detect(getTile("right", id, 1, 0).id);
            }
        }
    }

    function connectRooms() {
        var distance = 1;
        var keep = {};
        keep.up = keep.down = keep.left = keep.right = true;
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            keep.up = keep.down = keep.left = keep.right = true;
            if ((tilez.block.variant == 1) && (tilez.type == 1)) {
                if (getTile("up", tilez.id, 0, 1).type == 3) {
                    distance = 0;
                    for (; keep.up; distance++) {
                        if ((getTile("up", tilez.id, 0, distance) != false) && (getTile("up", tilez.id, 0, distance).y != 0)) {
                            if ((getTile("up", tilez.id, 0, distance).type == 2) || (getTile("up", tilez.id, 0, distance).type == 6)) {
                                keep.up = false;
                                distance = 0;
                            }
                            if (getTile("up", tilez.id, 0, distance).block.variant == 2) {
                                keep.up = false;
                                i = tiles.length + 1;
                                digPath(tilez.id, "up", distance, 3, 1);
                                distance = 0;
                            }
                        } else {
                            keep.up = false;
                            distance = 0;
                        }
                    }
                }

                if (getTile("down", tilez.id, 0, 1).type == 3) {
                    distance = 0;
                    for (; keep.down; distance++) {
                        if ((getTile("down", tilez.id, 0, distance) != false) && (getTile("down", tilez.id, 0, distance).y != canvasHeight)) {
                            if ((getTile("down", tilez.id, 0, distance).type == 2) || (getTile("down", tilez.id, 0, distance).type == 6)) {
                                keep.down = false;
                                distance = 0;
                            }
                            if (getTile("down", tilez.id, 0, distance).block.variant == 2) {
                                keep.down = false;
                                i = tiles.length + 1;
                                digPath(tilez.id, "down", distance, 3, 1);
                                distance = 0;
                            }
                        } else {
                            keep.down = false;
                            distance = 0;
                        }
                    }
                }

                if (getTile("left", tilez.id, 1, 0).type == 3) {
                    distance = 0;
                    for (; keep.left; distance++) {
                        if ((getTile("left", tilez.id, distance, 0) != false) && (getTile("left", tilez.id, distance, 0).x != 0)) {
                            if ((getTile("left", tilez.id, distance, 0).type == 2) || (getTile("left", tilez.id, distance, 0).type == 6)) {
                                keep.left = false;
                                distance = 0;
                            }
                            if (getTile("left", tilez.id, distance, 0).block.variant == 2) {
                                keep.left = false;
                                i = tiles.length + 1;
                                digPath(tilez.id, "left", distance, 3, 1);
                                distance = 0;
                            }
                        } else {
                            keep.left = false;
                            distance = 0;
                        }
                    }
                }

                if (getTile("right", tilez.id, 1, 0).type == 3) {
                    distance = 0;
                    for (; keep.right; distance++) {
                        if ((getTile("right", tilez.id, distance, 0) != false) && (getTile("right", tilez.id, distance, 0).x != canvasWidth)) {
                            if ((getTile("right", tilez.id, distance, 0).type == 2) || (getTile("right", tilez.id, distance, 0).type == 6)) {
                                keep.right = false;
                                distance = 0;
                            }
                            if (getTile("right", tilez.id, distance, 0).block.variant == 2) {
                                keep.right = false;
                                i = tiles.length + 1;
                                digPath(tilez.id, "right", distance, 3, 1);
                                distance = 0;
                            }
                        } else {
                            keep.right = false;
                            distance = 0;
                        }
                    }
                }

            }
        }
        //Other option: generate another room till it's all connected.
    }

//  \==================================================|END|===============================================/

//  /============================================|Carving dungeon|===============================================\

    function generateDungeon() {

        //CREATE ROOMS
        for (i = 0; i < 250; i++) {
            tilez = tiles[Math.floor(Math.random() * tiles.length)];
            if (tilez.type == 1) {
                var roomWidth = Math.floor(Math.random() * 5 + 2);
                var roomHeight = Math.floor(Math.random() * 5 + 2);
                if (tilez.x > tileSize * 3 && tilez.y > tileSize * 3 && tilez.x + tileSize * roomWidth < canvasWidth - tileSize * 3 &&
                    tilez.y + tileSize * roomHeight < canvasHeight - tileSize * 3) {
                    if (checkArea(tiles[tilez.id - tileLayer - 1].id, roomWidth + 2, roomHeight + 2, 1, "simple", "fill")) {
                        drawArea(tilez.id, roomWidth, roomHeight, 2, "fill");
                    }
                }
            }
        }

        //CREATE WALLS
        var CW = {};
        CW.trues = 0;
        CW.infoz = 0;
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            if (tilez.type == 1) {
                CW.trues = 0;
                if (!(tiles[i - tileLayer - 1] === undefined)) {
                    for (var j = 0; j < checkArea(tiles[i - tileLayer - 1].id, 3, 3, 2, "detailed", "fill").length; j++) {
                        CW.infoz = checkArea(tiles[i - tileLayer - 1].id, 3, 3, 2, "detailed", "fill")[j];
                        if (CW.infoz) {
                            CW.trues++;
                        }
                    }
                    if (CW.trues > 0) {
                        tilez.type = 3;
                    }
                }
            }
        }

        //CREATE A MAZE
        var CM = {};
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            if (tilez.type == 1) {
                CM.trues = 0;
                if (!(tiles[i - tileLayer - 1] === undefined)) {
                    for (j = 0; j < checkArea(tiles[i - tileLayer - 1].id, 3, 3, 3, "detailed", "fill").length; j++) {
                        CM.infoz = checkArea(tiles[i - tileLayer - 1].id, 3, 3, 3, "detailed", "fill")[j];
                        if (CM.infoz) {
                            CM.trues++;
                        }
                    }
                    if (CM.trues < 1) {
                        tilez.type = 4;
                    }
                } else {
                    tilez.type = 4;
                }

            }
        }
        for (var i = 0; i < tiles.length; i++) {
            var tilez = tiles[i];
            if (tilez.type == 4) {
                tilez.type = 3;
            }
        }


        //More rooms //Not sure if this is needed...
        /*for (i = 0; i < tiles.length; i++){
         tilez = tiles[i];
         roomWidth = Math.floor(Math.random() * 5 + 2);
         roomHeight = Math.floor(Math.random() * 5 + 2);
         if (tilez.x > tileSize && tilez.y > tileSize && tilez.x+tileSize*roomWidth < canvasWidth-tileSize &&
         tilez.y+tileSize*roomHeight < canvasHeight-tileSize) {
         if (checkArea(tiles[tilez.id-tileLayer-1-tileLayer-1].id, roomWidth+4, roomHeight+4, 4,"simple")) {
         drawArea(tilez.id, roomWidth, roomHeight, 2, "fill");
         drawArea(tiles[tilez.id-1-tileLayer].id, roomWidth+2, roomHeight+2, 3, "stroke");
         drawArea(tiles[tilez.id-1-tileLayer-1-tileLayer].id, roomWidth+4, roomHeight+4, 1, "stroke");
         }
         }
         }*/

        //CREATE EMPTY SPACE
        var CES = {};
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            if (!(tiles[tilez.id - 1 - tileLayer] === undefined)) {
                CES.info = [];
                CES.trues = 0;
                for (var g = 0; g < 3; g++) {
                    for (var z = 0; z < 3; z++) {
                        var tilex = tiles[tiles[tilez.id - 1 - tileLayer].id + z + (g * tileLayer)];
                        if (!(tilex === undefined)) {
                            if (tilex.type == 3 || tilex.type == 5) {
                                CES.info.push(true);
                            } else {
                                CES.info.push(false);
                            }
                        }
                    }
                }
                for (var h = 0; h < CES.info.length; h++) {
                    CES.infos = CES.info[h];
                    if (CES.infos) {
                        CES.trues++;
                    }
                }
                if (CES.trues == CES.info.length) {
                    tilez.type = 5;
                }
            } else {
                if (!(tiles[tilez.id + tileLayer].type == 1)) {
                    tilez.type = 5;
                }
            }
        }

        //FIND and CONNECT ALONE ROOMS
        var FCAR = {};
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            FCAR.otherRoomCounter = 1;
            FCAR.roomW = 0;
            FCAR.roomH = 0;
            FCAR.checkUp = true;
            FCAR.checkDown = true;
            FCAR.checkLeft = true;
            FCAR.checkRight = true;
            FCAR.runCorridor = true;
            if (tilez.type == 2) {
                for (var k = 0; k < FCAR.otherRoomCounter; k++) {
                    if (getTile("down", tilez.id, 0, FCAR.roomH).type == 2) {
                        FCAR.otherRoomCounter++;
                        FCAR.roomH++;
                    }
                    if (getTile("right", tilez.id, FCAR.roomW, 0).type == 2) {
                        FCAR.otherRoomCounter++;
                        FCAR.roomW++;
                    }
                }
                if (checkArea(tiles[i - 3 - tileLayer * 3].id, FCAR.roomW + 6, FCAR.roomH + 6, 3, "simple", "stroke")) {
                    for (g = 0; g < FCAR.roomH + 6; g++) {
                        for (z = 0; z < FCAR.roomW + 6; z++) {
                            tilex = tiles[tiles[i - 3 - tileLayer * 3].id + z + (g * tileLayer)];
                            if (!(tilex === undefined)) {
                                if (tilex.type == 3) {
                                    if (((getTile("left", tilex.id, 1, 0).type == 1) && (getTile("right", tilex.id, 1, 0).type == 1)) || ((getTile("up", tilex.id, 0, 1).type == 1) && (getTile("down", tilex.id, 0, 1).type == 1))) {
                                        tilex.type = 1;
                                        FCAR.runCorridor = false
                                    } else {
                                        if ((getTile("left", tilex.id, 1, 0).type == 1) && (getTile("right", tilex.id, 2, 0).type == 1) && FCAR.checkRight) {
                                            tilex.type = 1;
                                            getTile("right", tilex.id, 1, 0).type = 1;
                                            FCAR.checkRight = false;
                                        }
                                        if ((getTile("left", tilex.id, 2, 0).type == 1) && (getTile("right", tilex.id, 1, 0).type == 1) && FCAR.checkLeft) {
                                            tilex.type = 1;
                                            getTile("left", tilex.id, 1, 0).type = 1;
                                            FCAR.checkLeft = false;
                                        }
                                        if ((getTile("up", tilex.id, 0, 1).type == 1) && (getTile("down", tilex.id, 0, 2).type == 1) && FCAR.checkDown) {
                                            tilex.type = 1;
                                            getTile("down", tilex.id, 0, 1).type = 1;
                                            FCAR.checkDown = false;
                                        }
                                        if ((getTile("up", tilex.id, 0, 2).type == 1) && (getTile("down", tilex.id, 0, 1).type == 1) && FCAR.checkUp) {
                                            tilex.type = 1;
                                            getTile("up", tilex.id, 0, 1).type = 1;
                                            FCAR.checkUp = false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (checkArea(tiles[i - 4 - tileLayer * 4].id, FCAR.roomW + 8, FCAR.roomH + 8, 5, "simple", "stroke")) {
                        for (g = 0; g < FCAR.roomH + 6; g++) {
                            for (z = 0; z < FCAR.roomW + 6; z++) {
                                tilex = tiles[tiles[i - 3 - tileLayer * 3].id + z + (g * tileLayer)];
                                tilex.type = 5;
                            }
                        }
                    }

                }
            }
        }

        //CREATE DOORS
        for (i = 0; i < tiles.length; i++) {
            tilez = tiles[i];
            if (tilez.type == 2) {
                if (getTile("up", tilez.id, 0, 2).type == 2 || getTile("up", tilez.id, 0, 2).type == 1) {
                    if (checkArea(tiles[getTile("leftUp", tilez.id, 2, 1).id].id, 4, 1, 3, "simple", "fill")) {
                        getTile("up", tilez.id, 0, 1).type = 6;
                    }
                }
                if (getTile("down", tilez.id, 0, 2).type == 2 || getTile("down", tilez.id, 0, 2).type == 1) {
                    if (checkArea(tiles[getTile("leftDown", tilez.id, 2, 1).id].id, 4, 1, 3, "simple", "fill")) {
                        getTile("down", tilez.id, 0, 1).type = 6;
                    }
                }
                if (getTile("left", tilez.id, 2, 0).type == 2 || getTile("left", tilez.id, 2, 0).type == 1) {
                    if (checkArea(tiles[getTile("leftUp", tilez.id, 1, 2).id].id, 1, 4, 3, "simple", "fill")) {
                        getTile("left", tilez.id, 1, 0).type = 6;
                    }
                }
                if (getTile("right", tilez.id, 2, 0).type == 2 || getTile("right", tilez.id, 2, 0).type == 1) {
                    if (checkArea(tiles[getTile("rightUp", tilez.id, 1, 2).id].id, 1, 4, 3, "simple", "fill")) {
                        getTile("right", tilez.id, 1, 0).type = 6;
                    }
                }
            }
        }

//  /----------------------------------------------|Connect unconnected rooms|--------------------------------------\
        var CR = {};//CONNECT ROOMS

        CR.blockNumber = 0;
        CR.go = true;
        CR.firstRun = true;
        CR.keepConnecting = true;
        while (CR.keepConnecting) {
            CR.blockNumber = 0;
            for (i = 0; i < tiles.length; i++) {
                tilez = tiles[i];
                if ((tilez.type == 1) || (tilez.type == 2) || (tilez.type == 6)) {
                    CR.blockNumber++;
                }
            }
            for (i = 0; i < tiles.length; i++) {
                tilez = tiles[i];
                if (CR.firstRun) {
                    if (CR.go) {
                        if (tilez.type == 1) {
                            CR.firstGray = tilez.id;
                            CR.go = false;
                        }
                    }
                } else {
                    if ((tilez.type == 1) && (tilez.block.variant == 1)) {
                        if (getTile("up", tilez.id, 0, 1) != false) {
                            if (getTile("up", tilez.id, 0, 1).block.variant == 2) {
                                CR.firstGray = tilez.id;
                                i = tiles.length + 1;
                            }
                        }
                        if (getTile("down", tilez.id, 0, 1) != false) {
                            if (getTile("down", tilez.id, 0, 1).block.variant == 2) {
                                CR.firstGray = tilez.id;
                                i = tiles.length + 1;
                            }
                        }
                        if (getTile("left", tilez.id, 1, 0) != false) {
                            if (getTile("left", tilez.id, 1, 0).block.variant == 2) {
                                CR.firstGray = tilez.id;
                                i = tiles.length + 1;
                            }
                        }
                        if (getTile("right", tilez.id, 1, 0) != false) {
                            if (getTile("right", tilez.id, 1, 0).block.variant == 2) {
                                CR.firstGray = tilez.id;
                                i = tiles.length + 1;
                            }
                        }
                    }
                }
            }
            CR.firstRun = false;

            detect(CR.firstGray);

            CR.connectedBlocks = 0;
            for (i = 0; i < tiles.length; i++) {
                tilez = tiles[i];
                if (tilez.block.variant == 2) {
                    CR.connectedBlocks++;
                }
            }

            if (CR.connectedBlocks != CR.blockNumber) {
                connectRooms();
            } else {
                CR.keepConnecting = false;
            }
        }

        for (i = 0; i < tiles.length; i++) {
                tilez = tiles[i];
                tilez.block.variant = 1;
            }
//  \--------------------------------------------------|END|--------------------------------------------/
    }

    generateDungeon();

//  \======================================================|END|==================================================/

    var up = false;
    var down = false;
    var left = false;
    var right = false;
    var keyUp, keyDown, keyLeft, keyRight;
    keyUp = 87;
    keyDown = 83;
    keyLeft = 65;
    keyRight = 68;
    window.addEventListener("keydown", checkKeyDown, false);
    function checkKeyDown(event) {
        if (event.keyCode == keyUp) {
            up = true;
        } else if (event.keyCode == keyDown) {
            down = true;
        } else if (event.keyCode == keyLeft) {
            left = true;
        } else if (event.keyCode == keyRight) {
            right = true;
        }
    }

    window.addEventListener("keyup", checkKeyUp, false);
    function checkKeyUp(event) {
        if (event.keyCode == keyUp) {
            up = false;
        } else if (event.keyCode == keyDown) {
            down = false;
        } else if (event.keyCode == keyLeft) {
            left = false;
        } else if (event.keyCode == keyRight) {
            right = false;
        }
    }

    var intervalo = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (up) {
            globalY += 3;
        }
        if (down) {
            globalY -= 3;
        }
        if (left) {
            globalX += 3;
        }
        if (right) {
            globalX -= 3;
        }
        for (var i = 0; i < tiles.length; i++) {
            var tilez = tiles[i];
            tilez.draw();
        }
        /*ctx.fillStyle = "red";
         ctx.fillRect(canvas.width/2-25,canvas.height/2-25,50,50);*/
    }, 1000 / 60);
}
