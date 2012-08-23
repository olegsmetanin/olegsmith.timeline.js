/*global olegsmith*/
if (typeof olegsmith.Timeline !== 'undefined' && typeof olegsmith.Timeline.HControl.Grid === 'undefined') {

    olegsmith.Timeline.HControl.Grid = ({

        init:function () {
            return this;
        },

        render:function ($element, settings) {
            var math = olegsmith.Timeline.Math;

            var _top = settings.height - 40;

            var zoomdef = olegsmith.Timeline.HConst.zoomdef[settings.zoom];
            var minmax = math.minmax(settings);

            var minorticks = math.calcmarktic(minmax.min, minmax.max, zoomdef.minormark.type, zoomdef.minormark.delta);
            var majorticks = math.calcmarktic(minmax.min, minmax.max, zoomdef.majormark.type, zoomdef.majormark.delta);

            //  Render axis line
            return olegsmith.div({
                cssclass:[
                    settings.timelayer_class
                ],
                /*                style: [
                 'overflow:hidden'
                 ],*/
                inner:(olegsmith.div({
                        cssclass:[
                            settings.axis_class
                        ],
                        style:[
                            'width:' + settings.width * 3 + 'px',
                            'height:1px',
                            'left:0px',
                            'top:' + _top + 'px',
                            'position:absolute'
                        ]}
                ) +
                    olegsmith.Timeline.Util.rendergridmarks(
                        minorticks,
                        zoomdef.minormark.format,
                        _top,
                        0,
                        1,
                        20,
                        settings.minormark_class,
                        settings.minorlabel_class,
                        settings) +
                    olegsmith.Timeline.Util.rendergridmarks(
                        majorticks,
                        zoomdef.majormark.format,
                        _top+20,
                        0,
                        1,
                        40,
                        settings.majormark_class,
                        settings.majorlabel_class,
                        settings)
                    )


            });

        }

    }).init();
}
