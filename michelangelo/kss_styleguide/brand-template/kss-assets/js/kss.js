(function () {
  var KssStateGenerator;

  KssStateGenerator = (function () {
    var pseudo_selectors;

    pseudo_selectors = ['hover', 'enabled', 'disabled', 'active', 'visited', 'focus', 'target', 'checked', 'empty', 'first-of-type', 'last-of-type', 'first-child', 'last-child'];

    function KssStateGenerator() {
      var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
      pseudos = new RegExp("(\\:" + (pseudo_selectors.join('|\\:')) + ")", "g");
      try {
        _ref = document.styleSheets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          stylesheet = _ref[_i];
          if (stylesheet.href && stylesheet.href.indexOf(document.domain) >= 0) {
            idxs = [];
            _ref2 = stylesheet.cssRules;
            for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
              rule = _ref2[idx];
              if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
                replaceRule = function (matched, stuff) {
                  return matched.replace(/\:/g, '.pseudo-class-');
                };
                this.insertRule(rule.cssText.replace(pseudos, replaceRule));
              }
              pseudos.lastIndex = 0;
            }
          }
        }
      } catch (_error) { }
    }

    KssStateGenerator.prototype.insertRule = function (rule) {
      var headEl, styleEl;
      headEl = document.getElementsByTagName('head')[0];
      styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = rule;
      } else {
        styleEl.appendChild(document.createTextNode(rule));
      }
      return headEl.appendChild(styleEl);
    };

    return KssStateGenerator;

  })();

  new KssStateGenerator;

}).call(this);



// custom code.
(function () {


  // navigation.
  $('.kss-header__hamburger-trigger').on('click', function (e) {
    var kssNavigation = '.kss-navigation',
      kssDocumentation = '.kss-documentation',
      kssHamburger = '.kss-header__hamburger';

    if ($(kssNavigation).hasClass('kss-state-active')) {
      $(kssNavigation).removeClass('kss-state-active');
      $(kssDocumentation).removeClass('kss-state-active');
    } else {
      $(kssNavigation).addClass('kss-state-active');
      $(kssDocumentation).addClass('kss-state-active');
    }

    if ($(kssHamburger).hasClass('kss-state-active')) {
      $(kssHamburger).removeClass('kss-state-active');
    } else {
      $(kssHamburger).addClass('kss-state-active');
    }
  });


  // smooth scrolling.
  (function smoothScrolling() {
    $('.kss-nav__item > a[href*=section]').on('click', function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);

          return false;
        }
      }
    });
  })();


  //colors.
  (function () {
    var parameters = $('.kss-parameters');

    if (parameters) {
      $('.kss-parameters__item').each(function (index) {
        var description = $(this).find('.kss-parameters__description').text().trim().replace(/; +/g, ';');
        var colorName = description.split(';')[1] ? description.split(';')[1] : '';
        var colorVar = $(this).find('.kss-parameters__name').text().trim();
        var colorCode = description.split(';')[0];
        var isHexadecimal = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorCode);
        var isRGB = /(rgba?\((?:\d{1,3}(, +|,|\))){3}(?:\d+\.\d+\))?)/i.test(colorCode);
        var colorContent = '<span class="kss-color__name lh_1 font_0 p-b_3">' + colorName + '</span>' +
          '<span class="kss-color__var">' + colorVar + '</span>' +
          '<span class="kss-color__code">' + colorCode + '</span>';

        if (isHexadecimal || isRGB) {
          $(this).parent().addClass('kss-colors-container gap-x_4 gap-y_3 grid template-x_15');
          $(this).addClass('kss-color').css('background', colorCode);
          $(this).find('.kss-parameters__description').html(colorContent);
          $(this).find('.kss-parameters__description').addClass(
            'absolute b_2 l_2 p_3 r_2 w_auto bg_white-7'
          )
        }
      });
    }
  })();

  // subComponents.
  (function () {
    console.log($('.kss-section__section__subComponents'));
    $('.kss-section__section__subComponents').each(function (item) {
      var nodeHTML = $(this).find('.kss-section__section__subComponent').parent().find(".list")[0];
      // remove nodeHTML from the dom.
      
      console.log(nodeHTML);
      var parameters = $(this).find('.kss-section__section__subComponent').text().trim().replace(/; +/g, ';');
      $(this).find('.kss-section__section__subComponent').remove();
      if (parameters) {
        // split parameters into array of string on line break.
        var parametersArray = parameters.split('\n');
        console.log(parametersArray);
        // loop through each parameter.
        var output = [];
        parametersArray.forEach(function (parameter) {
          var regex = /^(\S+)\s*\s*(?:\s*-\s*(.*))?$/gm;
          // regex group all text split by '.' by new line

          var test;
          var obj;
          if ((test = regex.exec(parameter)) !== null) {
            obj = {};
            obj.line = test.slice(1);
            obj.name = test[2];
            obj.path = test[1];
            output.push(obj);
          }

        });
        console.log(output);
        output.forEach(function (o, index, array) {
          // var subCompHTML = '<li><a href="'+ o.path +'"class="kss-subComponent__name lh_1 font_0 p-b_3">' + o.name + '</a></li>';
          // append subCompHTML the html. 
          var li = document.createElement("li");
          var link = o.path.split('.').reduce(function (acc, curr) { return acc+"-"+curr; }, '');
          li.innerHTML = '<a href="item' + link + '.html" class="kss-subComponent__name lh_1 font_0 p-b_3">' + o.name + '</a>';
          nodeHTML.append(li);
        });
      }
      });

  })();
  // Data.
  (function () {
    console.log($('.kss-section__section__dataElements'));
    $('.kss-section__section__dataElements').each(function (item) {
      var nodeHTML = $(this).find('.kss-section__section__dataElement').parent().find(".list")[0];
      // remove nodeHTML from the dom.
      
      console.log(nodeHTML);
      var parameters = $(this).find('.kss-section__section__dataElement').text().trim().replace(/; +/g, ';');
      $(this).find('.kss-section__section__dataElement').remove();
      if (parameters) {
        // split parameters into array of string on line break.
        var parametersArray = parameters.split('\n');
        console.log(parametersArray);
        // loop through each parameter.
        var output = [];
        parametersArray.forEach(function (parameter) {
          var regex = /^(\S+)\s*\s*(?:\s*-\s*(.*))?$/gm;
          // regex group all text split by '.' by new line

          var test;
          var obj;
          if ((test = regex.exec(parameter)) !== null) {
            obj = {};
            obj.line = test.slice(1);
            obj.name = test[2];
            obj.path = test[1];
            output.push(obj);
          }

        });
        console.log(output);
        output.forEach(function (o, index, array) {
          // var subCompHTML = '<li><a href="'+ o.path +'"class="kss-dataElement__name lh_1 font_0 p-b_3">' + o.name + '</a></li>';
          // append subCompHTML the html. 
          var li = document.createElement("li");
          var link = o.path.split('.').reduce(function (acc, curr) { return acc+"-"+curr; }, '');
          li.innerHTML = '<a href="item' + link + '.html" class="kss-dataElement__name lh_1 font_0 p-b_3">' + o.name + '</a>';
          nodeHTML.append(li);
        });
      }
      });

  })();
}) ();