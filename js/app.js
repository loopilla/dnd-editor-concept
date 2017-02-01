const log = console.log;

((window) => {
    var blocks = [];
    var editor;

    document.addEventListener('DOMContentLoaded', (event) => {
        editor = new Editor({
            id: 'drawArea'
        });
        editor.setProperty('snap', 'none');
        editor.setProperty('snapalign', 'auto');
        init(parent);
    });

    var init = (parent) => {
        var parent = editor.getParentElement();

        //Setup snap control
        Array.prototype.slice.call(document.querySelectorAll('input[name="snap"]')).forEach(function(ctrl){
            ctrl.addEventListener('click', function(item) {
                editor.setProperty('snap', item.currentTarget.value);
            });
        });

        //Setup snap align control
        Array.prototype.slice.call(document.querySelectorAll('input[name="snapalign"]')).forEach(function(ctrl){
            ctrl.addEventListener('click', function(item) {
                editor.setProperty('snapalign', item.currentTarget.value);
            });
        });
    };
})(window);