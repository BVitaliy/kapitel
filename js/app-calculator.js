jQuery(function ($) {
    "use strict";

    let isDragging = false;
    let startX = 0, startY = 0;
    let lastX = 0, lastY = 0;
    let currentScale = 1;

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


_functions.restoreInputsFromRoomsData = function () {
    let saved = localStorage.getItem('rooms_data');
    if (!saved) return;

    let rooms = JSON.parse(saved);
    // console.log('rooms' ,rooms)
    Object.keys(rooms).forEach(type => {
        let items = rooms[type];

        // Перший (оригінальний) row
        let $firstRow = $(`.filters-num-row[data-room-type="${type}"]`).first();
        if ($firstRow.length === 0) return;

        // Видаляємо попередні type2 ряди
        $(`.filters-num-row[data-room-type="${type}"]`).not($firstRow).remove();

        // ---- FIRST ROW ----

        // 1) КІЛЬКІСТЬ — stepper-number
        $firstRow.find(".stepper-number input").val(items.length);

        // 2) ПЛОЩА — input.input
        if (items[0] && items[0].square != null) {
            $firstRow.find("input.input").val(items[0].square);
        } else {
            $firstRow.find("input.input").val("");
        }

        // ---- OTHER ROWS ----
        if (items.length > 1) {
            let filledImage = $firstRow.data("filled-image");

            for (let i = 1; i < items.length; i++) {
                let square = items[i].square ?? "";

                let $newRow = $(`
                    <div class="filters-num-row type2"
                        data-room-type="${type}"
                        data-filled-image="${filledImage}">
                        <div class="filter-num-cell"></div>
                        <div class="filter-num-cell"></div>
                        <div class="filter-num-cell">
                            <input type="number" value="${square}" min="1" max="999" class="input">
                            <span>м²</span>
                        </div>
                    </div>
                `);

                $firstRow.after($newRow);
                $firstRow = $newRow;
            }
        }
    });
};



    // Function to update total-square
    _functions.updateTotal = function () {
        let total = 0;

        const $inputs = $('.filters-num-body .input');

        if ($inputs.length) {
      
            // 1️⃣ Рахуємо з інпутів (сторінка з формою)
            $inputs.each(function () {
                let val = parseFloat($(this).val());
                if (!isNaN(val) && val > 0) {
                    total += val;
                }
            });
        } else {
            // 2️⃣ Фолбек — беремо з localStorage (інші сторінки)
            const saved = localStorage.getItem('rooms_data');

            if (saved) {
             
                const roomsData = JSON.parse(saved);

                Object.keys(roomsData).forEach(type => {
                    roomsData[type].forEach(room => {
                        if (room?.square && !isNaN(room.square)) {
                            total += Number(room.square);
                        }
                    });
                });
       
    }
}

 
        // 3️⃣ Оновлюємо UI
        $('.total-square').text(total);

        // 4️⃣ Зберігаємо загальну площу
        localStorage.setItem('totalSquare', total);
    };

    // Run once on page load
    $(document).ready(function () {
        // If we have saved value in localStorage, show it
        // let savedTotal = localStorage.getItem('totalSquare');
        // if (savedTotal !== null) {
        //     $('.total-square').text(savedTotal);
        // }

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

    // Save all values of .input fields into localStorage
    function saveInputs() {
        let inputsData = [];
        $('.filters-num-body .input').each(function (index) {
            inputsData[index] = $(this).val();
        });
        localStorage.setItem('filtersInputs', JSON.stringify(inputsData));
    }

    // Restore values of .input fields from localStorage
    function restoreInputs() {
        let saved = localStorage.getItem('filtersInputs');
        if (saved) {
            let inputsData = JSON.parse(saved);
            $('.filters-num-body .input').each(function (index) {
                if (inputsData[index] !== undefined) {
                    $(this).val(inputsData[index]);
                }
            });
        }
    }

 


 

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

            // Витягуємо атрибути з поточного ряду
            let roomType = $row.data('room-type');
            let filledImage = $row.data('filled-image');

            let $newRow = $(`
                <div class="filters-num-row type2"   
                    data-room-type="${roomType}"
                    data-filled-image="${filledImage}">
                    <div class="filter-num-cell"></div>
                    <div class="filter-num-cell"></div>
                    <div class="filter-num-cell">
                        <input type="number" value="" min="1" max="999" class="input" required>
                        <span>м²</span>
                    </div>
                </div>
            `);

            $row.after($newRow);
        }

        $(document).on("input", '.filters-num-row input[type="number"]', function () {
            _functions.updateRoomsMap();
            _functions.updateRoomsFormData();
        });
        _functions.validateRooms();
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

        
        _functions.validateRooms();
    });
    $(document).on("input", '.filters-num-row input[type="number"]', function () {
        _functions.updateRoomsMap();
        _functions.updateRoomsFormData();
    });


      _functions.validateRooms = function() {
        let valid = true;
        let total = 0;
        const $inputs = $('.filters-num-body .input');

        if ($inputs.length) {
        $(".filters-num-row").each(function () {
            const $row = $(this);
            const $inputs = $row.find('input[type="number"].input');

            let rowValid = true;
            let rowTotal = 0;

            $inputs.each(function () {
                const val = parseFloat($(this).val());

                if (!isNaN(val) && val > 0) {
                    rowTotal += val;
                } else {
                    rowValid = false;
                }
            });

            if (!rowValid) valid = false;
            else total += rowTotal;
        });

        // Загальна площа
        $(".total-square").text(total); 
            // Кнопка далі
            const $next = $(".filters-button .btn");
            // if (valid && total > 0) {
            //     $next.removeAttr("disabled").removeClass("disabled");
            // } else {
            //     $next.attr("disabled", "disabled").addClass("disabled");
            // } 
        }
    }

    // $(document).on("input", '.filters-num-row input[type="number"]', function () {
    //     _functions.validateRooms();
    // });

  

    // $(document).on('click', '.filter-opt__top', function () {
    //     let $filter = $(this).closest('.filter-opt');
    //     let optMarker = $filter.data('marker');
    //     $(this).closest('.filter-opt').toggleClass('active');
    //     $filter.siblings().removeClass('active');
    //     // Зупиняємо поточні анімації, щоб не було черги
    //     $filter.find('.filter-opt__inner').stop(true, true).slideToggle();
    //     $filter.siblings().find('.filter-opt__inner').stop(true, true).slideUp();

    //     // Маркери
    //     $('.style-map .marker').each(function () {
    //         let marker = $(this).data('marker');

    //         if (marker == optMarker) {
    //             $(this).toggleClass('active').siblings('.marker').removeClass('active');
    //         }
    //     });
    // });

    $(document).on('click', '.filter-opt__top', function () {

        let $filter = $(this).closest('.filter-opt');
        let optMarker = $filter.data('marker');

        $filter.toggleClass('active');
        $filter.siblings().removeClass('active');

        $filter.find('.filter-opt__inner').stop(true, true).slideToggle();
        $filter.siblings().find('.filter-opt__inner').stop(true, true).slideUp();

        let $activeMarker = null;

        $('.style-map .marker').each(function () {
            let marker = $(this).data('marker');

            if (marker === optMarker) {
                $(this)
                    .addClass('active')
                    .siblings('.marker')
                    .removeClass('active');

                $activeMarker = $(this);
            }
        });

        // 🚀 ПІД'ЇЖДЖАЄМО ДО МАРКЕРА
        if ($activeMarker) {
            // _functions.centerToMarker($activeMarker);
            _functions.resetDrag()
        }
    });

// _functions.centerToMarker = function ($marker) {
//     if (!$marker || !$marker.length) return;
// console.log('$marker',$marker)
//     // знаходимо активний крок
//     const $activeStep = $('.js-step.active');
//     if (!$activeStep.length) return;

//     // draggable та контейнер саме в активному кроці
//     const $draggable = $activeStep.find('[data-draggable]');
//     const $imageWrap = $draggable.find('.main-image');
//     const $container = $draggable.parent(); // або можна $activeStep

//     if (!$imageWrap.length) return;

//     const containerW = $container.outerWidth();
//     const containerH = $container.outerHeight();

//     // Позиція маркера відносно draggable
//     const markerOffset = $marker.position();
//     const markerX = markerOffset.left * currentScale;
//     const markerY = markerOffset.top * currentScale;

//     // Центр контейнера
//     const centerX = containerW / 2;
//     const centerY = containerH / 2;

//     // Новий translate, щоб маркер був в центрі
//     lastX = centerX - markerX;
//     lastY = centerY - markerY;

//     $draggable.css({
//         transition: 'transform 0.35s ease',
//         transform: `translate(${lastX}px, ${lastY}px) scale(${currentScale})`
//     });
// };

        // Add active class to marker
    $(document).on('click', '.marker', function (e) {
        e.preventDefault();
        e.stopPropagation();
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

  
    $(document).on('click', '[data-position]', function () {
        _functions.resetDrag();
    });

    $(document).on('click', '[data-full]', function () {
        _functions.setValue($(".js_zoom input"), 100);
        _functions.resetDrag();
        $('[data-draggable]').css('transform', `translate(${lastX}px, ${lastY}px) scale(${1})`);
    });    

let startDist = 0;
let startScale = 1;

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

$(document).on('touchstart', '[data-draggable]', function (e) {
    if (e.touches.length === 2) {
        startDist = getDistance(e.touches);
        startScale = currentScale;
    }
});

$(document).on('touchmove', '[data-draggable]', function (e) {
    if (e.touches.length === 2) {
        e.preventDefault();

        const newDist = getDistance(e.touches);
        let scale = startScale * (newDist / startDist);

        // обмеження
        scale = Math.max(0.5, Math.min(scale, 3));

        currentScale = scale;

        $(this).css(
            'transform',
            `translate(${lastX}px, ${lastY}px) scale(${currentScale})`
        );
    }
});


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
    // $(document).on('click', '.filters-img', function () {

    //     $('.filters-img').removeClass('active');
    //     $(this).addClass('active');

    //     const targetId = $(this).data('image-target');
    //     const imageSrc = $(this).data('image');
    //     const styleId  = $(this).data('style-id'); // <---- Додано

    //     const $targetImg = $(`[data-image-id="${targetId}"]`);
    //     if (!$targetImg.length) return;

    //     $targetImg.addClass('no-transition');
    //     $targetImg.attr('src', imageSrc);

    //     setTimeout(() => {
    //         $targetImg.removeClass('no-transition');
    //     }, 50);

    //     // --------------------------
    //     // 🔥 Перемикання маркерів
    //     // --------------------------
    //     $('[data-markers] .list').removeClass('active visible');

    //     const $activeMarkers = $(`[data-markers-id="${styleId}"]`);
    //     if ($activeMarkers.length) {
    //         $activeMarkers.addClass('active visible');
    //     }

    //     // -------------------------------
    //     // Оновлює hidden input
    //     const $activeTab = $('._tab-item.is-active');
    //     const tabIndex = $activeTab.index() + 1;
    //     const room = $activeTab.closest('.filters-wrap') ;
    //     const roomType = $activeTab.closest('.filters-wrap').data('options-type');

    //     const inputName = `${roomType}-image-${tabIndex}`;
    //     const $formInput = $(`#main-form [name="${inputName}"]`);
    //     console.log(' $room', room)
    //     console.log(' $roomType', roomType)
    //     console.log(' $activeTab', $activeTab)
    //     console.log('inputName',inputName)
    //     console.log('$formInput',$formInput)
       
    //     if ($formInput.length) {
    //         $formInput.attr('data-value',imageSrc);
    //     }

    //     // Reset zoom + drag
    //     _functions.setValue($(".js_zoom input"), 100);
    //     _functions.resetDrag();
    // });

    $(document).on('click', '.filters-img', function () {
        const $activeStep = $(this).closest('.js-step');
        $activeStep.find('.filters-img').removeClass('active');
        $(this).addClass('active');

        const targetId = $(this).data('image-target');
        const imageSrc = $(this).data('image');
        const imageValue = $(this).data('value');
        const styleId  = $(this).data('style-id');

        const $targetImg = $(`[data-image-id="${targetId}"]`);
        if (!$targetImg.length) return;

        $targetImg.addClass('no-transition');
        $targetImg.attr('src', imageSrc);

        setTimeout(() => {
            $targetImg.removeClass('no-transition');
        }, 50);

        // 🔥 Перемикання маркерів
        $('[data-markers] .list').removeClass('active visible');
        const $activeMarkers = $(`[data-markers-id="${styleId}"]`);
        if ($activeMarkers.length) {
            $activeMarkers.addClass('active visible');
        }

        // -------------------------------
        // Оновлює hidden input
          // <-- активний крок
        const $activeTab = $activeStep.find('._tab.active'); // таб всередині активного кроку
        const tabIndex = $activeTab.index() + 1;

        const $wrap = $activeTab.closest('.filters-wrap'); // обгортка конкретної кімнати
        const type = $wrap.data('options-type');
        const roomType =  normalizeKey(type);  
     
        const inputName = `${roomType}-image-${tabIndex}`;
        const $formInput = $(`#main-form [name="${inputName}"]`);

        console.log('$wrap', $wrap);
        console.log('type', type);
        console.log('roomType', roomType);
        console.log('$activeTab', $activeTab);
        console.log('inputName', inputName);
        console.log('$formInput', $formInput);

        if ($formInput.length) {
            $formInput.val(styleId);
            $formInput.attr('data-value', imageSrc);
        }
        $(`[name="style_id"]`).val(styleId); // <---- Додано
        // Reset zoom + drag
        _functions.setValue($(".js_zoom input"), 100);
        _functions.resetDrag();

        // -------------------------------
        // Парсимо data-images
        let imagesData = $(this).attr('data-images');

        let parsedImages = null;

        if (imagesData) {
            try {
                // HTML entities → нормальний JSON
                const decoded = $('<textarea/>').html(imagesData).text();
                parsedImages = JSON.parse(decoded);
            } catch (e) {
                console.error('❌ Не вдалося розпарсити data-images', e);
            }
        }

        console.log('parsedImages', parsedImages);
        _functions.syncInputsWithParsedImages($activeStep, parsedImages);

    });

_functions.syncInputsWithParsedImages = function ($step, parsedImages) {
    if (!parsedImages) return;

    $step.find('input[data-image]').each(function () {
        const $input = $(this);

        const sectionKey = $input.data('image'); // ceiling, wall...
        const inputValue = $input.val();

        if (!sectionKey || !parsedImages[sectionKey]) return;

        const section = parsedImages[sectionKey];
        if (!Array.isArray(section.options)) return;

        const matchedOption = section.options.find(
            opt => String(opt.value) === String(inputValue)
        );

        if (!matchedOption || !matchedOption.image_url) return;

        // 🔥 1. оновлюємо data-url
        $input.attr('data-url', matchedOption.image_url);

        // 🔥 2. оновлюємо відповідну картинку
        _functions.syncImagesByDataId(
            $step,
            sectionKey,
            matchedOption.image_url
        );
    });
};


    _functions.syncImagesByDataId = function ($step, sectionKey, imageSrc) {
        if (!sectionKey || !imageSrc) return;

        const $img = $step.find(`.main-image img[data-image-id="${sectionKey}"]`);
        if (!$img.length) return;

        // ❌ не оновлюємо пусті або #
        if (!imageSrc || imageSrc === '#') return;

        $img
            .addClass('no-transition')
            .attr('src', imageSrc);

        setTimeout(() => {
            $img.removeClass('no-transition');
        }, 50);
    };
    // $(document).ready(function(){

    //     // тип приміщення (на сторінці тільки один)
    //     const roomType = $('.filters-title').data('room-type'); // "кухня"
    //     const $tabs = $('._tab-item');
        
    //     const $form = $('#main-form');

    //     // створює hidden input для кожного таба
    //     $tabs.each(function(index){
    //         const tabIndex = index + 1; // щоб рахувало з 1
    //         const inputName = `${roomType}-image-${tabIndex}`;
 
    //         if( !$form.find(`[name="${inputName}"]`).length ){
    //             const $input = $('<input>', {
    //                 type: 'hidden',
    //                 name: inputName,
    //                 value: '' // спочатку пусте
    //             });
    //             $form.append($input);
    //         }
    //     });

    //     // ініціалізує картинку на активному табі
    //     const activeIndex = $tabs.filter('.is-active').index() + 1;
    //     const activeInput = $form.find(`[name="${roomType}-image-${activeIndex}"]`);
        
    //     // якщо картинка є в data-image-id
    //     const $mainImg = $('.style-map__image').find('img[data-image-id]')
    //     if($mainImg.length){
    //         activeInput.val($mainImg.attr('src'))
    //     }

    // });

//     $(document).on('click', '._tab-item', function(){
//         const $this = $(this);
//         const index = $this.index() + 1;
//         const roomType = $this.closest('.filters-wrap').data('options-type');
//         const $form = $('#main-form');

//         // знімаємо активні класи
//         $this.siblings().removeClass('is-active');
//         $this.addClass('is-active');

//         // показуємо відповідний _tab
//         const $tabsContent = $('.filters ._tab');
//         $tabsContent.removeClass('active').eq(index-1).addClass('active');

//         // оновлюємо картинку
//         const $mainImg = $('.style-map__image').find('img[data-image-id].main');
//         const mainDefaultSrc = $mainImg.attr('data-default-src');
//         const inputName = `${roomType}-image-${index}`;
//         const $input = $form.find(`[name="${inputName}"]`);
// console.log('$inputName ',inputName)
// console.log('$input ',$input)
//         let newSrc;
//         if($input.val()){ // якщо раніше вибрана картинка
//             newSrc = $input.data('value');
//         } else {
//             // скидає на дефолт
//             newSrc = mainDefaultSrc;
//             $input.val(mainDefaultSrc);
//         }

//         $mainImg.attr('src', newSrc);

//         // === Додаємо активний клас на filters-img для поточного таба
//         $('.filters-img').removeClass('active');
//         $(`.filters-img[data-image="${newSrc}"]`).addClass('active');

//         _functions.setValue($(".js_zoom input"), 100);
//         // $('[data-draggable]').css('transform', `translate(0px, 0px) scale(1)`);
//          _functions.resetDrag();
//          _functions.resetStyleMapImages();
     
//     });

    $(document).on('click', '._tab-item', function () {
        const $this = $(this);
 
        const $step = $this.closest('.js-step.active');
        if (!$step.length) return;

        const $wrap = $this.closest('.filters-wrap');
        const index = $this.index() + 1;
        const roomType = $wrap.data('options-type');
        const $form = $('#main-form');

        /* =========================
        TAB ACTIVE
        ========================= */
        $this
            .addClass('active')
            .siblings('._tab-item')
            .removeClass('active');

        /* =========================
        TAB CONTENT (ЛОКАЛЬНО)
        ========================= */
        const $tabsContent = $wrap.find('.filters > ._tab');

        $tabsContent
            .removeClass('active')
            .eq(index - 1)
            .addClass('active');

        /* =========================
        MAIN IMAGE (ЛОКАЛЬНО)
        ========================= */
        const $mainImg = $step
            .find('.style-map__image img.main[data-image-id]');

        if (!$mainImg.length) return;

        const mainDefaultSrc = $mainImg.data('default-src');

        const inputName = `${roomType}-image-${index}`;
        const $input = $form.find(`[name="${inputName}"]`);

        let newSrc;

        if ($input.length  ) {
             console.log('asdasd',$input.length && $input.data('value'))
             newSrc = $input.data('value');
             console.log('$input.data',$input.data('value'))
        } else {
            newSrc = mainDefaultSrc;
            if ($input.length) {
                $input.data('value', mainDefaultSrc);
            }
        }
        console.log($input.length && $input.data('value'))
        console.log(' $input', $input)
        console.log('inputName',inputName)
        console.log('newSrc',newSrc)
        $mainImg.attr('src', newSrc);

        /* =========================
        ACTIVE FILTERS IMG (ЛОКАЛЬНО)
        ========================= */
        $step.find('.filters-img').removeClass('active');
        $step.find(`.filters-img[data-image="${newSrc}"]`).addClass('active');

        /* =========================
        RESET ZOOM + DRAG (ЛОКАЛЬНО)
        ========================= */
        _functions.setValue($step.find('.js_zoom input'), 100);
        _functions.resetDrag();
        _functions.resetStyleMapImages();
    });



    $(document).ready(function() {
        _functions.scrollHeaderToActive()
        // 🖼 ОНОВЛЕННЯ КАРТИНОК ЗА RADIO / CHECKBOX
        // $(document).on("change", 'input[data-image]', function () {
        //     const type = $(this).data("image");    // наприклад "floor"
        //     const url = $(this).data("url");       // шлях до картинки

        //     // Знаходимо відповідний <img data-image-id="floor">
        //     const $img = $(`.main-image img[data-image-id="${type}"]`);

        //     if ($img.length) {
        //         $img.attr("src", url);
        //     }
        // });

        // $(document).on('change', 'input[data-image]', function () {
        //     console.log($(this))
        //     console.log($(this).checked)
        //     console.log(this.checked)
        //     if (!this.checked) return;

        //     const imageType = $(this).data('image');
        //     const imageUrl  = $(this).data('url');
        //     if (!imageType || !imageUrl) return;

        //     // 🔹 Вибираємо активний крок
        //     const $activeStep = $(this).closest('.js-step');
        //     if (!$activeStep.length || !$activeStep.hasClass('active')) return;

        //     const $wrap = $activeStep.find('.filters-wrap');
        //     const type = $wrap.data('options-type');
        //     const index = $wrap.find('._tab-item.is-active').index();

        //     const ctx = { type, index };
        //     console.log('imageType', imageType);
        //     console.log('ctx', ctx);
        //     console.log('imageUrl', imageUrl);

        //     if (!ctx) return;

        //     // -------------------
        //     // UI
        //     // -------------------
        //     const $img = $activeStep.find(`.main-image img[data-image-id="${imageType}"]`);
        //     if ($img.length) {
        //         $img.attr('src', imageUrl);
        //     }
        //     console.log('$img', $img);

        //     // -------------------
        //     // STORE
        //     // -------------------
        //     const rooms = JSON.parse(localStorage.getItem('rooms_data') || '{}');

        //     rooms[ctx.type] = rooms[ctx.type] || [];
        //     rooms[ctx.type][ctx.index] = rooms[ctx.type][ctx.index] || {};
        //     rooms[ctx.type][ctx.index].images = rooms[ctx.type][ctx.index].images || {};
        //     rooms[ctx.type][ctx.index].images[imageType] = imageUrl;

        //     localStorage.setItem('rooms_data', JSON.stringify(rooms));
        // });
        $(document).on('change', 'input[data-image]', function () {
            _functions.applyImageByInput($(this));
        });
 
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
                            const $input = $(this);
                            if ($input.is('input[type="number"]')) {
                                $input.val(0); // 👈 важливо: number → 0
                            } 
                            if($(this).is(':checkbox') || $(this).is(':radio')) {
                                // знімаємо чек/радіо
                                $(this).prop('checked', false);

                                // очищаємо відповідну картинку в .main-image
                                const imgType = $(this).data('image'); // наприклад "floor"
                                if (imgType) {
                                    const $img = $(`.main-image img[data-image-id="${imgType}"]`);
                                    const defaultSrc = $img.data("default-src") || "";

                                    $img.attr("src", defaultSrc);
                                }
                            }
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

            console.log('formData',formData)
            // Оновлюємо small для кожного батьківського filter-opt
            const $opt = $(this).closest('.filter-opt');
            updateFilterOptTitle($opt);

            _functions.updateRoomsFormData();
        });

        // Ініціалізація для pre-checked значень
        $('.filter-opt').each(function() {
            updateFilterOptTitle($(this));
        });

        _functions.autocomplete();
    });


    _functions.applyImageByInput = function($input) {
        console.log($input)
        console.log($input.checked) 
        if (!$input.prop('checked')) return;

        const imageType = $input.data('image');
        const imageUrl  = $input.attr('data-url');
        if (!imageType || !imageUrl) return;

        // 🔹 Вибираємо активний крок
        const $activeStep = $input.closest('.js-step');
        if (!$activeStep.length || !$activeStep.hasClass('active')) return;

        const $wrap = $activeStep.find('.filters-wrap');
        const type = $wrap.data('options-type');
        const index = $wrap.find('._tab-item.is-active').index();

        const ctx = { type, index };
        console.log('imageType', imageType);
        console.log('ctx', ctx);
        console.log('imageUrl', imageUrl);

        if (!ctx) return;

        // -------------------
        // UI
        // -------------------
        const $img = $activeStep.find(`.main-image img[data-image-id="${imageType}"]`);
        if ($img.length) {
            $img.attr('src', imageUrl);
        }
        console.log('$img', $img);

        // -------------------
        // STORE
        // -------------------
        const rooms = JSON.parse(localStorage.getItem('rooms_data') || '{}');

        rooms[ctx.type] = rooms[ctx.type] || [];
        rooms[ctx.type][ctx.index] = rooms[ctx.type][ctx.index] || {};
        rooms[ctx.type][ctx.index].images = rooms[ctx.type][ctx.index].images || {};
        rooms[ctx.type][ctx.index].images[imageType] = imageUrl;

        localStorage.setItem('rooms_data', JSON.stringify(rooms));
    }


    _functions.updateRoomsMap = function () {
        let totalGlobalSquare = 0;

        // 1️⃣ Групуємо сумарні площі по roomType
        let totals = {}; // { kitchen: 14, room: 22, corridor: 5 }

        $(".filters-num-row").each(function () {
            const $row = $(this);
            const roomType = $row.data("room-type");
            if (!roomType) return;

            let rowSquare = 0;

            $row.find('input[type="number"]').each(function () {
                const val = parseFloat($(this).val());
                if (!isNaN(val)) rowSquare += val;
            });

            if (!totals[roomType]) totals[roomType] = 0;
            totals[roomType] += rowSquare;

            totalGlobalSquare += rowSquare;
        });

        // 2️⃣ Оновлюємо map-image та tooltip лише 1 раз для кожного типу
        for (let roomType in totals) {
            const totalRoomSquare = totals[roomType];

            // Шукаємо картинку roomType
            const $mapImg = $(`img[data-image-id="${roomType}"]`);

            // Знаходимо перший ряд з цим типом — він містить data-filled-image
            const $firstRow = $(`.filters-num-row[data-room-type="${roomType}"]`).first();
            const imgSrc = $firstRow.data("filled-image");

            // Якщо площа > 0 → ставимо картинку
            
            // Тултіп — шукаємо по data-tooltip
            let $tooltip = $(`.rooms-map .tooltip[data-tooltip="${roomType}"]`);
            console.log('$mapImg',$mapImg)
            if (totalRoomSquare > 0) {
                $mapImg.attr("src", imgSrc);
                $tooltip.addClass('active');
            } else {
                $mapImg.attr("src", "#");
                $tooltip.removeClass('active');
            }
            if ($tooltip.length) {
                $
                $tooltip.find("b").text(totalRoomSquare);
            }
        }

        // 3️⃣ Сума всіх площ
        $(".total-square").text(totalGlobalSquare);

        _functions.updateRoomsFormData();
    }
 
 
 
 
 
    // Введення площі
    $(document).on("input", '.filters-num-row input[type="number"]', function () {
        _functions.updateRoomsMap();
        _functions.updateRoomsFormData();
    });

    $(document).on("click", ".filters-num-row .incr, .filters-num-row .decr", function () {
        setTimeout(() => {
            _functions.updateRoomsMap();
            _functions.updateRoomsFormData();
        }, 50);
    });

  
    function normalizeKey(str = '') {
        return str
            .toString()
            .toLowerCase()
            .replace(/\u0441/g, 'c') // кирилична "с"
            .replace(/\u0456/g, 'i') // кирилична "і"
            .replace(/\u0430/g, 'a') // "а"
            .replace(/\u0435/g, 'e') // "е"
            .replace(/\u043e/g, 'o') // "о"
            .trim();
    }
 

    // _functions.buildRoomTabs = function () {
    //     const roomsData = JSON.parse(localStorage.getItem('rooms_data') || '{}');
    
    //     $('.filters-wrap').each(function () {
    //         const $wrap = $(this);
    //         const rawType = $wrap.data('options-type');
    //         const type = normalizeKey(rawType);
    //         const rooms = roomsData[type];
    //         if (!rooms || !rooms.length) return;

    //         const $tabsList = $wrap.find('.sub-links ul');
    //         const $tabsContainer = $wrap.find('.filters');

    //         $tabsList.empty();
    //         $tabsContainer.empty();

    //         rooms.forEach((room, index) => {
    //             const $tabItem = $(`<li class="_tab-item">${index+1}</li>`);
    //             if (index === 0) $tabItem.addClass('is-active');
    //             if(rooms.length > 1){
    //                 $tabsList.append($tabItem);
    //             }

    //             const $tab = $(`
    //                 <div class="_tab">
    //                     ${$('#options-template').html()}
    //                 </div>
    //             `);
    //             if (index === 0) $tab.addClass('is-active');

    //             _functions.namespaceTabOptions($tab, type, index);
    //             $tabsContainer.append($tab);
    //         });
    //     });
    // };

    // _functions.buildRoomTabs = function () {
    //     const roomsData = JSON.parse(localStorage.getItem('rooms_data') || '{}');
    //     const $form = $('#main-form');

    //     $('.filters-wrap').each(function () {
    //         const $wrap = $(this);
    //         const rawType = $wrap.data('options-type');
    //         if (!rawType) return;

    //         const type = normalizeKey(rawType); // kitchen, bedroom ...
    //         const rooms = roomsData[type];
    //         if (!rooms || !rooms.length) return;

    //         const $tabsList = $wrap.find('.sub-links ul');
    //         const $tabsContainer = $wrap.find('.filters');

    //         $tabsList.empty();
    //         $tabsContainer.empty();

    //         rooms.forEach((room, index) => {
    //             const tabIndex = index + 1;

    //             /* =========================
    //             TAB BUTTON
    //             ========================= */
    //             const $tabItem = $(`<li class="_tab-item">${tabIndex}</li>`);
    //             if (index === 0) $tabItem.addClass('is-active');
    //             if (rooms.length > 1) {
    //                 $tabsList.append($tabItem);
    //             }

    //             /* =========================
    //             TAB CONTENT
    //             ========================= */
    //             const $tab = $(`
    //                 <div class="_tab">
    //                     ${$('#options-template').html()}
    //                 </div>
    //             `);
    //             if (index === 0) $tab.addClass('is-active');

    //             _functions.namespaceTabOptions($tab, type, index);
    //             $tabsContainer.append($tab);

    //             /* =========================
    //             🔹 HIDDEN INPUT FOR IMAGE
    //             ========================= */
    //             const inputName = `${type}-image-${tabIndex}`;

    //             if (!$form.find(`[name="${inputName}"]`).length) {
    //                 $('<input>', {
    //                     type: 'hidden',
    //                     name: inputName,
    //                     value: ''
    //                 }).appendTo($form);
    //             }
    //         });
    //     });
    // };

    _functions.buildRoomTabs = function () {
    const roomsData = JSON.parse(localStorage.getItem('rooms_data') || '{}');
    const $form = $('#main-form');

    $('.filters-wrap').each(function () {
        const $wrap = $(this);
        const rawType = $wrap.data('options-type');
        if (!rawType) return;

        const type = normalizeKey(rawType); // kitchen, bedroom ...
        const rooms = roomsData[type];
        if (!rooms || !rooms.length) return;

        const $tabsList = $wrap.find('.sub-links ul');
        const $tabsContainer = $wrap.find('.filters');

        $tabsList.empty();
        $tabsContainer.empty();

        // вибираємо відповідний шаблон
        const templateHtml = $(`script[data-template="${type}"]`).html() || '';

        rooms.forEach((room, index) => {
            const tabIndex = index + 1;

            /* =========================
            TAB BUTTON
            ========================= */
            const $tabItem = $(`<li class="_tab-item">${tabIndex}</li>`);
            if (index === 0) $tabItem.addClass('is-active');
            if (rooms.length > 1) {
                $tabsList.append($tabItem);
            }

            /* =========================
            TAB CONTENT
            ========================= */
            const $tab = $(`<div class="_tab">${templateHtml}</div>`);
            if (index === 0) $tab.addClass('active');

            _functions.namespaceTabOptions($tab, type, index);
            $tabsContainer.append($tab);

            /* =========================
            🔹 HIDDEN INPUT FOR IMAGE
            ========================= */
            const inputName = `${type}-image-${tabIndex}`;
            if (!$form.find(`[name="${inputName}"]`).length) {
                $('<input>', {
                    type: 'hidden',
                    name: inputName,
                    value: ''
                }).appendTo($form);
            }
        });
    });
};

 
    _functions.namespaceTabOptions = function($tab, type, index) {
        const prefix = `${type}[${index}]`;
    
        $tab.find('input[name]').each(function () {
            const name = $(this).attr('name');
            $(this).attr('name', `${prefix}.${name}`);
        });

        // marker → marker + index
        $tab.find('[data-marker]').each(function () {
            const marker = $(this).data('marker');
            $(this).attr('data-marker', `${marker}-${index}`);
        });
    }

  
    _functions.buildRoomsDataUnified = function () {
        const stored = JSON.parse(localStorage.getItem('rooms_data') || '{}');
        const result = {};

        // 1️⃣ Площі + кількість кімнат (filters-num-row)
        const processedTypes = new Set();

        $('.filters-num-row').each(function () {
            const $row = $(this);
            const type = normalizeKey($row.data('room-type'));
            if (!type || processedTypes.has(type)) return;

            processedTypes.add(type);

            const $rows = $(`.filters-num-row[data-room-type="${type}"]`);
            const squares = [];

            $rows.each(function () {
                $(this).find('input[type="number"]').each(function () {
                    const val = parseFloat($(this).val());
                    squares.push(!isNaN(val) ? val : null);
                });
            });

            const stepperVal = parseInt(
                $rows.first().find('.stepper input').val(),
                10
            ) || 0;

            const count = Math.max(stepperVal, squares.length);
            if (!count) return;

            result[type] = [];

            for (let i = 0; i < count; i++) {
                const prevOptions = stored[type]?.[i]?.options || {};

                result[type].push({
                    square: squares[i] ?? null,
                    options: prevOptions // 🔥 зберігаємо опції
                });
            }
        });

        // 2️⃣ Опції кімнат (filters-wrap / _tab)
        $('.filters-wrap').each(function () {
            const $wrap = $(this);
            const type = normalizeKey($wrap.data('options-type'));
            if (!result[type]) return;

            $wrap.find('._tab').each(function (index) {
                if (!result[type][index]) return;

                result[type][index].options =
                    _functions.collectRoomOptions($(this));
            });
        });

        return result;
    };



    // ====== Збереження даних у форму та localStorage ======
    _functions.updateRoomsFormData = function () { 
        const propertyType = $('input[name="property_type"]:checked').val() || null;
        const totalSquare = localStorage.getItem('totalSquare');

        const newData = _functions.buildRoomsDataUnified();
        localStorage.setItem('rooms_data', JSON.stringify(newData));
        $('#rooms_data').val(JSON.stringify(newData));
        
        const result = _functions.calculateTotalPrice();

        const total = Math.floor(result?.total) + (propertyType === 'new' ? 700 *  parseFloat(totalSquare) : 0);
        $('input[name="total_price"]').val(total || 0)
        $(".total-cost").text(total?.toLocaleString('uk-UA') || 0); 
       
        // console.log('totalSquare',totalSquare);
        // console.log('propertyType',propertyType);
        // console.log('propasdaertyType',propertyType === 'new' ? 700 *  parseFloat(totalSquare) : 0);
        console.log('rooms_data FINAL:', newData);
        console.table(result.breakdown);
    };

    // ====== Збір даних з опцій однієї кімнати ======
    _functions.collectRoomOptions = function ($tab) {
        const options = {};
        $tab.find('input, select, textarea').each(function () {
            const $el = $(this);
            const name = $el.attr('name');
            const price = $el.data('price'); 
            if (!name) return;
            //  console.log('el', $el)
            //  console.log('price',price)
            // беремо "чисту" назву (floor, ceiling...)
            const cleanName = name.split('.').pop();

            if ($el.is(':radio')) {
                if ($el.is(':checked')) options[cleanName] = {value:$el.val(), price:price}  ;
            } else if ($el.is(':checkbox')) {
                options[cleanName] = {value:$el.is(':checked'), price:price}  ;
            } else {
                const val = $el.val();
                if (val !== '' && val !== null) options[cleanName] = {value:val, price:price};
            }
        });

        return options;
    };

 

    _functions.restoreRoomOptions = function () {
        const roomsData = JSON.parse(localStorage.getItem('rooms_data') || '{}');

        $('.filters-wrap').each(function () {
            const $wrap = $(this);
            const type = normalizeKey($wrap.data('options-type'));
            const rooms = roomsData[type];
            if (!rooms) return;

            rooms.forEach((room, index) => {
                const options = room.options || {};
                const $tab = $wrap.find('._tab').eq(index);
                if (!$tab.length) return;

                Object.entries(options).forEach(([key, option]) => {
                    const value = option?.value;
                    if (value === undefined || value === null) return;

                    const $inputs = $tab.find(`[name$=".${key}"]`);

                    $inputs.each(function () {
                        const $el = $(this);

                        // RADIO
                        if ($el.is(':radio')) {
                            if ($el.val() == value) {
                                $el.prop('checked', true).trigger('change');
                            }
                        }

                        // CHECKBOX
                        else if ($el.is(':checkbox')) {
                            $el.prop('checked', !!value).trigger('change');
                        }

                        // NUMBER / TEXT
                        else {
                            $el.val(value).trigger('input');
                        }
                    });
                });
                const images = room.images || {};
                Object.entries(images).forEach(([imgKey, imgSrc]) => {
                    const $img = $(`.main-image img[data-image-id="${imgKey}"]`);
                    if ($img.length) {
                        $img.attr('src', imgSrc);
                    }
                });
            });
        });

    };



    $(document).on('click', '.js-next', function (e) {
        e.preventDefault();

        const $currentStep = $('.js-step.active');
        const $nextStep = $currentStep.next('.js-step');

        if (!$nextStep.length) return;

        // 🔹 1–2 крок — звичайна форма
        if ($currentStep.hasClass('js-step-form')) {
            if (!_functions.validateStep($currentStep)) {
                return;
            }
        }

        // 🔹 крок з опціями кімнат
        if ($currentStep.hasClass('js-step-rooms')) {
            if (!_functions.validateRoomOptionsStep($currentStep)) {
                return;
            }
        }

        _functions.resetDrag();
        _functions.setValue($(".js_zoom input"), 100);

        // 👉 якщо все ОК
        $currentStep.removeClass('active');
        $nextStep.addClass('active');
        _functions.syncHeaderWithStep();
        _functions.resetStyleMapImages();
    });


    $(document).on('click', '.js-back', function (e) {
        e.preventDefault();

        let $currentStep = $('.js-step.active');
        let $prevStep = $currentStep.prev('.js-step');

        // ❗ якщо це step-1 — не даємо йти назад
        if (!$prevStep.length) return;
        _functions.resetDrag();
        _functions.setValue($(".js_zoom input"), 100);
        $currentStep.removeClass('active');
        $prevStep.addClass('active');
        _functions.syncHeaderWithStep();
        _functions.resetStyleMapImages();
        // scrollToTop();
    });

    _functions.syncHeaderWithStep = function () {
        const stepIndex = $('.js-step').index($('.js-step.active'));

        $('.h-links li').each(function (index) {
            const $li = $(this);

            $li.removeClass('current filled');

            // поточний
            if (index === stepIndex) {
                $li.addClass('current');
            }

            // всі попередні — filled
            if (index < stepIndex) {
                $li.addClass('filled');
            }
        });

        _functions.buildRoomTabs();
        _functions.restoreRoomOptions();

        /* =========================
        📱 SCROLL TO TOP (MOBILE)
        ========================= */
        if (window.innerWidth < 991) {
            // невелика затримка, щоб DOM оновився
            setTimeout(() => {
                $('html, body').animate(
                    { scrollTop: 0 },
                    0
                );
                _functions.scrollHeaderToActive();
            }, 0);
        }
    };


    _functions.isElementInViewX = function ($el, $container) {
        const elLeft   = $el.position().left;
        const elRight  = elLeft + $el.outerWidth();

        const viewLeft  = $container.scrollLeft();
        const viewRight = viewLeft + $container.innerWidth();

        return elLeft >= viewLeft && elRight <= viewRight;
    };

    _functions.scrollHeaderToActive = function () {
        const $nav = $('.h-menu');
        const $list = $nav.find('ul');
        const $active = $nav.find('li.current');

        if (!$active.length) return;

        // якщо вже видно — нічого не робимо
        if (_functions.isElementInViewX($active, $nav)) return;

        const activeLeft = $active.position().left;
        const activeWidth = $active.outerWidth();
        const navWidth = $nav.innerWidth();

        // центруємо активний пункт
        const newScrollLeft =
            activeLeft - navWidth / 2 + activeWidth / 2;

        $nav.animate(
            { scrollLeft: newScrollLeft },
            300
        );
    };


    $(document).on('click', '.h-links li', function (e) {
        e.preventDefault();
        const $li = $(this);

        // ❌ якщо не filled — не даємо клікати
        if (!$li.hasClass('filled')) {
            return;
        }

        const targetIndex = $li.index();

        // перемикаємо steps
        $('.js-step').removeClass('active')
            .eq(targetIndex).addClass('active');

        _functions.syncHeaderWithStep();
    });
 

    if ($('#main-form').length) {
        window.addEventListener('beforeunload', function () {
            localStorage.removeItem('rooms_data');
        });
    }


    _functions.validateStep = function ($step) {
        let isValid = true;
        let messages = [];

        const $error = $step.find('.error-text.invalid');
        $error.text('').removeClass('active');

        // прибираємо старі підсвітки
        $step.find('.is-invalid').removeClass('is-invalid');

        // 👉 перевіряємо всі required
        $step.find('input[required], select[required], textarea[required]').each(function () {
        const $el = $(this);
            $el.removeClass('invalid'); 

            let val = $el.val();

            // для числових полів
            if ($el.is('input[type="number"]')) {
                val = parseFloat(val);
            }

            if (val === '' || val === 0 || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) {
                isValid = false;

                $el.addClass('invalid');
                $el.closest('.input-field').addClass('is-invalid');
            }
        }); 
            
        // ❌ показуємо помилку
        if (!isValid) {
            $error.html('Не всі поля заповнені').addClass('active');
        }
        // console.log('isValid',isValid)
        return isValid;
    };

    // _functions.validateRoomOptionsStep = function ($step) {
    //     let isValid = true;

    //     const $error = $step.find('.error-text.invalid');
    //     $error.text('').removeClass('active');

    //     // чистимо старі помилки
    //     $step.find('.filter-opt')
    //         .removeClass('invalid');
    //     if($step.find('.filter-opt').find('.filter-opt__title small').text() === 'не вибрано'){
    //         $step.find('.filter-opt')
    //         .find('.filter-opt__title small')
    //         .text('')
    //     }
    //     // 👉 перевіряємо лише required блоки
    //     $step.find('.filter-opt.required').each(function () {
    //         const $opt = $(this);

    //         // radio / checkbox всередині
    //         const hasChecked = $opt.find('input[type="radio"]:checked, input[type="checkbox"]:checked').length > 0;

    //         if (!hasChecked) {
    //             isValid = false;

    //             $opt.addClass('invalid');
    //             $opt.find('.filter-opt__title small').text('не вибрано');
    //         }
    //     });

    //     if (!isValid) {
    //         $error.text('Не всі поля заповнені').addClass('active');
    //     }

    //     return isValid;
    // };

    _functions.validateRoomOptionsStep = function ($step) {
        let isValid = true;
        let firstInvalidTabIndex = null;

        const $error = $step.find('.error-text.invalid');
        $error.text('').removeClass('active');

        /* =========================
        ОЧИСТКА СТАНІВ
        ========================= */
        $step.find('.filter-opt').removeClass('invalid');
        $step.find('.filter-opt__title small').each(function () {
            if ($(this).text().trim() === 'не вибрано') {
                $(this).text('');
            }
        });

        /* =========================
        ПЕРЕВІРКА КОЖНОЇ КІМНАТИ
        ========================= */
        $step.find('.filters-wrap').each(function () {
            const $wrap = $(this);

            $wrap.find('.filters > ._tab').each(function (tabIndex) {
                const $tab = $(this);
                let tabValid = true;

                $tab.find('.filter-opt.required').each(function () {
                    const $opt = $(this);

                    const hasChecked =
                        $opt.find('input[type="radio"]:checked, input[type="checkbox"]:checked').length > 0;

                    if (!hasChecked) {
                        tabValid = false;
                        isValid = false;

                        $opt.addClass('invalid');
                        $opt.find('.filter-opt__title small').text('не вибрано');
                    }
                });

                // 👉 запамʼятовуємо ПЕРШУ невалідну кімнату
                if (!tabValid && firstInvalidTabIndex === null) {
                    firstInvalidTabIndex = {
                        wrap: $wrap,
                        index: tabIndex
                    };
                }
            });
        });

        /* =========================
        ЯКЩО Є ПОМИЛКИ
        ========================= */
        if (!isValid) {
            $error.text('Не всі поля заповнені').addClass('active');

            // 🚀 ПЕРЕХІД НА ПЕРШУ НЕЗАПОВНЕНУ КІМНАТУ
            if (firstInvalidTabIndex) {
                const { wrap, index } = firstInvalidTabIndex;

                // tab buttons
                wrap.find('._tab-item')
                    .removeClass('is-active')
                    .eq(index)
                    .addClass('is-active');

                // tab content
                wrap.find('._tab')
                    .removeClass('active')
                    .eq(index)
                    .addClass('active');

                // optional: скрол до опцій
                const $target = wrap.find('._tab').eq(index);
                if ($target.length) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top - 100
                    }, 400);
                }
            }
        }

        return isValid;
    };


