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


 

    // close filters
    $(document).on('click', '.filters-close', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next('.filters-bg').toggleClass('active');
    });

    // Handle click on "+" button
    $('.filters-num-body').on('click', '.incr', function () {
        let $stepper = $(this).closest('.stepper');

        // Input
        let $input = $stepper.find('input');

        let currentVal = parseInt($input.val()) || 1;
        let max = parseInt($input.attr('max')) || 999;

        // Якщо вже max — не інкрементуємо і не створюємо новий ряд
        if (currentVal >= max) {
            $input.val(max);
            return;
        }

        // Інкремент
        let newVal = currentVal + 1;
        if (newVal > max) newVal = max;

        $input.val(newVal);

        // Якщо після інкременту НЕ досягли max — створюємо новий ряд
        if (newVal <= max) {
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

            $row.after($newRow);
        }

        $(document).on("input", '.filters-num-row input[type="number"]', function () {
            updateRoomsMap();
            updateRoomsFormData();
        });
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

    $(document).on("input", '.filters-num-row input[type="number"]', function () {
        updateRoomsMap();
        updateRoomsFormData();
    });
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
        console.log('asdasd')
        _functions.updateTotal();
    });

    // Also update when incr/decr buttons are clicked
    $('.filters-num-body').on('click', '.incr, .decr', function () {
        _functions.updateTotal();
    });

 

   // Filter options
    $(document).on('click', '.filter-opt__top', function () {
        let optMarker = $(this).parent('.filter-opt').data('marker');

        $(this).closest('.filter-opt').find('.filter-opt__inner').slideToggle();        
        $(this).closest('.filter-opt').siblings().find('.filter-opt__inner').slideUp();

        $('.style-map .marker').each(function () {
            let marker = $(this).data('marker');

            if (marker == optMarker) {
                $(this).toggleClass('active').siblings('.marker').removeClass('active');
            }
        });
    });

        // Add active class to marker
    $(document).on('click', '.marker', function () {
        let marker = $(this).data('marker');

        $(this).toggleClass('active').siblings('.marker').removeClass('active');

        $('.filter-opt').each(function () {
            let optMarker = $(this).data('marker');
            let filterInner = $(this).find('.filter-opt__inner');

            if (optMarker == marker) {
                filterInner.slideToggle();

                $(this).siblings().find('.filter-opt__inner').slideUp();
            }
        });
    });


        //===============
    // Drag + Touch  
    //===============
 
    let isDragging = false;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let currentScale = 1;


 
    _functions.resetDrag = function(){
        isDragging = false;
        startX = 0;
        startY = 0;
        lastX = 0;
        lastY = 0;

        $('[data-draggable]').css('transform', `translate(0px, 0px) scale(${currentScale})`);
    };

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

 
    // Active filters image
    $(document).on('click', '.filters-img', function () {

        $('.filters-img').removeClass('active');
        $(this).addClass('active');

        const targetId = $(this).data('image-target');
        const imageSrc = $(this).data('image');
        const styleId  = $(this).data('style-id'); // <---- Додано

        const $targetImg = $(`[data-image-id="${targetId}"]`);
        if (!$targetImg.length) return;

        $targetImg.addClass('no-transition');
        $targetImg.attr('src', imageSrc);

        setTimeout(() => {
            $targetImg.removeClass('no-transition');
        }, 50);

        // --------------------------
        // 🔥 Перемикання маркерів
        // --------------------------
        $('[data-markers] .list').removeClass('active visible');

        const $activeMarkers = $(`[data-markers-id="${styleId}"]`);
        if ($activeMarkers.length) {
            $activeMarkers.addClass('active visible');
        }

        // -------------------------------
        // Оновлює hidden input
        const $activeTab = $('._tab-item.is-active');
        const tabIndex = $activeTab.index() + 1;
        const roomType = $('.filters-title').data('room-type');

        const inputName = `${roomType}-image-${tabIndex}`;
        const $formInput = $(`#main-form [name="${inputName}"]`);

        if ($formInput.length) {
            $formInput.val(imageSrc);
        }

        // Reset zoom + drag
        _functions.setValue($(".js_zoom input"), 100);
        _functions.resetDrag();
    });



    $(document).ready(function(){

        // тип приміщення (на сторінці тільки один)
        const roomType = $('.filters-title').data('room-type'); // "кухня"
        const $tabs = $('._tab-item');
        
        const $form = $('#main-form');

        // створює hidden input для кожного таба
        $tabs.each(function(index){
            const tabIndex = index + 1; // щоб рахувало з 1
            const inputName = `${roomType}-image-${tabIndex}`;
 
            if( !$form.find(`[name="${inputName}"]`).length ){
                const $input = $('<input>', {
                    type: 'hidden',
                    name: inputName,
                    value: '' // спочатку пусте
                });
                $form.append($input);
            }
        });

        // ініціалізує картинку на активному табі
        const activeIndex = $tabs.filter('.is-active').index() + 1;
        const activeInput = $form.find(`[name="${roomType}-image-${activeIndex}"]`);
        
        // якщо картинка є в data-image-id
        const $mainImg = $('.style-map__image').find('img[data-image-id]')
        if($mainImg.length){
            activeInput.val($mainImg.attr('src'))
        }

    });

    $(document).on('click', '._tab-item', function(){
        const $this = $(this);
        const index = $this.index() + 1;
        const roomType = $('.filters-title').data('room-type');
        const $form = $('#main-form');

        // знімаємо активні класи
        $this.siblings().removeClass('is-active');
        $this.addClass('is-active');

        // показуємо відповідний _tab
        const $tabsContent = $('.filters ._tab');
        $tabsContent.removeClass('active').eq(index-1).addClass('active');

        // оновлюємо картинку
        const $mainImg = $('.style-map__image').find('img[data-image-id]');
        const mainDefaultSrc = $mainImg.attr('data-default-src');
        const inputName = `${roomType}-image-${index}`;
        const $input = $form.find(`[name="${inputName}"]`);

        let newSrc;
        if($input.val()){ // якщо раніше вибрана картинка
            newSrc = $input.val();
        } else {
            // скидає на дефолт
            newSrc = mainDefaultSrc;
            $input.val(mainDefaultSrc);
        }

        $mainImg.attr('src', newSrc);

        // === Додаємо активний клас на filters-img для поточного таба
        $('.filters-img').removeClass('active');
        $(`.filters-img[data-image="${newSrc}"]`).addClass('active');

        _functions.setValue($(".js_zoom input"), 100);
        // $('[data-draggable]').css('transform', `translate(0px, 0px) scale(1)`);
         _functions.resetDrag();
     
    });


    $(document).ready(function() {
        const $form = $('#main-form');

        // Функція для оновлення small з вибраними опціями
        function updateFilterOptTitle($opt) {
            const selected = [];

            $opt.find('.ch-box-wrap').each(function() {
                const $wrap = $(this);
                const $mainCheckbox = $wrap.find('> label.ch-box > input[type="checkbox"]').first();
                const $mainLabel = $wrap.find('> label.ch-box > span').first().text().trim();

                if($mainCheckbox.length) {
                    if(!$mainCheckbox.is(':checked')) {
                        // якщо батьківський чекбокс відчеканий — очищаємо вкладені input
                        $wrap.find('.ch-box-inner input').each(function() {
                            const name = $(this).attr('name');
                            // if(name) $form.find(`[name="${name}"]`).val('');
                            if($(this).is(':checkbox') || $(this).is(':radio')) $(this).prop('checked', false);
                        });
                        return; // пропускаємо цю обгортку
                    }
                }

                // для вкладених input
                const $checkedInner = $wrap.find('.ch-box-inner input:checked');
                if($checkedInner.length) {
                    $checkedInner.each(function() {
                        const valLabel = $(this).closest('label').find('span').first().text().trim();
                        if($mainLabel) {
                            selected.push($mainLabel + ' - ' + valLabel);
                        } else {
                            selected.push(valLabel);
                        }
                    });
                } else if($mainCheckbox.length && $mainCheckbox.is(':checked')) {
                    // якщо тільки батьківський чекбокс без вкладень
                    selected.push($mainLabel);
                } else if(!$mainCheckbox.length) {
                    // немає батьківського чекбоксу, але є radio buttons
                    const $checkedRadio = $wrap.find('input[type="radio"]:checked');
                    if($checkedRadio.length) {
                        const radioLabel = $checkedRadio.closest('label').find('span').first().text().trim();
                        selected.push(radioLabel);
                    }
                }
            });

            const $small = $opt.find('.filter-opt__title small');
            if(selected.length) {
                $small.text(selected.join(', '));
            } else {
                const defaultText = $opt.data('default-text') || '';
                $small.text(defaultText);
            }
        }

        // Зберігаємо дефолтний текст
        $('.filter-opt').each(function() {
            const $title = $(this).find('.filter-opt__title small');
            $(this).data('default-text', $title.text().trim());
        });

        // Слухаємо зміни в input
        $form.on('input change', 'input, select, textarea', function() {
            // Вивід значень форми
            const formData = {};
            $form.find('input, select, textarea').each(function() {
                const name = $(this).attr('name');
                if(!name) return;

                if($(this).is(':checkbox')) {
                    formData[name] = $(this).is(':checked');
                } else if($(this).is(':radio')) {
                    if($(this).is(':checked')) formData[name] = $(this).val();
                    else if(!(name in formData)) formData[name] = '';
                } else {
                    formData[name] = $(this).val();
                }
            });
            // console.clear();
            // console.log('Form values:',  formData);

            // Оновлюємо small для кожного батьківського filter-opt
            const $opt = $(this).closest('.filter-opt');
            updateFilterOptTitle($opt);
        });

        // Ініціалізація для pre-checked значень
        $('.filter-opt').each(function() {
            updateFilterOptTitle($(this));
        });
    });


    function updateRoomsMap() {
        let totalGlobalSquare = 0;

        $(".filters-num-row").each(function () {
            const $row = $(this);

            // новий ключ
            const roomType = $row.data("room-type");      // kithen, room, corridor...
            const imgSrc = $row.data("filled-image");
            const count = parseInt($row.find(".stepper input").val()) || 0;

            let totalRoomSquare = 0;

            // збираємо всі площі для цього row (враховує також додані type2)
            $row.find('input[type="number"]').each(function () {
                let val = parseFloat($(this).val());
                if (!isNaN(val)) totalRoomSquare += val;
            });

            totalGlobalSquare += totalRoomSquare;

            // Картинка на мапі за roomType
            let $mapImg = $(`img[data-image-id="${roomType}"]`);

            // Тултіп можна знайти або по data-tooltip
            let $tooltip = $(`.rooms-map .tooltip[data-tooltip="${roomType}"]`);

            // Якщо тултіпів нема з data-tooltip — fallback на індекс
            if (!$tooltip.length) {
                const index = $(".filters-num-row").index($row);
                $tooltip = $(".rooms-map .tooltip").eq(index);
            }

            // ---------------------------
            // ПОКАЗ / СКРИТТЯ КАРТИНКИ
            // ---------------------------
            if (totalRoomSquare > 1) {
                $mapImg.attr("src", imgSrc);
            } else {
                $mapImg.attr("src", "#");
            }

            // ---------------------------
            // ОНОВЛЕННЯ ТУЛТІПУ
            // ---------------------------
            $tooltip.find("b").text(totalRoomSquare);
        });

        // Глобальна площа
        $(".total-square").text(totalGlobalSquare);

        updateRoomsFormData();
    }


    function buildRoomsObject() {
        let result = {};

        $(".filters-num-row").each(function () {
            const $row = $(this);
            const type = $row.data("room-type");  // kithen, room, corridor...
            const count = parseInt($row.find(".stepper input").val()) || 0;

            // Масив площ (кожен input — окрема кімната)
            let squares = [];

            $row.find('input[type="number"]').each(function () {
                const val = parseFloat($(this).val());
                if (!isNaN(val) && val > 0) {
                    squares.push(val);
                }
            });

            // Якщо нема площ або count = 0 → пропускаємо
            if (squares.length === 0 || count === 0) return;

            // Масив приміщень одного типу
            result[type] = [];

            // Формуємо елементи масиву приміщень
            // Кількість кімнат = count
            // Площі = squares[i] або null (якщо не вистачає)
            for (let i = 0; i < count; i++) {
                result[type].push({
                    square: squares[i] || null,   // на цьому етапі тільки площа
                    // на наступних сторінках можна додавати:
                    // floor_type: null,
                    // wall_type: null,
                    // notes: "",
                });
            }
        });

        return result;
    }

    function updateRoomsFormData() {
        const obj = buildRoomsObject();
        $("#rooms_data").val(JSON.stringify(obj));
        console.clear()
        console.log('DATA:',obj)
    }

    // -------------------------------
    // ЛІСТЕНЕРИ
    // -------------------------------

    // Ввод площі
    $(document).on("input", '.filters-num-row input[type="number"]', function () {
        updateRoomsMap();
        updateRoomsFormData();
    });

    $(document).on("click", ".filters-num-row .incr, .filters-num-row .decr", function () {
        setTimeout(() => {
            updateRoomsMap();
            updateRoomsFormData();
        }, 50);
    });

    // Стартовий запуск
    updateRoomsMap();

});