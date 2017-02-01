'use strict';
/*
    An element becomes a drop zone or is droppable, the element must have both ondragover and ondrop event handler attributes
*/
class Dropable extends DragAndDrop {
    constructor() {
        super();
        this.name = '';
    }

    onDragOver(event) {
        log(this.name, ' onDragOver');
    }

    onDrop(event) {
        log(this.name, ' onDrop');
    }

    addAllHandlers() {
        this.addHandler('dragover');
        this.addHandler('drop');
    }

    addHandlers() {
        this.addAllHandlers();
    }
}