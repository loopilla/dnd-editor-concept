'use strict';
/*
    To make an element draggable requires adding the draggable attribute and the ondragstart global event handler
*/
class Draggable extends DragAndDrop {
    constructor() {
        super();
        this.name = '';
    }

    onDragStart(event) {
        event.dataTransfer.dropEffect = "copy";
        log(this.name, ' onDragStart');
    }

    addAttribute() {
        if(this.element)
            this.element.addAttribute('draggable');
    }

    addAllHandlers() {
        this.addHandler('dragstart');
    }

    addHandlers() {
        this.addAllHandlers();
    }
}