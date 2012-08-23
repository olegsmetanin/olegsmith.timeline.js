/*global olegsmith*/
if (typeof olegsmith !== 'undefined' &&
    typeof olegsmith.Timeline !== 'undefined' &&
    typeof olegsmith.Timeline.VControl !== 'undefined' &&
    typeof olegsmith.Timeline.VControl.Grid === 'undefined') {

    olegsmith.Timeline.VControl.Grid = ({

        init:function () {
            return this;
        },

        render:function ($element, settings) {

            var math = olegsmith.Timeline.Math;

            var _left = settings.width - 180;

            var zoomdef = olegsmith.Timeline.HConst.zoomdef[settings.zoom];
            var minmax = math.minmax(settings);

            var allminorticks = math.calcmarktic(minmax.min, minmax.max, zoomdef.minormark.type, zoomdef.minormark.delta);
            var majorticks = math.calcmarktic(minmax.min, minmax.max, zoomdef.majormark.type, zoomdef.majormark.delta);
            var minorticks = math.diffarray(allminorticks, majorticks);

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
                            'height:' + settings.height * 3 + 'px',
                            'width:2px',
                            'left:' + _left + 'px',
                            'top:0px',
                            'position:absolute'


                        ]}
                ) +
                    olegsmith.Timeline.Util.rendergridmarks(
                        minorticks,
                        zoomdef.minormark.format,
                        0,
                        _left,
                        40,
                        1,
                        settings.minormark_class,
                        settings.minorlabel_class,
                        settings) +
                    olegsmith.Timeline.Util.rendergridmarks(
                        majorticks,
                        zoomdef.majormark.format,
                        0,
                        _left,
                        80,
                        1,
                        settings.majormark_class,
                        settings.majorlabel_class,
                        settings)
                    )


            });

        }

    }).init();
}
