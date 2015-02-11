/*
Copyright 2010, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

This code has been adapted from the Chromium demo seen here: 
    http://chromium.googlecode.com/svn/trunk/samples/audio/simple.html
*/

define(function () {
    var context, buffer, convolver, panner, source, dryGainNode, wetGainNode, lowFilter, bufferList;

    var gTopProjection      = 0,
        gFrontProjection    = 0;

    var x = 1,
        y = 1,
        z = 0;
    
    var kInitialReverbLevel = 0.6;
    var fileList            = [],
        fileCount           = 0;
    
    var impulseResponses = [    {   "name": "Binaural",
                                    "file": "lib/impulse-responses/bin_dfeq/s3_r4_bd.wav",
                                    "description": "Binaural Acoustic Space",
                                    "id": 0
                                },
                                {   "name": "Warehouse Cardiod 35-10 Spread",
                                    "file": "lib/impulse-responses/tim-warehouse/cardiod-35-10/cardiod-35-10-spread.wav",
                                    "description": "Warehouse Acoustic Spread",
                                    "id": 1
                                },
                                {   "name": "Warehouse Cardiod Rear 35-10 Spread",
                                    "file": "lib/impulse-responses/tim-warehouse/cardiod-rear-35-10/cardiod-rear-35-10.wav",
                                    "description": "Warehouse Rear Acoustic Spread",
                                    "id": 2
                                },
                                {   "name": "Warehouse Super Ceiling 35-10 Spread",
                                    "file": "lib/impulse-responses/tim-warehouse/super-ceiling-35-10/super-ceiling-35-10.wav",
                                    "description": "Warehouse Super Ceiling Acoustic Spread",
                                    "id": 3
                                },
                                {   "name": "Warehouse Omni 35-10",
                                    "file": "lib/impulse-responses/tim-warehouse/omni-35-10/omni-35-10.wav",
                                    "description": "Warehouse Omni Acoustic Spread",
                                    "id": 4
                                },
                                {   "name": "Warehouse True Stereo 15-8",
                                    "file": "lib/impulse-responses/tim-warehouse/cardiod-true-stereo-15-8/cardiod-true-stereo-15-8.wav",
                                    "description": "Warehouse True Stereo Acoustic Spread",
                                    "id": 5
                                },
                                {   "name": "Spacialized 1",
                                    "file": "lib/impulse-responses/spatialized1.wav",
                                    "description": "Huge Spacious",
                                    "id": 6
                                },
                                {   "name": "Spacialized 2",
                                    "file": "lib/impulse-responses/spatialized2.wav",
                                    "description": "Outside 1",
                                    "id": 7
                                },
                                {   "name": "Spacialized 3",
                                    "file": "lib/impulse-responses/spatialized3.wav",
                                    "description": "Outside 2",
                                    "id": 8
                                },
                                {   "name": "Spacialized 4",
                                    "file": "lib/impulse-responses/spatialized4.wav",
                                    "description": "Huge Spacious",
                                    "id": 9
                                },
                                {   "name": "Spacialized 5",
                                    "file": "lib/impulse-responses/spatialized5.wav",
                                    "description": "Backwards",
                                    "id": 10
                                },
                                {   "name": "Spacialized 6",
                                    "file": "lib/impulse-responses/spatialized6.wav",
                                    "description": "Cosmic",
                                    "id": 11
                                },
                                {   "name": "Spacialized 7",
                                    "file": "lib/impulse-responses/spatialized7.wav",
                                    "description": "Dark Cathedral",
                                    "id": 12
                                },
                                {   "name": "Spacialized 8",
                                    "file": "lib/impulse-responses/spatialized8.wav",
                                    "description": "Medium Open 1",
                                    "id": 13
                                },
                                {   "name": "Spacialized 9",
                                    "file": "lib/impulse-responses/spatialized9.wav",
                                    "description": "Medium Open 2",
                                    "id": 14
                                },
                                {   "name": "Echo Chamber",
                                    "file": "lib/impulse-responses/echo-chamber.wav",
                                    "description": "Large Echo Chamber",
                                    "id": 15
                                },
                                {   "name": "Noise Spreader",
                                    "file": "lib/impulse-responses/noise-spreader1.wav",
                                    "description": "Spreads Noise?",
                                    "id": 16
                                },
                                {   "name": "Fluttery",
                                    "file": "lib/impulse-responses/peculiar-backwards.wav",
                                    "description": "Backwards / Fluttery",
                                    "id": 17
                                },
                                {   "name": "Sifter",
                                    "file": "lib/impulse-responses/sifter.wav",
                                    "description": "Sifter space",
                                    "id": 18
                                },
                                {   "name": "Wild Echo",
                                    "file": "lib/impulse-responses/wildecho.wav",
                                    "description": "Crazy huge echo",
                                    "id": 19
                                },
                                {   "name": "Backslap",
                                    "file": "lib/impulse-responses/backslap1.wav",
                                    "description": "Short backslap reverb",
                                    "id": 20
                                },
                                {   "name": "Stretch",
                                    "file": "lib/impulse-responses/tim-warehouse/tim-stretch2.wav",
                                    "description": "Tim Stretch",
                                    "id": 21
                                },
                                {   "name": "Stretch Warehouse",
                                    "file": "lib/impulse-responses/tim-warehouse/tim-warehouse-stretch1.wav",
                                    "description": "Tim Stretch Warehouse",
                                    "id": 22
                                }
                         ] 
    
    function mixToMono(buffer) {
        if (buffer.numberOfChannels == 2) {
            var pL = buffer.getChannelData(0);
            var pR = buffer.getChannelData(1);
            var length = buffer.length;

            for (var i = 0; i < length; ++i) {
                var mono = 0.5 * (pL[i] + pR[i]);
                pL[i] = mono;
                pR[i] = mono;
            }
        }
    }
    
    function setAudioSource(i) {
        var buffer = bufferList[i];

        // See if we have cached buffer
        if (buffer) {
            source.buffer = buffer;
        } else {
            // Load asynchronously
            var url = fileList[i];

            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            request.onload = function() { 
                context.decodeAudioData(
                    request.response,
                    function(buffer) {
                        mixToMono(buffer);
                        source.buffer = buffer;
                        bufferList[i] = buffer;  // cache it
                    },

                    function(buffer) {
                        console.log("Error decoding audio source data!");
                    }
                );
            }

            request.send();
        }
    }   
    

    return {
        init: function() {
             // Initialize audio
             context = new webkitAudioContext();

             source = context.createBufferSource();
             dryGainNode = context.createGain();
             wetGainNode = context.createGain();
             panner = context.createPanner();

             lowFilter = context.createBiquadFilter();
             lowFilter.frequency.value = 22050.0;
             lowFilter.Q.value = 5.0;

             convolver = context.createConvolver();

             // Connect audio processing graph
             source.connect(lowFilter);
             lowFilter.connect(panner);

             // Connect dry mix
             panner.connect(dryGainNode);
             dryGainNode.connect(context.destination);

             // Connect wet mix
             panner.connect(convolver);
             convolver.connect(wetGainNode);
             wetGainNode.connect(context.destination);
             wetGainNode.gain.value = kInitialReverbLevel;

             bufferList = new Array(fileCount);
             for (var i = 0; i < fileCount; ++i) {
                 bufferList[i] = 0;
             }

             source.playbackRate.value = 1.0;

             panner.setPosition(0, 0, -4.0);
             source.loop = true;

             // Load up initial sound
             setAudioSource(0);

             var currentTime = context.currentTime;
             source.start(currentTime + 0.020);
        },
        setInitialReverb:   
            function(n) {
                kInitialReverbLevel = n;
        },
            
        addFile:            
            function( dir ) {
                fileList.push(dir);
                fileCount = fileList.length;
                return fileList;
        },
        
        getFileList: 
            function() {
                return fileList;
        },
        getImpulseResponses: 
            function(){
                return impulseResponses;
            },
        
        listImpulseResponses:
            function(verbose){
                verbose = (typeof verbose === "undefined") ? false : true;
                if (verbose) {
                    impulseResponses.forEach(function(impulse) {
                        console.log(impulse.name + ": " + impulse.description + "\n" + "ID: " + impulse.id + ", Path: " + impulse.file + "\n");
                    });
                } else {
                    impulseResponses.forEach(function(impulse) {
                        console.log(impulse.name);
                    });
                }
            },
        
        setReverbImpulseResponse: 
            function(url) {
                // Load impulse response asynchronously
                var request = new XMLHttpRequest();
                    request.open("GET", url, true);
                    request.responseType = "arraybuffer";

                    request.onload = function() { 
                        context.decodeAudioData(
                            request.response,
                            function(buffer) {
                                convolver.buffer = buffer;
                            },

                            function(buffer) {
                                console.log("Error decoding impulse response!");
                            }
                        );
                    }   
                request.send();
            },

        setPitch: function(cents) {
            // cents should be between -2400 and 2400 
            var rate = Math.pow(2.0, cents / 1200.0);
            source.playbackRate.value = rate;
        },

        setReverb: function(value) {
            // reverb between 0 and 1 
            wetGainNode.gain.value = value;
        },

        setMainGain: function(value) {
            // main gain between 0 and 1 
            dryGainNode.gain.value = value;
        },

        setCutoff: function(value) {
            // lowpass between 0 and 1
            var noctaves = Math.log(22050.0 / 40.0) / Math.LN2;
            var v2 = Math.pow(2.0, noctaves * (value - 1.0));

            var sampleRate = 44100.0;
            var nyquist = sampleRate * 0.5;
            var frequency = v2 * nyquist;
            
            lowFilter.frequency.value = frequency;
        },
        
        setSourceBuffer: function(buffer) {
            source.buffer = buffer;
        },
  };
});