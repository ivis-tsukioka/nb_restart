define([
    'base/js/namespace',
], function(Jupyter) {
    function restartKernelIfRequested() {
        var urlParams = new URLSearchParams(window.location.search);
        console.log('restart is ')
        console.log(urlParams.get('restart'))
        if (urlParams.get('restart') === 'true') {
            Jupyter.notebook.kernel.restart();
        }
    }

    return {
        load_ipython_extension: function() {
            restartKernelIfRequested();
        }
    };

});