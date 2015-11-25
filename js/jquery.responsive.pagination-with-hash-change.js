

;(function($, window, undefined) {
    'use strict';

    $.ResponsivePagination = function(options, element) {

        this.obj = $(element),
        this.element = element;

        $.ResponsivePagination.defaults = {
            nextSelector: '.next',
            prevSelector: '.prev',
            counterSelector: '.counter',
            pagingSelector: '.paging-nav',
            itemsPerPage: 5,
            initialPage: 1,
            showPageNav: true,
            showPageNumber: true,
            textCounter: 'Page: ' 
        };

        this.options  = $.extend(true, {}, $.ResponsivePagination.defaults, options);

        this.numItems = this.obj.children().length;
        this.numPages = Math.ceil(this.numItems / options.itemsPerPage);
        this.maxValue = this.numPages;
        this.minValue = 1;

        this._init();
    };



    Range = (function () {

        var i = 0,
            minValue = 0,
            maxValue = 5;

        return {
            get: function(){
                return i;
            },
            set: function (val) {
                i = val;
            },
            setborders: function (min, max) {
                minValue = min;
                maxValue = max;
            },
            plus: function () {
                return (i < maxValue) ? ++i : i = minValue;
            },
            minus: function () {
                return (i > minValue) ? --i : i = maxValue;
            }
        };
    })();


    var Hash = (function () {

        return {
            protocol: '//',
            host: window.location.host,
            pathname: window.location.pathname,
            search: window.location.search,
            set: function (hash) {
                window.location = this.protocol +
                    this.host +
                    this.pathname +
                    this.search +
                    '#' + hash;
            },
            clear: function () {
                // no refresh
                window.location.replace('#')
            },
            get: function () {
                return window.location.hash.replace('#', '');
            }
        };
    })();


    function ShowPage(page,obj,options) {

        obj.children().hide();

        var i,
        s = (page - 1) * options.itemsPerPage,
            max = page * options.itemsPerPage;

        for (i = s; i < max; i += 1) {
            obj.children().eq(i).show();
        }
    }


    function ShowPageNumber(page, options, numPages) {

        if (options.showPageNumber === false) return;

        $(options.counterSelector).html(options.textCounter + page + '/' + numPages);
    }
           

    function ShowPageNav(options, maxValue) {

        if (options.showPageNav === false) return;
        
        var ListWrapper = '<ul></ul>',
            ListElements = '',
            i;

        for (i = 1; i <= maxValue; i += 1) {
            ListElements += '<li><a href="#' +
                i +
                '">' +
                i +
                '</a></li>';
        }

        $(ListElements)
            .appendTo(
                $(ListWrapper)
                    .appendTo(options.pagingSelector)
                );
    }

    function ActiveState(page, options) {

        if (options.showPageNav === false) return;

        $(options.pagingSelector).each(function () {
            $(this).find('li')
                .removeClass('active')
                    .eq(page - 1)
                    .addClass('active');
        });
    }


    $.ResponsivePagination.prototype = {

        _init: function() {

            this._registerHandlers(); 

            // set the startpage
            var page = this._setInitalPage(this.options.initialPage); 
            Hash.set(page); 
            Range.setborders(this.minValue, this.maxValue);
            Range.set(page);

            
            ShowPageNav(this.options, this.maxValue);

            ShowPage(page, this.obj, this.options); 
            ShowPageNumber(page, this.options, this.maxValue)
            ActiveState(page, this.options); 
            
           
        },

        _handlers: {
            '.next, click touch': '_userActionNext',
            '.prev, click touch': '_userActionPrev',
            '.paging-nav a, click touch': '_userActionPageNav'  
        },

        _registerHandlers: function() {

            var eventdata = {    
                obj: this.obj, 
                options: this.options,
                numPages: this.numPages
            }

            var _this = this;

            $.each(this._handlers, function(k, v) {
                var p = k.split(", "),
                    selector = p[0],
                    triggers = p[1];
                $(document).delegate(selector, triggers, eventdata, _this[v]);
            });
        },

        _userActionNext: function(e) {
           
            e.preventDefault();
            var page = Range.plus();
            Hash.set(page);

            
            ShowPage(page, e.data.obj, e.data.options);
            ShowPageNumber(page, e.data.options, e.data.numPages); 
            ActiveState(page, e.data.options);
            
        },

        _userActionPrev: function(e) {
           
            e.preventDefault();
            var page = Range.minus();
            Hash.set(page);

            ShowPage(page, e.data.obj, e.data.options);
            ShowPageNumber(page, e.data.options, e.data.numPages);
            ActiveState(page, e.data.options);
            
        },

        _userActionPageNav: function(e) {
            
            e.preventDefault();
            var page = this.hash.replace('#', '');
            Hash.set(page);
            Range.set(page); 

            ShowPage(page, e.data.obj, e.data.options, e.data.numPages);
            ShowPageNumber(page, e.data.options, e.data.numPages);
            ActiveState(page, e.data.options);
        },
  

        _setInitalPage: function(initValue) {
           
            return initValue;
        },
        

        destroy: function() {
            
            this.obj.removeData();
            $(document).undelegate( this.options.prevSelector, 'click touch');
            $(document).undelegate( this.options.nextSelector, 'click touch');
            $(document).undelegate( this.options.pagingSelector + ' a', 'click touch');
            $(this.options.pagingSelector).find('ul').remove();
            $(this.options.counterSelector).empty();
            $(this.element).find('li').removeAttr('style');
            Hash.clear();
            console.log('-- clear one plugin instance of ResponsivePagination --');
        }
    }; 


       $.fn.ResponsivePagination = function(options) {

        this.each(function () {

            var self = $.data(this, 'ResponsivePagination');
            if( typeof options === 'string' ) {
                var args = Array.prototype.slice.call(arguments, 1);
                if ( !self ) {
                        console.log(' -- cannot call methods prior to initialization of ResponsivePagination -- ');
                        console.log(' -- attempted to call method ' + options + ' -- '); 
                    return;
                }

                if( !$.isFunction(self[options]) || options.charAt(0) === '_' ) {
                    console.log(' -- no such public method in plugin ResponsivePagination ' + options + ' -- ');
                    return;
                }

                self[options].apply(self, args);

            } else {
                if(self) {
                    self._init(); 
                    console.log(' -- plugin ResponsivePagination is allready runnig -- ');
                } else {
                    self = $.data(this, 'ResponsivePagination', new $.ResponsivePagination(options, this));
                    console.log(' -- plugin ResponsivePagination initialization -- ');
                }
            } 
        });

        return this;
    }; 
})(jQuery, window);