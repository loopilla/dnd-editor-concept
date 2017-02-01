class ImagePreloader {
    constructor(options) {
        this.dir = options.path;
        this.images = options.images;
    }

    loadImage(path) {
        var context = this;
        return new Promise(function(resolve, reject) {
            var image = new Image();
            image.onload = (function(context) {
                return function() {
                    resolve.call(context, {
                        id: path,
                        image: image
                    });
                }
                
            })(context);
            image.onerror = resolve;
            image.src = path;
        });
    }

    loadAll() {
        var promiseArray = [];
        var context = this;

        this.images.forEach(function(path) {
            var fn = context.dir + '/' + path;
            promiseArray.push(context.loadImage(fn));
        });

        return Promise.all(promiseArray);
    }
}