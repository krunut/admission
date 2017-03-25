    /** iSchool Admission System **/
    
    //Toggle navbar if width < 1024px 
    if ($(window).width() < 768) {
        $("body").removeClass("left-nav-minimized");
    } else if ($(window).width() < 1024) {
        $("body").addClass("left-nav-minimized");
    } else {
        $("body").removeClass("left-nav-minimized");
    }

    //Document ready functions
    $(document).ready(function () {

        /* Additional optional toggle */
        $('.add-opt .fa-gear').click(function(){
            $('.add-opt').toggleClass('expanded');
            $(this).toggleClass('fa-spin');
        });

        $('.color-option').click(function(){
            var dataToggle = $(this).attr('data-toggle'),
                dataColor  = $(this).attr('data-color'),
                dataColorSec = $(this).attr('data-colorSec')

            $(this).addClass('active');
            $('.color-option').not(this).removeClass('active');

            $('body').attr('class', dataColor);
            $('.body-class').html(dataColor);
            $('#timeDate').attr('class', 'switch ' + dataColorSec + '');
            $('#pageLoad').attr('class', 'switch ' + dataColorSec + '')

            if ($(this).attr('data-color') == 'dark') {
                $('.body-class').css('color', '#b3c6d7');
            } else {
                $('.body-class').css('color', dataToggle);
            }

            $('.add-opt').css('background-color', dataToggle);
        });

        $('#timeDate input').click(function() {
            if ($('#timeDate > input').is(':checked')) {
                $('.time').show();
            } else {
                $('.time').hide();
            }
        });

        //Toggle navbar if width < 1024px 
        $(window).resize(function() {
            if ($(window).width() < 768) {
                $("body").removeClass("left-nav-minimized");
            } else if ($(window).width() < 1024) {
                $("body").addClass("left-nav-minimized");
            } else {
                $("body").removeClass("left-nav-minimized");
            }
        });

        // Remove transition restriction (fix IE rendering bug)
        $('body').removeClass('hold-transition');

        // Call breadcrumb active element
        $('body').delay(200).queue(function(){
            breadcrumb();
            $(this).dequeue();
        });

        // Toggle left menu
        $('.left-nav-toggle').click(function(event){
            event.preventDefault();
            $("body").toggleClass("left-nav-minimized");
        });

        // Hide expanded nav-item
        $('.nav-item').on('show.bs.collapse', function () {
            $('.nav-item.in').not(this).collapse('hide');
        });

        // Hide expanded nav-item-secondary
        $('.nav-item-secondary').on('show.bs.collapse', function () {
            $('.nav-item-secondary.in').collapse('hide');
        });

        // Active navigation item on page load/refresh
        var checkActive = function(){
            var path = window.location.href,
                path = decodeURI(path),
                firstIndex = path.lastIndexOf('/'),
                path = path.substring(firstIndex, path.length).slice(1)

            if ( window.location.pathname.indexOf(path) > -1 ) {
                $('.navigation .nav li a[href="'+path+'"]').parent().addClass('active');
                $('.navigation .nav li a:not([href="'+path+'"])').parent().removeClass('active');
            }
        };

	    checkActive();   

        // Keep nav li expanded and active if child is active;
        var primaryLi = function() {
	        if ($('.primary li').hasClass('active')) {
	        	$('.primary li.active').parentsUntil('.primary').addClass('in');
	        }
	    }
		primaryLi();

        // Sidebar time
        if ($('.time').length > 0) {
            var datetime = null,
                date = null;
            var update = function () {
                d = new Date();
                date = moment(new Date());
                datetime.html(date.format('LL '));
            };
            datetime = $('.current-time')
            update();
            setInterval(update, 60000);
            var update = function () {
                date = moment(new Date())
                datetime1.html(date.format('h:mm a'));
            };
            datetime1 = $('.current-time2')
            update();
            setInterval(update, 10000);

            $('.time').click(function(){
                $(this).toggleClass('non-visible');
            });
        }

        var panelActions = function(){

        // Toggle Panel
        $('.panel-toggle').click(function(event){
            event.preventDefault();
            var panel = $(event.target).closest('div.panel');
            var icons = $(event.target).closest('i');
            var body = panel.find('div.panel-body');
            var footer = panel.find('div.panel-footer');
            body.slideToggle(200);
            footer.slideToggle(100);

            // Toggle icon from up to down
            icons.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
            panel.toggleClass('').toggleClass('panel-collapse');
            setTimeout(function () {
                panel.resize();
            }, 15);
            });

            // Close Panel
            $('.panel-close').on('click', function(event){
                event.preventDefault();
                var panel = $(event.target).closest('div.panel');
                panel.remove();
            });

            // Draggable panels
            var itemsDrag = $(this);
            $('.panels-draggable .draggable').sortable(
                {
                    handle: '.panel-heading',
                    connectWith: '.draggable',
                    opacity: 0.4,
                    scroll: true,
                    dropOnEmpty: true,
                    forcePlaceholderSize: true,
                    placeholder: 'sortable-placeholder',
                    start: function(e, ui){
                        if($(this).children().hasClass('panel')){
                        $('.sortable-placeholder').css('margin-bottom', '20px');
                    }  
                        $('.sortable-placeholder').html($(this).children());
                    }
                });

            $('.panels-draggable .draggable').disableSelection();

            // Messages categories toggle
            $(".inbox-categories div").click(function(event){
                $(this).addClass('active');
                $('.inbox-categories div').not(this).removeClass('active');
            });

            // New message show and close 
            $('.new-message').click(function(event){
                $(this).next('.new-message-wrapper').show();
            });

            $('.close-new-message').on('click', function(event){
                event.preventDefault();
                var panel = $(event.target).closest('.new-message-wrapper');
                panel.hide();
            });
        };
        panelActions();

        function breadcrumb(){
            $('.breadcrumb li:last-child a').css({'opacity' : '1', 'margin-left' : "0px"});
        };  

        $('.navigation .nav li a').not('.navigation .nav li.nav-item-expandable > a').click(function(navActive){
            checkActive();
        }); 
    });
