/*
    Class: BlockSelector
    Todo: The image files gonna come from the server
*/

class BlockSelector {
    constructor(options) {
        var parent = document.querySelector('#' + options.parent);
        var blockSelector = this;
        this.editor = options.editor;
        this.loadTilesAsync().then(function(images){
            images.forEach(function(item){
                var tile = new DockedTile({
                    id: 'b1',
                    x: 100,
                    y: 100,
                    width: item.image.width,
                    height: item.image.height,
                    parent: parent,
                    class: 'block-select',
                    image: item.id,
                    blockSelector: blockSelector
                });
            });
        })
        .catch(function(err){
            console.log(err);
        });
    }

    loadTilesAsync() {
        var preloader = new ImagePreloader({
            path: './images',
            images: [
                'tile01.png',
                'tile02.png',
                'tile03.png',
                'tile04.png',
                'tile05.png',
                'tile06.png',
                'tile07.png',
                'tile08.png',
                'tile09.png',
                'tile10.png',
                'tile11.png',
                'tile12b.png',
                'tile13.png',
                'tile14.png'
                ]            
            }
        );

        //Start the load process
        return preloader.loadAll();
    }

    setDraggedTile(tile) {
        this.dragged = tile;
    }

    getDraggedTile() {
        var result = this.dragged;
        this.dragged = null;
        return result;
    }
}