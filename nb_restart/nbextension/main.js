define([
    'base/js/namespace',
], function(Jupyter) {
    function restartKernelIfRequested() {
        var urlParams = new URLSearchParams(window.location.search);
        is_restart = urlParams.get('restart')
        console.log(`restart is ${is_restart}`)
        if (urlParams.get('restart') === 'true') {
            console.log(`[NB DEBUDG] Restart notebook`)
            //Jupyter.notebook.kernel.restart();
            console.log(`[NB DEBUDG] Release of freeze`)
            Jupyter.notebook.get_cells().forEach(function(cell) {
                if (cell.metadata.hasOwnProperty('run_through_control') &&
                    typeof cell.metadata.run_through_control === 'object' &&
                    cell.metadata.run_through_control !== null &&
                    cell.metadata.run_through_control.hasOwnProperty('frozen')) {
                    // 値を変更
                    cell.metadata.run_through_control.frozen = false;
                }
            });
            console.log(`[NB DEBUDG] Clear Output`)
            Jupyter.notebook.clear_all_output();
            console.log(`[NB DEBUDG] Checkpoint saving`)
            IPython.notebook.save_checkpoint();
            console.log(`[NB DEBUDG] kernel restart`)
            Jupyter.notebook.kernel.restart();
        }
    }

    return {
        load_ipython_extension: function() {
            restartKernelIfRequested();
        }
    };

});