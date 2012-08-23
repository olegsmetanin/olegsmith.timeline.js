/*global olegsmith*/
if (typeof olegsmith !== 'undefined' && typeof olegsmith.Timeline.HConst === 'undefined') {

    olegsmith.Timeline.HConst = ({
        init:function () {
            return this;
        },

        zoomdef:[
            //0
            {minormark:{type:'year', delta:200000, format:'Y'}, majormark:{type:'year', delta:1000000, format:'Y'}},
            //1
            {minormark:{type:'year', delta:100000, format:'Y'}, majormark:{type:'year', delta:1000000, format:'Y'}},
            //2
            {minormark:{type:'year', delta:50000, format:'Y'}, majormark:{type:'year', delta:100000, format:'Y'}},
            //3
            {minormark:{type:'year', delta:20000, format:'Y'}, majormark:{type:'year', delta:100000, format:'Y'}},
            //4
            {minormark:{type:'year', delta:10000, format:'Y'}, majormark:{type:'year', delta:50000, format:'Y'}},
            //5
            {minormark:{type:'year', delta:5000, format:'Y'}, majormark:{type:'year', delta:20000, format:'Y'}},
            //6
            {minormark:{type:'year', delta:2000, format:'Y'}, majormark:{type:'year', delta:10000, format:'Y'}},
            //7
            {minormark:{type:'year', delta:1000, format:'Y'}, majormark:{type:'year', delta:5000, format:'Y'}},
            //8
            {minormark:{type:'year', delta:500, format:'Y'}, majormark:{type:'year', delta:5000, format:'Y'}},
            //9
            {minormark:{type:'year', delta:500, format:'Y'}, majormark:{type:'year', delta:1000, format:'Y'}},
            //10
            {minormark:{type:'year', delta:200, format:'Y'}, majormark:{type:'year', delta:1000, format:'Y'}},
            //11
            {minormark:{type:'year', delta:50, format:'y'}, majormark:{type:'year', delta:100, format:'Y'}},
            //12
            {minormark:{type:'year', delta:20, format:'y'}, majormark:{type:'year', delta:100, format:'Y'}},
            //13
            {minormark:{type:'year', delta:10, format:'y'}, majormark:{type:'year', delta:100, format:'Y'}},
            //14
            {minormark:{type:'year', delta:5, format:'y'}, majormark:{type:'year', delta:50, format:'Y'}},
            //15
            {minormark:{type:'year', delta:5, format:'y'}, majormark:{type:'year', delta:20, format:'Y'}},
            //16
            {minormark:{type:'year', delta:1, format:'y'}, majormark:{type:'year', delta:10, format:'Y'}},
            //17
            {minormark:{type:'year', delta:1, format:'y'}, majormark:{type:'year', delta:10, format:'Y'}},
            //18
            {minormark:{type:'month', delta:4, format:'M'}, majormark:{type:'year', delta:1, format:'Y'}},
            //19
            {minormark:{type:'month', delta:3, format:'f'}, majormark:{type:'year', delta:1, format:'Y'}},
            //20
            {minormark:{type:'month', delta:3, format:'f'}, majormark:{type:'year', delta:1, format:'Y'}},
            //21
            {minormark:{type:'month', delta:1, format:'f'}, majormark:{type:'month', delta:6, format:'f Y'}},
            //22
            {minormark:{type:'day', delta:10, format:'d'}, majormark:{type:'month', delta:1, format:'f Y'}},
            //23
            {minormark:{type:'day', delta:3, format:'d'}, majormark:{type:'month', delta:1, format:'f Y'}},
            //24
            {minormark:{type:'day', delta:1, format:'d'}, majormark:{type:'month', delta:1, format:'d f Y'}},
            //25
            {minormark:{type:'day', delta:1, format:'d'}, majormark:{type:'day', delta:7, format:'d f Y'}},
            //26
            {minormark:{type:'day', delta:1, format:'d F'}, majormark:{type:'day', delta:3, format:'d f Y'}},
            //27
            {minormark:{type:'hour', delta:6, format:'H:i'}, majormark:{type:'day', delta:1, format:'d f Y'}},
            //28
            {minormark:{type:'hour', delta:6, format:'H:i'}, majormark:{type:'day', delta:1, format:'d f Y'}},
            //29
            {minormark:{type:'hour', delta:2, format:'H:i'}, majormark:{type:'hour', delta:12, format:'H:i, d f Y'}},
            //30
            {minormark:{type:'minute', delta:60, format:'H:i'}, majormark:{type:'hour', delta:6, format:'H:i, d f Y'}},
            //31
            {minormark:{type:'minute', delta:60, format:'H:i'}, majormark:{type:'hour', delta:3, format:'H:i, d f Y'}},
            //32
            {minormark:{type:'minute', delta:20, format:'H:i'}, majormark:{type:'hour', delta:1, format:'H:i, d f Y'}},
            //33
            {minormark:{type:'minute', delta:10, format:'H:i'}, majormark:{type:'hour', delta:1, format:'H:i, d f Y'}},
            //34
            {minormark:{type:'minute', delta:5, format:'H:i'}, majormark:{type:'minute', delta:30, format:'H:i, d f Y'}},
            //35
            {minormark:{type:'minute', delta:2, format:'H:i'}, majormark:{type:'minute', delta:20, format:'H:i, d f Y'}},
            //36
            {minormark:{type:'minute', delta:1, format:'H:i'}, majormark:{type:'minute', delta:5, format:'H:i, d f Y'}},
            //37
            {minormark:{type:'minute', delta:1, format:'H:i'}, majormark:{type:'minute', delta:5, format:'H:i, d f Y'}},
            //38
            {minormark:{type:'second', delta:20, format:'H:i:s'}, majormark:{type:'minute', delta:1, format:'H:i:s, d f Y'}},
            //39
            {minormark:{type:'second', delta:10, format:'H:i:s'}, majormark:{type:'minute', delta:1, format:'H:i:s, d f Y'}},
            //40
            {minormark:{type:'second', delta:5, format:'H:i:s'}, majormark:{type:'second', delta:30, format:'H:i:s, d f Y'}},
            //41
            {minormark:{type:'second', delta:2, format:'H:i:s'}, majormark:{type:'second', delta:20, format:'H:i:s, d f Y'}},
            //42
            {minormark:{type:'second', delta:2, format:'H:i:s'}, majormark:{type:'second', delta:10, format:'H:i:s, d f Y'}},
            //43
            {minormark:{type:'second', delta:1, format:'H:i:s'}, majormark:{type:'second', delta:5, format:'H:i:s, d f Y'}}
        ]
    }).init();

}