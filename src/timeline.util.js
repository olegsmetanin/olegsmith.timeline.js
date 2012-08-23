/*global olegsmith*/
if (typeof olegsmith !== 'undefined' && typeof olegsmith.Timeline.Util === 'undefined') {

    olegsmith.Timeline.Util = ({

        init:function () {
            return this;
        },


        rendergridmarks:function (ticksarray, format, top, left, width, height, markclass, marklbl_class, settings) {
            var math = olegsmith.Timeline.Math;
            var html = '';
            var horizontal = settings.direction === 'h';
            var _left, _top;
            for (var i = ticksarray.length; i;) {
                var tick = ticksarray[--i];
                if (horizontal) {
                    _left = math.ticks2pix(tick, settings);
                    _top = top;
                } else {
                    _left = left;
                    _top = math.ticks2pix(tick, settings);
                }

                html +=
                    // Rander mark
                    olegsmith.div({
                        cssclass:[
                            markclass
                        ],
                        style:[
                            'width:' + width + 'px',
                            'height:' + height + 'px',
                            'left:' + _left + 'px',
                            'top:' + _top + 'px',
                            'position:absolute'
                        ]
                    }) +
                        // Render text
                        olegsmith.div({
                            cssclass:[
                                marklbl_class
                            ],
                            style:[
                                'left:' + (_left + 2) + 'px',
                                'top:' + _top + 'px',
                                'position:absolute',
                                'white-space: nowrap'
                            ],
                            inner:(new Date(tick)).format(format)
                        });
            }
            return html;
        },

        rendernow:function(settings) {
            var isHoriz=settings.direction === 'h';
            return olegsmith.div({
                    cssclass:[
                        settings.nowline_class
                    ],
                    style:[
                        'position:absolute',
                        'top:'+(isHoriz ? 0 : olegsmith.Timeline.Math.ticks2pix(new Date(), settings)) + 'px',
                        'left:'+ (isHoriz ? olegsmith.Timeline.Math.ticks2pix(new Date(), settings) : 0) +'px',
                        'width:'+(isHoriz ? 1 : settings.width) + 'px',
                        'height:'+(isHoriz ? settings.height : 1) +'px',
                        'background-color:#000'
                    ]               }
            ) +
            olegsmith.div({
                    cssclass:[
                        settings.nowlinelbl_class
                    ],
                    style:[
                        'position:absolute',
                        'top:'+(isHoriz ? 20 : (olegsmith.Timeline.Math.ticks2pix(new Date(), settings)+2)) +'px',
                        'left:'+(isHoriz ? (olegsmith.Timeline.Math.ticks2pix(new Date(), settings)+2) : 20) +'px'
                    ],
                    inner:'Now'
                }
            );
        }


    }).init();


}
