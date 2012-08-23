/*global olegsmith, $, window, jQuery, console*/
(function($) {
    "use strict";
    var methods = {
        init: function(options) {

            return this.each(function() {

                var $this = $(this),
                    data = $this.data('timeline');

                var settings = $.extend({
                    direction:'h',
                    background_class: 'tml-bg',
                    container_class: 'tml-wrp',
                    center_date:new Date(),
                    zoom: 36,
                    width:$this.width(),
                    height:$this.height(),
                    axis_class:'tml-ax',
                    minormark_class:'tml-minmrk',
                    majormark_class:'tml-majmrk',
                    minorlabel_class:'tml-minlbl',
                    majorlabel_class:'tml-majlbl',
                    timelayer_class:'tml-timelayer',
                    userlayer_class:'tml-userlayer',
                    scale_class:'tml-scale',
                    scalecontainer_class:'tml-scalewrp',
                    nowline_class:'tml-now',
                    nowlinelbl_class:'tml-nowlbl',
                    updatefn:function () {},
                    ticks2pix:function (ticks) {
                        return olegsmith.Timeline.Math.ticks2pix(ticks, this);
                    },
                    zoomOnWheel:false
                }, options);

                settings.center_tick=settings.center_date.getTime();

                // If the plug`in hasn't been initialized yet
                if (!data) {

                    $this.css("overflow", "hidden");
                    $this.css("position","relative");

                    var extsettings= {
                    };

                    var timeline = (settings.direction === 'h' ? new olegsmith.Timeline.HControl(this, settings, extsettings) :  new olegsmith.Timeline.VControl(this, settings, extsettings));
                    timeline.init();

                    $(this).data('timeline', {
                        target: $this,
                        timeline: timeline
                    });

                    $(window).bind('debouncedresize.timeline.olegsmith', function() {
                        timeline.resize();
                    });

                }

            });
        },
        destroy: function() {

            return this.each(function() {

                var $this = $(this),
                    data = $this.data('timeline');

                // Namespacing FTW
                $(window).unbind('.timeline.olegsmith');
                data.timeline.remove();
                $this.removeData('timeline');

            });
        },
        update: function() {
            var $this = $(this),
                data = $this.data('timeline');
            var timeline=data.timeline;
            timeline.update();
        },
        zoomin: function() {
            var $this = $(this),
                data = $this.data('timeline');
            var timeline=data.timeline;
            timeline.zoomin();
        },
        zoomout: function() {
            var $this = $(this),
                data = $this.data('timeline');
            var timeline=data.timeline;
            timeline.zoomout();
        },
        now: function() {
            var $this = $(this),
                data = $this.data('timeline');
            var timeline=data.timeline;
            timeline.now();
        }
    };

    $.fn.timeline = function(method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.timeline');
        }

    };

})(jQuery);