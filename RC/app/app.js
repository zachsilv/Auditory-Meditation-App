requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'modules',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
});
requirejs(['audioscene/audioscene'],
    function   (scene) {
        scene.addFile('modules/audioscene/lib/sounds/car-door-open-close.wav');
        console.log(scene.getFileList());
        // run with verbose=true for detailed output
        scene.listImpulseResponses(verbose=true);
        scene.setReverbImpulseResponse('modules/audioscene/lib/impulse-responses/tim-warehouse/tim-warehouse-stretch1.wav');
        scene.init();
        var irs = scene.getImpulseResponses();
        var i = 1;
        irs.forEach(function(ir){
            setTimeout(function() {
                scene.setReverbImpulseResponse('modules/audioscene/'+ir.file)
                console.log(ir);
            }, 5000*i);   
            i++;
        });
        
});

