'use strict';

const eventMap = {
    dragover: 'onDragOver',
    dragenter: 'onDragEnter',
    dragleave: 'onDragLeave',
    dragstart: 'onDragStart',
    dragend: 'onDragEnd',
    drop: 'onDrop',
    drag: 'onDrag'            
};

class DragAndDrop {
    constructor() {
        this.name = '';
    }

    onDragOver(event) {
        log(this.name, ' onDragOver');
    }

    onDragEnter(event) {
        log(this.name, ' onDragEnter');
    }

    onDragLeave(event) {
        log(this.name, ' onDragLeave');
    }

    onDragStart(event) {
        log(this.name, ' onDragStart');
    }

    onDragEnd(event) {
        log(this.name, ' onDragEnd');
    }

    onDrop(event) {
        log(this.name, ' onDrop');
    }

    onDrag(event) {
        log(this.name, ' onDrag');
    }

    addHandler(eventName, handler, element = this.element) {
        element.addEventListener(eventName, handler || (function(context){
            return function(event) {
                context[eventMap[eventName]].call(context, event);
            }
        })(this), true);
    }

    addAllHandlers() {
        this.addHandler('dragstart');
        this.addHandler('dragend');
        this.addHandler('dragenter');
        this.addHandler('dragleave');
        this.addHandler('drop');
        this.addHandler('drag');
    }

    addHandlers() {
        this.addAllHandlers();
    }
}