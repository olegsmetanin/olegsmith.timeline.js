/*global window, $, olegsmith, console*/
if (typeof olegsmith !== 'undefined' && typeof olegsmith.Timeline.HControl === 'undefined') {

    olegsmith.Timeline.HControl = function (element, settings, extsettings) {
        var $element = $(element),
            $container,
            $userlayer,
            $scalebar,
            $nowline,
            $this = this;

        var scrollLeft, original_center_tick;

        this.init = function () {
            $element
                .mousewheel(function (event, delta) {
                    if (!(((settings.zoom <= 0) && (delta < 0)) || ((settings.zoom > 42) && (delta > 0)))) {
                        var newtimelevel = settings.zoom + (delta > 0 ? 1 : -1);
                        settings.center_tick = olegsmith.Timeline.Math.zoomto(event.clientX - $element.position().left - $container.position().left, settings, newtimelevel);
                        settings.zoom = newtimelevel;
                        $this.render();
                    }
                    return false;
                })
                .drag('start', function (event) {
                    scrollLeft = event.clientX;
                    original_center_tick = settings.center_tick;
                })
                .drag(function (event, dd) {
                    var _left=-settings.width + event.clientX - scrollLeft;

                    if (_left > 0 || _left < -2 * settings.width) {

                        settings.center_tick = olegsmith.Timeline.Math.shift(event.clientX - scrollLeft, settings);
                        $this.render();

                        scrollLeft = event.clientX;
                        original_center_tick = settings.center_tick;

                    } else {
                        $container.css({ left:_left});
                    }

                })
                .drag('end', function (event, dd) {
                    settings.center_tick = original_center_tick;
                    settings.center_tick = olegsmith.Timeline.Math.shift(event.clientX - scrollLeft, settings);
                    $this.render();
                });



            this.render();
        };


        this.resize = function () {
            settings.width = $element.width();
            this.render();
        };

        this.update = function () {
            $userlayer.html(settings.updatefn());
        };

        this.zoomin = function () {
            if (settings.zoom < 42) {
                settings.zoom++;
                this.render();
            }
        };

        this.zoomout = function () {
            if (settings.zoom > 0) {
                settings.zoom--;
                this.render();
            }
        };

        this.now = function () {
            settings.center_tick = (new Date()).getTime();
            this.render();
        };


        this.render = function () {

            var $background = $(olegsmith.div({
                    cssclass:[
                        settings.background_class
                    ],
                    style:[
                        'position:absolute',
                        'width:100%',
                        'height:100%',
                        'left:0px',
                        'top:0px'
                    ]
                }
            ));

            $container = $(olegsmith.div({
                    cssclass:[
                        settings.container_class
                    ],
                    style:[
                        'display:block',
                        'position:absolute',
                        'width:' + $element.width() * 3 + 'px',
                        'height:' + $element.height() + 'px',
                        'left:-' + $element.width() + 'px'
                    ],
                    innerfn:function () {
                        return olegsmith.Timeline.HControl.Grid.render($element, settings);
                    }
                }
            ));

            $userlayer = $(olegsmith.div({
                    cssclass:[
                        settings.userlayer_class
                    ],
                    innerfn:function () {
                        return settings.updatefn(settings);
                    }
                }
            ));

            $nowline = $(olegsmith.div({
                    cssclass:[
                        settings.nowline_class
                    ]
                }
            ));


            $scalebar = $(olegsmith.div({
                    cssclass:[
                        settings.scale_class
                    ],
                    style:[
                        'position:absolute',
                        'top:0px',
                        'left:0px'
                    ],
                    inner:"Timescale"
                }
            ));




            $container.append($userlayer);
            $container.append($nowline);
            $element.html('');
            $element.append($background);
            $element.append($container);
            $element.append($scalebar);
            console.log('render');


            $scalebar.mousedown(function (event) {
                $container.trigger(event);
            });


            (function nowfn() {
                var onepixtics=olegsmith.Timeline.Math.dpix2dticks(1,settings.zoom);
                var tics15dim=onepixtics*(settings.direction === 'h' ? settings.width : settings.height )*1.5;
                var now=(new Date()).getTime();

                if (now<settings.center_tick-tics15dim) {
                    $nowline.html('');
                    window.setTimeout(nowfn, settings.center_tick-tics15dim-now);
                } else
                if (now>(settings.center_tick-tics15dim) && now<(settings.center_tick+tics15dim)) {
                        $nowline.html(
                            olegsmith.Timeline.Util.rendernow(settings)
                        );
                    window.setTimeout(nowfn,onepixtics*5);
                } else {
                    $nowline.html('');
                }
            })();


        };

    };

}
