class DockedTile extends Tile {
    constructor(options) {
        super(options);
        this.name = 'DockedTile';
        this.blockSelector = options.blockSelector;
    }

    onDragStart(event) {
        event.dataTransfer.dropEffect = "copy";
        this.blockSelector.setDraggedTile({
            tile: this,
            x: event.layerX,
            y: event.layerY
        });
        log(this.name, ' onDragStart ');
    }    
}