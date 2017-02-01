/*
    This class is to hold the drawable layer
*/

const funcMap = new Map([
    ['top', (tile) => {
        return {
            v: {
                x: tile.x,
                y: tile.y
            },
            w: {
                x: tile.x + tile.width,
                y: tile.y
            }
        }
    }],
    ['right', (tile) => {
        return {
            v: {
                x: tile.x + tile.width,
                y: tile.y
            },
            w: {
                x: tile.x + tile.width,
                y: tile.y + tile.height
            }
        }
    }],
    ['bottom', (tile) => {
        return {
            v: {
                x: tile.x,
                y: tile.y + tile.height
            },
            w: {
                x: tile.x + tile.width,
                y: tile.y + tile.height
            }
        }
    }],
    ['left', (tile) => {
        return {
            v: {
                x: tile.x,
                y: tile.y
            },
            w: {
                x: tile.x,
                y: tile.y + tile.height
            }
        }
    }]
]);

class DrawLayer extends Dropable {
    constructor(options) {
        super();
        this.name = 'DrawLayer';
        this.drawArea = options.drawArea;
        this.blocks = [];    //This array holds all the Tiles onDrop
        this.counter = 0;
        var container = document.createElement('div');
        container.classList.add('drawLayer');
        container.setAttribute('data-id', 'drawlayer-' + options.id);
        container.setAttribute('id', 'drawlayer-' + options.id);
        this.element = container;
        var parent = document.querySelector(options.parent);
        parent.appendChild(this.element);
        this.addHandlers();
    }

    addBlock(block) {
        this.blocks.push(block);
    }

    removeBlock(block) {

    }

    onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        //log(this.name, ' onDragOver overload');
    }

    onDragEnter(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        //log(this.name, ' onDragEnter overload');
    }

    onDrop(event) {
        event.preventDefault();
        var tileData = this.drawArea.getEditor().getBlockSelector().getDraggedTile();
        if(tileData) {
            var options = tileData.tile.getCopyOptions();
            var disp = this.drawArea.getDisplacement();
            options.x = event.x - disp.x - tileData.x;
            options.y = event.y - disp.y - tileData.y;
            switch(this.drawArea.getProperty('snap')) {
                case 'grid':
                    var sx = options.x % 90;
                    var sy = options.y % 60;
                    options.x -= sx;
                    options.y -= sy;
                    break;
                case 'tile':
                    break;
                default:
                    break;
            }
            options.absolute = true;
            options.parent = this.element;
            options.class = 'block';
            options.dropEffect = 'move';
            options.drawnLayer = this;
            options.counter = ++this.counter;
            var newTile = new DrawnTile(options);
            this.addBlock(newTile);
            log(tileData);
        }
        log(this.name, 'onDrop overloaded');
    }

    addHandlers() {
        //this.addHandler('dragenter');
        this.addHandler('dragover');
        this.addHandler('drop');
    }

    getDrawnArea() {
        return this.drawArea;
    }

    getSegmentByOrientation() {

        return (orientation) => {
            var res = 0;
            switch(orientation) {
                case 0:
                case 1:
                case 2:
                case 8:
                    res = funcMap.get('top');
                    break;
                case 3:
                    res = funcMap.get('right');
                    break;
                case 4:
                case 5:
                case 6:
                    res = funcMap.get('right');
                    break;
                case 7:
                    res = funcMap.get('left');
                    break;
                default:
                    res = undefined;
            }
            return res;
        }
    };

    getNearTiles(x, y) {
        var result = {};

        if(this.dragged) {
            var dragged = this.dragged;

            var self = this;

            var localX = x || dragged.x,
                localY = y || dragged.y;

            result = this.blocks
            .filter(block => {
                return block !== dragged;
            })
            .map(function(block) {
                //Get orientation to the block
                var o = dragged.getOrientation({x: localX, y: localY}, block);
                //Select the nearest point by the orientation
                //TODO
                log(o, '  Local: ', localX, '/', localY);

                let orient = self.getSegmentByOrientation()(o);
                //log(o, ' => ', orient);
                
                let seg = orient.call(self, block);
                //log(seg);
                //let seg = self.getSegmentByOrientation()(o)(block);
                let distance = Utils.Math.distToSegment({
                        x: localX,
                        y: localY
                    },
                    seg.v,
                    seg.w
                );
                //log(block.id, ': ', o, '/', distance);
                return {
                    d: distance,
                    tile: block
                };
            }).sort((t1, t2) => {
                return t1.d > t2.d?1:t1.d==t2.d?0:-1;
            }).shift();
            // .reduce((prev, value) => {
            //     //log(prev?prev.tile.id:'', '(', prev?prev.d:'',  ') -> ', value.tile.id, '(', value.d,')' );
            //     if(prev.d) {
            //         if(prev.d < value.d) {
            //             return prev;
            //         } else {
            //             log('Change: ', prev.d, ' => ', value.d);
            //             return value;
            //         }
            //     }
            //     return value;
            // }, {});
            return result.tile;
        } else {
            log('No dragged');
        }
    }
}