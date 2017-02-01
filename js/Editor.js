class Editor {
    constructor(options) {
        this.name = 'Editor'; 
        this.blocks = [];
        this.element = document.getElementById(options.id);
        this.dragged = null;
        this.properties = new Map();
        var editor = this;
        this.blockSelector = new BlockSelector({
            parent: 'da-toolbar',
            editor: editor
        });
        this.drawArea = new DrawArea({
            parent: 'da-viewport',
            editor: editor
        });
    }

    getParentElement() {
        return this.element;
    }

    getBlockSelector() {
        return this.blockSelector;
    }

    getDrawArea() {
        return this.drawArea;
    }

    setProperty(key, value, publicate) {
        this.properties.set(key, value);
        this.drawArea.setProperty(key, value);
    }
}