(function() {  var endpoint = "https://api.crowdstart.com/mailinglist/D8uvu4zwYj/subscribe",
    ml = {
      "id": "D8uvu4zwYj",
      "name": "Newsletter",
      "sendWelcome": false,
      "mailchimp": {
        "id": "a9e56db0c9",
        "apiKey": "b653197394bbbaedaeddfb9547cb4bb9-us11",
        "doubleOptin": false,
        "updateExisting": true,
        "replaceInterests": false,
        "sendWelcome": false,
        "enabled": false
      },
      "forward": {
        "email": "",
        "name": "",
        "enabled": false
      },
      "thankyou": {
        "type": "disable"
      },
      "facebook": {
        "id": "6045819573718",
        "value": "0",
        "currency": "usd"
      },
      "google": {
        "category": "Sign-up",
        "name": "Newsletter Sign-up"
      }
    };
  var XHR, addHandler, attr, called, errors, facebook, forms, getContainer, getElements, getScript, getValue, google, handlers, init, parent, script, selectors, serializeForm, track, validate;
  called = false;
  errors = null;
  forms = null;
  handlers = null;
  parent = null;
  script = null;
  selectors = {};
  validate = false;
  XHR = function() {
    var xhr;
    xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return {
      setHeaders: function(headers) {
        var k, v;
        for (k in headers) {
          v = headers[k];
          xhr.setRequestHeader(k, v);
        }
      },
      post: function(url, headers, payload, cb) {
        xhr.open('POST', url, true);
        this.setHeaders(headers);
        xhr.send(payload);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
              cb(null, xhr.status, xhr);
            } else {
              cb(new Error('Subscription failed'), xhr.status, xhr);
            }
          }
        };
      }
    };
  };
  getContainer = function(script, selector) {
    var inputs;
    if (selector == null) {
      selector = '';
    }
    if (selector !== '') {
      return document.querySelector(selectors.container);
    } else {
      parent = script.parentNode;
      inputs = parent.getElementsByTagName('input');
      if (inputs.length < 1) {
        return document.body;
      } else {
        return parent;
      }
    }
  };
  getScript = function() {
    var scripts;
    scripts = document.getElementsByTagName('script');
    script = scripts[scripts.length - 1];
    return script;
  };
  getElements = function(parent, selector) {
    if ((selector != null) && selector !== '') {
      return parent.querySelectorAll(selector);
    } else {
      return [parent];
    }
  };
  getValue = function(parent, selector) {
    var el, ref;
    if (parent == null) {
      parent = document.body;
    }
    el = parent.querySelector(selector);
    return el != null ? (ref = el.value) != null ? ref.trim() : void 0 : void 0;
  };
  serializeForm = function(form) {
    var data, el, j, k, l, len, len1, prop, ref, ref1, selector, v;
    if (form == null) {
      return {};
    }
    data = {
      metadata: {}
    };
    ref = form.elements;
    for (j = 0, len = ref.length; j < len; j++) {
      el = ref[j];
      k = el.name.trim().toLowerCase();
      v = "";
      if (el.value != null) {
        v = el.value.trim();
      }
      if (k === '' || v === '' || (el.getAttribute('type')) === 'submit') {
        continue;
      }
      if (/email/.test(k)) {
        data.email = v;
      } else {
        data.metadata[k] = v;
      }
    }
    if (selectors.email) {
      data.email = getValue(form, selectors.email);
    } else {
      if (data.email == null) {
        data.email = '';
      }
    }
    ref1 = ['firstname', 'lastname', 'name'];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      prop = ref1[l];
      if ((selector = selectors[prop]) != null) {
        data.metadata[prop] = getValue(form, selector);
      }
    }
    return data;
  };
  attr = function(name) {
    var val;
    val = script.getAttribute('data-' + name);
    if (val == null) {
      return;
    }
    switch (val.trim().toLowerCase()) {
      case 'false':
        return false;
      case 'true':
        return true;
      default:
        return val;
    }
  };
  google = {
    setup: function() {
      if ((window.ga != null) || (window._gaq != null)) {
        return;
      }
      (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments);
        };
        i[r].l = 1 * new Date();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    },
    track: function(opts) {
      var action, category, label, ref, ref1, ref2, ref3, ref4, value;
      if (opts.category == null) {
        return;
      }
      google.setup();
      category = (ref = opts.category) != null ? ref : 'Subscription';
      action = (ref1 = (ref2 = opts.action) != null ? ref2 : opts.name) != null ? ref1 : 'Signup';
      label = (ref3 = opts.label) != null ? ref3 : 'Lead';
      value = (ref4 = opts.value) != null ? ref4 : 1;
      if (window._gaq != null) {
        window._gaq.push(['_trackEvent', category, action, label, value]);
      }
      if (window.ga != null) {
        window.ga('send', 'event', category, action, label, value);
      }
    }
  };
  facebook = {
    setup: function() {
      var _fbq, fbds, ref, s;
      if ((ref = window._fbq) != null ? ref.loaded : void 0) {
        return;
      }
      _fbq = window._fbq || (window._fbq = []);
      fbds = document.createElement('script');
      fbds.async = true;
      fbds.src = '//connect.facebook.net/en_US/fbds.js';
      s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(fbds, s);
      _fbq.loaded = true;
    },
    track: function(opts) {
      var currency, ref, ref1, value;
      if (opts.id == null) {
        return;
      }
      facebook.setup();
      value = (ref = opts.value) != null ? ref : '1.00';
      currency = (ref1 = opts.currency) != null ? ref1 : 'USD';
      window._fbq.push(['track', opts.id, {
        value: value,
        currency: currency
      }]);
    }
  };
  track = function() {
    facebook.track(ml.facebook);
    google.track(ml.google);
  };
  addHandler = function(el, errorEl) {
    var hideError, showError, submitHandler, thankYou;
    if (errorEl == null) {
      errorEl = document.createElement('div');
      errorEl.className = 'crowdstart-mailinglist-error';
      errorEl.style.display = 'none';
      errorEl.style.width = 100 + '%' [0];
      el.appendChild(errorEl);
    }
    showError = function(msg) {
      errorEl.style.display = 'inline';
      errorEl.innerHTML = msg;
      return false;
    };
    hideError = function() {
      return errorEl.style.display = 'none';
    };
    thankYou = function() {
      var e, error, event;
      switch (ml.thankyou.type) {
        case 'redirect':
          setTimeout(function() {
            return window.location = ml.thankyou.url;
          }, 1000);
          break;
        case 'html':
          el.innerHTML = ml.thankyou.html;
      }
      if (document.createEvent && document.dispatchEvent) {
        try {
          return el.dispatchEvent(new Event('thankyou', {
            bubbles: true,
            cancelable: true
          }));
        } catch (error) {
          e = error;
          event = document.createEvent('Event');
          event.initEvent('thankyou', true, true);
          return document.dispatchEvent(event);
        }
      } else {
        return console.log("Could not create or dispatch thankyou event");
      }
    };
    submitHandler = function(ev) {
      var data, headers, payload, xhr;
      if (ev.defaultPrevented) {
        return;
      } else {
        ev.preventDefault();
      }
      data = serializeForm(el);
      if (ml.validate) {
        if (data.email == null) {
          return showError('Email is required');
        }
        if ((data.email.indexOf('@')) === -1) {
          return showError('Invalid email');
        }
        if (data.email.length < 3) {
          return showError('Invalid email');
        }
        hideError();
      }
      payload = JSON.stringify(data);
      headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'application/json; charset=utf-8'
      };
      xhr = XHR();
      xhr.post(endpoint, headers, payload, function(err, status, xhr) {
        if (status === 409) {
          return thankYou();
        }
        if (err != null) {
          return showError(err);
        }
        track();
        return thankYou();
      });
      return false;
    };
    return function(ev) {
      el.removeEventListener('submit', addHandler);
      el.addEventListener('submit', submitHandler);
      setTimeout(function() {
        var e, error, event;
        if (document.createEvent && document.dispatchEvent) {
          try {
            return el.dispatchEvent(new Event('submit', {
              bubbles: false,
              cancelable: true
            }));
          } catch (error) {
            e = error;
            event = document.createEvent('Event');
            event.initEvent('submit', false, true);
            return el.dispatchEvent(event);
          }
        } else {
          return console.log("Could not create or dispatch submit event");
        }
      }, 500);
      ev.preventDefault();
      return false;
    };
  };
  init = function() {
    var handler, i, j, l, len, len1, prop, props, ref, ref1, ref2, results;
    if (called) {
      return;
    } else {
      called = true;
    }
    props = ['container', 'forms', 'submits', 'errors', 'email', 'firstname', 'lastname', 'name'];
    for (j = 0, len = props.length; j < len; j++) {
      prop = props[j];
      selectors[prop] = (ref = attr(prop)) != null ? ref : (ref1 = ml.selectors) != null ? ref1[prop] : void 0;
    }
    if (selectors.submits == null) {
      selectors.submits = 'input[type="submit"], button[type="submit"]';
    }
    if (ml.validate == null) {
      ml.validate = (ref2 = attr('validate')) != null ? ref2 : false;
    }
    parent = getContainer(script, selectors.container);
    forms = getElements(parent, selectors.forms);
    handlers = getElements(parent, selectors.submits);
    if (selectors.errors) {
      errors = getElements(parent, selectors.errors);
    } else {
      errors = [];
    }
    results = [];
    for (i = l = 0, len1 = handlers.length; l < len1; i = ++l) {
      handler = handlers[i];
      results.push((function(handler, i) {
        if (handler.getAttribute('data-hijacked')) {
          return;
        }
        handler.setAttribute('data-hijacked', true);
        handler.addEventListener('click', addHandler(forms[i], errors[i]));
        return handler.addEventListener('submit', addHandler(forms[i], errors[i]));
      })(handler, i));
    }
    return results;
  };
  script = getScript();
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        return init();
      }
    });
  }
  if (window.addEventListener) {
    window.addEventListener('load', init, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', init);
  }
})();
