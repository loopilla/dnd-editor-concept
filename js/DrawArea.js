class DrawArea {
    constructor(options) {
        this.layers = [];
        this.activeLayer = 0;
        this.parent = document.getElementById(options.parent);
        this.editor = options.editor;
        this.properties = new Map();
        this.element = document.querySelector('#drawArea');
        this.displacement = this.getWorldDisplacement();
        //Add the default DrawLayer
        this.addLayer('Base');
    }

    addLayer(id) {
        var drawArea = this;
        var layer = new DrawLayer({
            id: 'Base',
            parent: '#drawArea',
            drawArea: drawArea
        });
        this.layers.push(layer);
    }

    removeLayer(id) {
        //TODO
    }

    getLayer(id) {
        return this.layers.find(function(layer) {
            return layer.id === id;
        });
    }

    getOffsetRect() {
        // (1)
        var box = this.element.getBoundingClientRect();
        
        var body = document.body
        var docElem = document.documentElement
        
        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
        
        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0
        var clientLeft = docElem.clientLeft || body.clientLeft || 0
        
        // (4)
        var top  = box.top +  scrollTop - clientTop
        var left = box.left + scrollLeft - clientLeft
        
        return {
            top: Math.round(top),
            left: Math.round(left)
        }
    }

    getWorldDisplacement() {
        let x = 0,
            y = 0;
        var r = this.element;

        var disp = {x, y};

        while(r.parentElement) {
            disp.x += r.parentElement.offsetLeft;
            disp.y += r.parentElement.offsetTop;
            r = r.parentElement;
        }
        return disp;
    }

    getDisplacement() {
        return this.displacement;
    }

    getEditor() {
        return this.editor;
    }

    setProperty(key, value) {
        this.properties.set(key, value);
    }

    getProperty(key) {
        return this.properties.get(key);
    }
}