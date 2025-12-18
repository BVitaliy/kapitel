//*==============
//*  Inputs     =
//*==============
//*  Inputmask  =
//*==============
//*  Select     =
//*==============
//*  Calendar   =
//*==============

jQuery(function ($) {
  "use strict";
  $(document).on("click", "[disabled], .disabled", function (e) {
    e.preventDefault();
  });

  //*==============
  //*  Inputs     =
  //*==============
  $(document).on('focus', '.input-field .input, .input-button-wrap .input', function () {
    $(this).closest('.input-field').addClass('focus');
  });
  $(document).on('blur', '.input-field .input, .input-button-wrap .input', function () {
    $(this).closest('.input-field').removeClass('focus');
  });
  $(document).on('keyup', '.input-field .input', function () {
    if ($(this).val()) $(this).closest('.input-field').addClass('value');
    else $(this).closest('.input-field').removeClass('value');
  });


  // Invalid Input
  $(document).on('blur', '.input-field .input[required]', function () {
    if ($(this).val().trim()) {
      $(this).closest('.input-field').removeClass('invalid');
    } else {
      $(this).closest('.input-field').addClass('invalid');
    }
  });


  // Check if input has value or autofill
  $(document).ready(function () {
    $('.input-field .input').each(function () {
      let th = $(this);
      if (th.val()) {
        th.closest('.input-field').addClass('value');
      }
    });

    $('.input-field .input:-webkit-autofill').each(function () {
      let th = $(this);

      th.closest('.input-field').addClass('value');
    });
_functions.scrollHeaderToActive()
    
  });


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


  // Validate email
  _functions.validateEmail = function (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  $(document).on('keyup', 'input[type="email"]', function () {
    const email = $(this);

    if (!_functions.validateEmail(email.val())) {
      email.closest('.input-field').addClass('invalid-email');
    } else {
      email.closest('.input-field').removeClass('invalid-email');
    }

    if (email.val() == '') {
      email.closest('.input-field').removeClass('invalid-email');
    }
  });


  // Password Hide/Show
  $(document).on('click', '.password-control', function () {
    let thisInput = $(this).siblings('.input');

    if (thisInput.attr('type') == 'password') {
      $(this).addClass('view');
      thisInput.attr('type', 'text');
    } else {
      $(this).removeClass('view');
      thisInput.attr('type', 'password');
    }
    return false;
  });


  //*==============
  //*  Inputmask  =
  //*==============
  _functions.initMask = function () {
    if ($('.input[type="tel"]').length) {
      $('.input[type="tel"]').inputmask({
        mask: "+380 (99) 999 99 99",
        placeholder: "_",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        definitions: {
          '9': {
            validator: "[0-9]"
          }
        }
      });
    }

    // input tel with select code country
    $('.input.select-tel[type="tel"]').inputmask({
      "mask": "99 999 99 99",
      "placeholder": "_",
      showMaskOnHover: false,
      showMaskOnFocus: true,
      definitions: {
        '9': {
          validator: "[0-9]"
        }
      }
    });

    if ($('.input.code-mask').length) {
      $('.input.code-mask').inputmask({
        "mask": "9 9 9 9",
        "placeholder": "_",
        showMaskOnHover: false,
        showMaskOnFocus: false,
        definitions: {
          '9': {
            validator: "[0-9]"
          }
        }
      });
    }
  }

  _functions.initMask()


  //*==============
  //*  Select     =
  //*==============
  _functions.initSelect = function (parent) {
    $("" + parent + " .SelectBox").each(function () {
      if ($(".SelectBox[multiple]")) {
        $(this).SumoSelect({
          floatWidth: 0,
          nativeOnDevice: [],
          okCancelInMulti: true,
          csvDispCount: 1,
          captionFormat: '{0} Selected',
          locale: ['Ok', 'Cancel', 'All'],
          placeholder: ''
        });
      } else {
        $(this).SumoSelect({
          floatWidth: 0,
          nativeOnDevice: [],
          placeholder: ''
        });
      }


      $(this).on('sumo:opened', function () {
        $(this).closest('.input-field').addClass('focus');
      });

      $(this).on('sumo:closed', function () {
        $(this).closest('.input-field').removeClass('focus');
      });
    });
  }

  _functions.initSelect('html');



  $(document).ready(function () {
    if ($('select').val()) {
      $(this).closest('.input-field').addClass('value');
    } else {
      $(this).closest('.input-field').removeClass('value');
    }
  });

  $(document).on('change', 'select', function () {
    if ($(this).val()) {
      $(this).closest('.input-field').addClass('value');
    } else {
      $(this).closest('.input-field').removeClass('value');
    }
  });


  $(document).on("click", ".input-clear", function () {
    const calendarPick = $(this).closest(".input-field").find(".calendar")[0]._picker;
    if (calendarPick) {
      calendarPick.reset();
      $(this).closest(".input-field").removeClass("value")
      return
    }

    $(this).closest(".input-field").removeClass("value").find("input").val("").trigger("change");
    $(this).closest(".input-field").removeClass("value").find("select").val("").trigger("change");
  });



  // clear inputs
  _functions.clearAllInputs = function (wrapper) {
    $(wrapper).find('input[type="radio"], input[type="checkbox"]').prop("checked", false);
    $(wrapper).find('input[type="radio"][checked]').prop("checked", true).trigger("change");
    $(wrapper).find('input[type="checkbox"][checked]').prop("checked", true).trigger("change");

    // $(wrapper).find('input[type="radio"], input[type="checkbox"]').trigger("change");
    // $(wrapper).find('input[type="text"], input[type="number"]').val("");
    $(wrapper).find("select.SelectBox").each(function () {
      $(this)[0].sumo.unSelectAll();
      $(this)[0].sumo.disable();
    });

    $(wrapper).find(".range-input").each(function () {
      const range = $(this).data("ionRangeSlider");

      if (range.options.type == "double") {
        range.options.fromInput.val(range.options.min).trigger("change");
        range.options.toInput.val(range.options.max).trigger("change");
      } else {
        range.reset();
      }
    });

    $(wrapper).find(".input-field.value").removeClass("value");
  };

});