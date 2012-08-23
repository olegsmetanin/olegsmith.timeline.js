/*  Create namespace
 https://github.com/shichuan/javascript-patterns/blob/master/object-creation-patterns/namespace.html
 ================================================== */
var olegsmith = olegsmith || {};


/*  Access to the Global Object
 https://github.com/shichuan/javascript-patterns/blob/master/general-patterns/access-to-global-object.html
 ================================================== */
var global = (function () {
                return this || (1, eval)('this');
            }());


olegsmith.div = function (o) {
    return '' +
        '<div' +
        ((typeof o.cssclass !== "undefined") ? ' class="' + o.cssclass.join(' ') + '"' : '') +
        ((typeof o.style !== "undefined") ? ' style="' + o.style.join(';') + '"' : '') +
        '>' +
        ((typeof o.inner !== "undefined") ? o.inner : '') +
        ((typeof o.innerfn !== "undefined") ? o.innerfn() : '') +
        '</div>';
};


/*
Common patterns

Using:
olegsmith.Some.More.usefulfunction(arg);

if(typeof olegsmith.Some !== 'undefined' && typeof olegsmith.Some.More == 'undefined') {
    olegsmith.Some.More = ({
        init: function() {
            return this;
        },
        usefulfunction: function(arg) {
            return arg;
        }
    }).init();
}


Using:
var some=new olegsmith.Some.More(element, settings);
var res=some.publicmethod();

if(typeof olegsmith.Some !== 'undefined' && typeof olegsmith.Some.More == 'undefined') {
    olegsmith.Some.More = function (element, settings) {
        // Public methods
        this.publicmethod= function () {
            return fn(element);
        };
        // Private method
        var privatemethod = function () {
            return fn(element);
        }
    };
}*/
