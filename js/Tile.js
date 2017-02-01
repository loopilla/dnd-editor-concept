class Tile extends Draggable {
    constructor(options) {
        super();
        this.options = options
        this.name = 'Tile';
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.element = document.createElement('div');
        this.element.classList.add(options.class);
        if(options.absolute) {
            this.element.style.top = options.y + 'px';
            this.element.style.left = options.x + 'px';
        }
        if(options.drawLayer) {
            this.drawLayer = options.drawLayer;
        }
        this.element.style.width = options.width + 'px';
        this.element.style.height = options.height + 'px';

        this.element.setAttribute('draggable', 'true');
        this.element.dataset.id = options.id;
        this.dropEffect = options.dropEffect || 'copy';
        //If we have a background image, use it
        if(options.image) {
            this.element.style.backgroundImage = "url('" + options.image + "')";
            // this.width = options.image.clientWidth;
            // this.height = options.image.clientHeight;
        } else {
            this.element.classList.add('default-background');
        }
        options.parent.appendChild(this.element);
        this.addHandlers();
    }

    onDragStart(event) {
        //event.preventDefault();
        event.dataTransfer.dropEffect = this.dropEffect;
        this.dragX = event.x;
        this.dragY = event.y;
        //log(this.name, ' onDragStart overload');
    }

    onDragEnd(event) {
        //event.preventDefault();
        //event.dataTransfer.dropEffect = 'move';
        this.x += (event.x - this.dragX);
        this.y += (event.y - this.dragY);

        var sx = this.x % 90;
        var sy = this.y % 60;

        this.x -= sx;
        this.y -= sy;

        this.setPosition(this.x, this.y);
        log(this.name, ' onDragEnd overload');
    }

    onDrop(event) {
        //event.preventDefault();
        log(this.name, 'onDrop overloaded');
    }

    onDrag(event) {
        event.preventDefault();
        log(this.name, 'onDrag overloaded');
    }

    addHandlers() {
        this.addHandler('dragstart');
        this.addHandler('dragend');
        this.addHandler('drag');
        this.addHandler('drop');
    }

    setPosition(x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    }

    getElement() {
        return {
            element: this.element,
            options: this.options
        };
    }

    getCopyOptions() {
        return {
            image: this.options.image,
            id: this.options.id,
            width: this.options.width,
            height: this.options.height
        }
    }

    setActive(active) {
        if(active) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
    }
}