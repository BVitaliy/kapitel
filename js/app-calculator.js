jQuery(function ($) {
    "use strict";

    // input validation
    $('input[type=number].input').on('input', function () {
        let val = $(this).val();

        // Remove any non-digit characters
        val = val.replace(/[^0-9]/g, '');

        // Convert to number
        let num = parseInt(val) || 0;

        // Enforce minimum 0
        if (num < 0) num = 0;

        // Enforce maximum 999
        if (num > 99) num = 99;

        // Update the input value
        $(this).val(num);
    });

    //*==============
    //*  Stepper    =
    //*==============
    _functions.getValue = function ($input) {
        return parseInt($input.val().replace("%", ""), 10);
    };

    _functions.setValue = function ($input, val) {
        $input.val(val + "%");
        _functions.updateScale(val);
    };

    _functions.updateScale = function (val) {
        let scale = val / 100;
        $(".rooms-map__image, .style-map__image").css("transform", "scale(" + scale + ")");
    };

    _functions.decreaseValue = function ($input) {
        let val = _functions.getValue($input);
        val -= 50;
        if (val < 50) val = 50; // min 50%
        _functions.setValue($input, val);
    };

    _functions.increaseValue = function ($input) {
        let val = _functions.getValue($input);
        val += 50;
        if (val > 200) val = 200; // max 200%
        _functions.setValue($input, val);
    };

    const $input = $(".js_zoom input");

    _functions.updateScale(_functions.getValue($input));

    $(".js_zoom .decr").on("click", function () {
        _functions.decreaseValue($input);
    });

    $(".js_zoom .incr").on("click", function () {
        _functions.increaseValue($input);
    });


    //===============
    // Drag + Touch  
    //===============
    (function(){
        let isDragging = false;
        let startX = 0, startY = 0;
        let lastX = 0, lastY = 0;
        let currentScale = 1;

        const originalUpdateScale = _functions.updateScale;
        _functions.updateScale = function(val){
            currentScale = val / 100;
            originalUpdateScale(val);

            $('[data-draggable]').css('transform', `translate(${lastX}px, ${lastY}px) scale(${currentScale})`);
        };

        function getPoint(e){
            if(e.touches && e.touches.length){
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        }

        $('[data-draggable]').each(function(){
            const $el = $(this);

            function start(e){
                const p = getPoint(e);

                isDragging = true;
                startX = p.x - lastX;
                startY = p.y - lastY;

                $el.addClass('dragging');
                $el.css('cursor', 'grab');

                e.preventDefault();
            }

            function move(e){
                if(!isDragging) return;

                const p = getPoint(e);
                lastX = p.x - startX;
                lastY = p.y - startY;

                $el.css('transform', `translate(${lastX}px, ${lastY}px) scale(${currentScale})`);
                e.preventDefault();
            }

            function stop(){
                isDragging = false;
                $el.removeClass('dragging');
                $el.css('cursor', 'default');
            }

            // mouse
            $el.on('mousedown', start);
            $(document).on('mousemove', move);
            $(document).on('mouseup', stop);

            // touch
            $el.on('touchstart', start);
            $(document).on('touchmove', move);
            $(document).on('touchend touchcancel', stop);
        });
    })();




    // close filters
    $(document).on('click', '.filters-close', function () {
        $(this).toggleClass('active');
        $(this).next('.filters-bg').toggleClass('active');
    });

    // Handle click on "+" button
    $('.filters-num-body').on('click', '.incr', function () {
        // Find the current stepper
        let $stepper = $(this).closest('.stepper');

        // Find the input inside stepper
        let $input = $stepper.find('input');

        // Increase the value by 1
        let currentVal = parseInt($input.val()) || 1; // default at least 1
        $input.val(currentVal + 1);

        // Create a new row element
        let $row = $(this).closest('.filters-num-row');
        let $newRow = $(`
        <div class="filters-num-row type2">
            <div class="filter-num-cell"></div>
            <div class="filter-num-cell"></div>
            <div class="filter-num-cell">
            <input type="number" value="" min="1" max="999" class="input">
            <span>м²</span>
            </div>
        </div>
        `);

        // Insert the new row right after the current one
        $row.after($newRow);
    });

    // Handle click on "-" button
    $('.filters-num-body').on('click', '.decr', function () {
        // Find the current stepper
        let $stepper = $(this).closest('.stepper');

        // Find the input inside stepper
        let $input = $stepper.find('input');

        // Decrease the value by 1, but not below 1
        let currentVal = parseInt($input.val()) || 1;
        if (currentVal > 1) {
            $input.val(currentVal - 1);

            // Remove the next row if it has class "type2"
            let $row = $(this).closest('.filters-num-row');
            let $nextRow = $row.next('.filters-num-row.type2');
            if ($nextRow.length) {
                $nextRow.remove();
            }
        }
    });

    // Function to update total-square
    _functions.updateTotal = function () {
        let total = 0;

        // Loop through all inputs inside .filters-num-body
        $('.filters-num-body .input').each(function () {
            let val = parseInt($(this).val()) || 0;
            total += val;
        });

        // Update the total-square element
        $('.total-square').text(total);

        // Save to localStorage
        localStorage.setItem('totalSquare', total);
    }

    // Run once on page load
    $(document).ready(function () {
        // If we have saved value in localStorage, show it
        let savedTotal = localStorage.getItem('totalSquare');
        if (savedTotal !== null) {
            $('.total-square').text(savedTotal);
        }

        // If filters-num-body exists, run updateTotal
        if ($('.filters-num-body').length > 0) {
            _functions.updateTotal();
        }
    });

    // Update total whenever any input changes
    $('.filters-num-body').on('input', '.input', function () {
        _functions.updateTotal();
    });

    // Also update when incr/decr buttons are clicked
    $('.filters-num-body').on('click', '.incr, .decr', function () {
        _functions.updateTotal();
    });

    // Active filters image
    $(document).on('click', '.filters-img', function () {
        $('.filters-img').removeClass('active');
        $(this).addClass('active');
    });

    // Filter options
    $(document).on('click', '.filter-opt__top', function () {
        $(this).closest('.filter-opt').toggleClass('active');
        $(this).closest('.filter-opt').find('.filter-opt__inner').slideToggle();
    });

});