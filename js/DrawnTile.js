/*
const autoSnapFuncArray = [
    (tile1, tile2) => {
        // 0: Top-Left
        return {
            x: tile1.x - tile2.width,
            y: tile1.y - tile2.height
        }
    },
    (tile1, tile2) => {},
    (tile1, tile2) => {},
    (tile1, tile2) => {},
    (tile1, tile2) => {},
    (tile1, tile2) => {},
    (tile1, tile2) => {},
    (tile1, tile2) => {}
];
*/
class DrawnTile extends Tile {
    constructor(options) {
        super(options);
    }

    getDrawnLayer() {
        if(this.options['drawnLayer'])
            return this.options['drawnLayer'];
    }

    onDrag(event) {
        var x, y;
        x += (event.x - this.dragX);
        y += (event.y - this.dragY);

        var tiler = this.getDrawnLayer().getNearTiles(x, y);
        if(this.nearest) {
            if(this.nearest !== tiler) {
               this.nearest.setActive(false);
               this.nearest = tiler; 
               tiler.setActive(true);
            }
        } else {
               this.nearest = tiler; 
               tiler.setActive(true);            
        }
    }

    onDragEnd(event) {
        //event.preventDefault();
        //event.dataTransfer.dropEffect = 'move';
        log(this.name, ': ');
        this.x += (event.x - this.dragX);
        this.y += (event.y - this.dragY);
        if(this.nearest) {
            this.nearest.setActive(false);
        }

        switch(this.getDrawnLayer().getDrawnArea().getProperty('snap')) {
            case 'grid':
                var sx = this.x % 90;
                var sy = this.y % 60;
                this.x -= sx;
                this.y -= sy;
                break;
            case 'tile':
                var tiler = this.nearest || this.getDrawnLayer().getNearTiles();
                //tiler.setActive(true);
                switch(this.getDrawnLayer().getDrawnArea().getProperty('snapalign')) {
                    case 'auto':
                        var p = this.calculateAuto(this, tiler);
                        this.x = p.x;
                        this.y = p.y;
                        break;
                    case 'topleft':
                        this.y = tiler.y + tiler.height;
                        break;
                    case 'topright':
                        this.x = tiler.x + tiler.width;
                        break;
                    case 'bottomleft':
                        this.x = tiler.x - this.width;
                        break;
                    case 'bottomright':
                        this.y = tiler.y + tiler.height;
                        break;                        
                }
                break;
            default:
                break;
        }

        this.setPosition(this.x, this.y);
        log(this.name, ' onDragEnd overload');
    }

    calculateAuto(dragged, tile) {
        var orientation = this.getOrientation(dragged.x, dragged.y, tile);
        var x, y;

        switch(orientation) {
            case 1:
                x = tile.x - dragged.width;
                y = tile.y - dragged.height;
                break;
            case 2:
                x = tile.x;
                y = tile.y - dragged.height;
                break;
            case 3:
                x = tile.x + tile.width;
                y = tile.y - dragged.height;
                break;
            case 4:
                x = tile.x + tile.width;
                y = tile.y
                break;
            case 5:
                x = tile.x + tile.width;
                y = tile.y + tile.height;
                break;
            case 6:
                x = tile.x;
                y = tile.y + tile.height;
                break;
            case 7:
                x = tile.x - dragged.width;
                y = tile.y + tile.height;
                break;
            case 8:
                x = tile.x - dragged.width;
                y = tile.y;
                break;
            default:
                x = dragged.x;
                y = dragged.y;
        }

        return {
            x, y
        }
    }

    onDragStart(event) {
        //event.preventDefault();
        event.dataTransfer.dropEffect = this.dropEffect;
        this.dragX = event.x;
        this.dragY = event.y;
        this.getDrawnLayer().dragged = this;
        //log(this.name, ' onDragStart overload');
    }

    /*
        getOrientation: returns the tile1(x, y) position related to tile2
        returns a number by this table
        *******
        *1*2*3*
        *******
        *8*9*4*
        *******
        *7*6*5*
        *******
    */
    getOrientation(tile1, tile2) {
        var arr = [[0,1,2], [7,8,3], [6,5,4]];

        var hor = [];
        if(tile1.y < tile2.y) {
            //Up
            hor = arr[0];
        } else if(tile1.y>=tile2.y && tile1.y <= (tile2.y + tile2.height)) {
            //Middle
            hor = arr[1];
        } else {
            //Down
            hor = arr[2];
        }

        var result = 0;
        if(tile1.x<tile2.x) {
            result = hor[0];
        } else if(tile1.x>=tile2.x && tile1.x<=(tile2.x+tile2.width)) {
            result = hor[1];
        } else {
            result = hor[2];
        }
        return result;
    }    
}