$(document).on(
    'input change',
    '.js-step input, .js-step select, .js-step textarea',
    function () {
        const $step = $(this).closest('.js-step');

        // форма (кроки 1–2)
        if ($step.hasClass('js-step-form') && $(this).hasClass('invalid')) {
            _functions.validateStep($step );
        }

        // крок з кімнатами
        if ($step.hasClass('js-step-rooms')  && $(this).closest('.filter-opt').hasClass('invalid')) {
            _functions.validateRoomOptionsStep($step );
        }
    }
);


    _functions.calculateTotalPrice = function () {
        const roomsData = JSON.parse(localStorage.getItem('rooms_data') || '{}');

        let total = 0;
        let breakdown = [];

        Object.entries(roomsData).forEach(([roomType, rooms]) => {
            rooms.forEach((room, roomIndex) => {
                const square = parseFloat(room.square) || 0;
                let roomTotal = 0;

                // 👉 базова ціна (якщо буде)
                // roomTotal += square * BASE_PRICE;

                Object.entries(room.options || {}).forEach(([optionKey, option]) => {
                    const calculator = _functions.optionCalculators[optionKey];
                    if (!calculator) return;

                    const price = calculator({
                        square,
                        value: option.value,
                        price: option.price,
                        roomType,
                        roomIndex,
                        room
                    });

                    roomTotal += price;
                });

                total += roomTotal;

                breakdown.push({
                    roomType,
                    roomIndex,
                    square,
                    roomTotal
                });
            });
        });

        return {
            total,
            breakdown
        };
    };

    _functions.optionCalculators = {

        /* ========= ПІДЛОГА ========= */

        floor_condition({ square, price }) {
            return square * (price || 0);
        },

        floor({ square, price }) {
            return square * (price || 0);
        },

        underfloor_heating({ value, price, room, square }) {
            // const square = room?.options?.warm_floor_square?.value;
         
            if(value === 'yes' && square){ 
                return 0.7 * price * square
            } else {
                return 0;
            }
        },

        warm_floor_square({ value, price }) {
            const warmSquare = parseFloat(value);
            if (!warmSquare || warmSquare <= 0) return 0;
            return warmSquare * (price || 0);
        },


        /* ========= СТЕЛЯ ========= */

        ceiling({ square, price }) {
            return square * (price || 0);
        },


        /* ========= СТІНИ ========= */

        wall({ square, price }) {
            return 3*square * (price || 0);
        },


        /* ========= ПЛІНТУС ========= */

        baseboard({ square, price }) {
            return (square / 2) * (price || 0);
        },


        /* ========= ОСВІТЛЕННЯ ========= */

        lighting({ price,square, value }) { 
            if(value === 'spot'){
                return Math.floor(square * (price || 0) + ((square / 2)*350));

            }
            if(value === 'overhead_tracks'){
                return Math.floor(square * (price || 0) + ((square / 3) * 400));

            }
            if(value === 'embedded_tracks'){
                return Math.floor(square * (price || 0) + ((square / 3) * 2600));

            }
            if(value === 'luster'){
                return Math.floor(square * (price || 0) + 500);

            }     
                                              

            return Math.floor(square * (price || 0) ); 
        },


        /* ========= ДВЕРІ ========= */

        doors({ price }) { 
            return price || 0;
        }
    };



    _functions.getActiveRoomContext = function () {
        const $wrap = $('.filters-wrap:visible').first();
        if (!$wrap.length) return null;

        const type = normalizeKey($wrap.data('options-type'));
        const index = $wrap.find('._tab.is-active, ._tab.active').index();

        if (index < 0) return null;

        return { type, index };
    };

    _functions.resetStyleMapImages = function () {
        $('.main-image img').not('.main').each(function () {
            $(this).attr('src', '#');
        });
    };

    _functions.autocomplete = function ( ) {
        $('.js-autocomplete-input').each(function () {

            const $input = $(this);
            const $wrap = $input.closest('.autocomplete');
            const $list = $wrap.find('.js-autocomplete-list');
            const $items = $list.find('li');

            $input.on('input focus', function () {
                const value = $input.val().toLowerCase();
                let hasVisible = false;

                $items.each(function () {
                    const text = $(this).text().toLowerCase();
                    const match = text.includes(value);

                    $(this).toggle(match);
                    if (match) hasVisible = true;
                });

                $list.toggle(hasVisible && value.length);
            });

            $list.on('click', 'li', function () {
                $input.val($(this).text());
                $list.hide();
            });

            $(document).on('click', function (e) {
                if (!$(e.target).closest($wrap).length) {
                    $list.hide();
                }
            });

        });
    }


});