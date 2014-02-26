!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Validate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var basic = function(errors, evt) {
    var SELECTOR_ERRORS = $('.error_box'),
        SELECTOR_SUCCESS = $('.success_box');
        
    if (errors.length > 0) {
        SELECTOR_ERRORS.empty();
        
        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            SELECTOR_ERRORS.append(errors[i].message + '<br />');
        }
        
        SELECTOR_SUCCESS.css({ display: 'none' });
        SELECTOR_ERRORS.fadeIn(200);
    } else {
        SELECTOR_ERRORS.css({ display: 'none' });
        SELECTOR_SUCCESS.fadeIn(200);
    }

}

module.exports = basic;
},{}],2:[function(_dereq_,module,exports){
/*
 * validate-multi.js
 * 
 * original from : http://rickharrison.github.com/validate.js
 */



(function(window, document, undefined) {

    // require your theme
    var basic = _dereq_('./themes/basic/basic');
    //var inbox = require('./themes/inbox/inbox');
    /*
     * If you would like an application-wide config, change these defaults.
     * Otherwise, use the setMessage() function to configure form specific messages.
     */

    var defaults = {
        english: {
            required: 'The %s field is required.',
            matches: 'The %s field does not match the %s field.',
            "default": 'The %s field is still set to default, please change.',
            valid_email: 'The %s field must contain a valid email address.',
            valid_emails: 'The %s field must contain all valid email addresses.',
            min_length: 'The %s field must be at least %s characters in length.',
            max_length: 'The %s field must not exceed %s characters in length.',
            exact_length: 'The %s field must be exactly %s characters in length.',
            greater_than: 'The %s field must contain a number greater than %s.',
            less_than: 'The %s field must contain a number less than %s.',
            alpha: 'The %s field must only contain alphabetical characters.',
            alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
            alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
            numeric: 'The %s field must contain only numbers.',
            integer: 'The %s field must contain an integer.',
            decimal: 'The %s field must contain a decimal number.',
            is_natural: 'The %s field must contain only positive numbers.',
            is_natural_no_zero: 'The %s field must contain a number greater than zero.',
            valid_ip: 'The %s field must contain a valid IP.',
            valid_base64: 'The %s field must contain a base64 string.',
            valid_credit_card: 'The %s field must contain a valid credit card number.',
            is_file_type: 'The %s field must contain only %s files.',
            valid_url: 'The %s field must contain a valid URL.'
        },
        chinese_zh: {
            required: '請輸入 %s 欄位。',
            matches: '你的 %s 欄位與 %s 欄位不符。',
            valid_email: '請填上有效的 %s ',
            valid_emails: '請填上有效的 %s ',
            min_length: '你的 %s 必須至少填滿 %s 個字元。',
            max_length: '你的 %s 必須不能超過 %s 個字元。',
            exact_length: '你的 %s 必須剛好要 %s 個字元。',
            greater_than: '你的 %s 必須要有個大於 %s 的數字。',
            less_than: '你的 %s 必須要有個小於 %s 的數字。',
            alpha: '你的 %s 必須只有英文字母。',
            alpha_numeric: '你的 %s 必須只有英文字母或數字。',
            alpha_dash: '你的 %s 只可以是英文字母、數字、底線或破折號。',
            numeric: '你的 %s 必須只有數字。',
            integer: '你的 %s 必須是個整數。',
            decimal: '你的 %s 必須是個小數點。',
            is_natural: '你的 %s 必須只有正數。',
            is_natural_no_zero: '你的 %s 必須是個大於零的數字。',
            valid_ip: '你的 %s 必須是個有效的 IP。',
            valid_base64: '你的 %s 必須是個 base64 字串。',
            valid_credit_card: '你的 %s 必須是個有效的信用卡號碼。',
            is_file_type: '你的 %s 欄位必須要一個 %s 的檔案。',
            valid_url: '你的 %s 必須是要一個有效的 URL。'
        },
        chinese: {
            required: '%s 不能为空。',
            matches: ' %s 与 %s 输入不一致。',
            valid_email: '%s 输入无效',
            valid_emails: '%s 输入无效',
            min_length: '%s 至少 %s 个字符。',
            max_length: '%s 最多 %s 个字符。',
            exact_length: '%s 只能 %s 个字符。',
            greater_than: '%s 必须是大于 %s 的数字。',
            less_than: '%s 必须是小于 %s 的数字。',
            alpha: '%s 必须是英文字母。',
            alpha_numeric: '你的 %s 必須只有英文字母或數字。',
            alpha_dash: '%s 只能是英文字母、数字、下划线和横线',
            numeric: '%s 只能是数字。',
            integer: '%s 只能是整数。',
            decimal: '%s 必须是小数。',
            is_natural: '%s 必须是正数。',
            is_natural_no_zero: '%s 必须是大于零的数字。',
            valid_ip: '%s 必须是有效的IP。',
            valid_base64: '%s 必须是 base64 字符。',
            valid_credit_card: '%s 必须是有效的信用卡号。',
            is_file_type: '%s 只能是 %s 的文件。',
            valid_url: '%s 必须是有效的 URL。'
        },
        callback: function(error) {

        },

        // declare your theme object
        themeBasic: basic

        //themeInbox: inbox
    };


    /*
     * Define the regular expressions that will be used
     */

    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

    /*
     * The exposed public object to validate a form:
     *
     * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
     * @param fields - Array - [{
     *     name: The name of the element (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * @param callback - Function - The callback after validation has been performed.
     *     @argument errors - An array of validation errors
     *     @argument event - The javascript event
     */


    var FormValidator = function(formNameOrNode, fields, language, callback) {
        if(arguments.length == 3) {
            if(typeof arguments[2] === 'function' ) {
                // not equal string and can't find callback in the string
                // it should be callback parameters
                callback = language;
                language = null;
            } else if(arguments[2].indexOf('theme') !== -1) {
                // it is a string, but find callback in the string 
                // it should be a callback
                callback = language;
                language = null; 
            }
        } else if(arguments.length == 2){
            language = null;
            callback = null
        } else if(arguments.length < 2) {
            throw Error('The arguments should be at least 2')
        }

        if(typeof callback === 'string' || callback == null){
            if(callback == null ) {
                this.callback = defaults.callback;
            } else {
                this.callback = defaults[callback];
            }
        } else {
            this.callback = callback;
        }
        // default language to english
        this.language = language || 'english';
        this.errors = [];
        this.fields = {};
        this.form = this._formByNameOrNode(formNameOrNode) || {};
        this.messages = {};
        this.handlers = {};

        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
            var field = fields[i];

            // If passed in incorrectly, we need to skip the field.
            if ((!field.name && !field.names) || !field.rules) {
                continue;
            }

            /*
             * Build the master fields array that has all the information needed to validate
             */

            if (field.names) {
                for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
                    this._addField(field, field.names[j]);
                }
            } else {
                this._addField(field, field.name);
            }
        }

        /*
         * Attach an event callback for the form submission
         */

        var _onsubmit = this.form.onsubmit;

        this.form.onsubmit = (function(that) {
            return function(evt) {
                try {
                    return that._validateForm(evt) && (_onsubmit === undefined || _onsubmit());
                } catch(e) {}
            };
        })(this);
    },

    attributeValue = function (element, attributeName) {
        var i;

        if ((element.length > 0) && (element[0].type === 'radio' || element[0].type === 'checkbox')) {
            for (i = 0, elementLength = element.length; i < elementLength; i++) {
                if (element[i].checked) {
                    return element[i][attributeName];
                }
            }

            return;
        }

        return element[attributeName];
    };

    /*
     * @public
     * Sets a custom message for one of the rules
     */

    FormValidator.prototype.setMessage = function(rule, message) {
        this.messages[rule] = message;

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a callback for a custom rule (i.e. callback_username_check)
     */

    FormValidator.prototype.registerCallback = function(name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
            this.handlers[name] = handler;
        }

        // return this for chaining
        return this;
    };

    /*
     * @private
     * Determines if a form dom node was passed in or just a string representing the form name
     */

    FormValidator.prototype._formByNameOrNode = function(formNameOrNode) {
        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
    };

    /*
     * @private
     * Adds a file to the master fields array
     */

    FormValidator.prototype._addField = function(field, nameValue)  {
        this.fields[nameValue] = {
            name: nameValue,
            display: field.display || nameValue,
            rules: field.rules,
            id: null,
            type: null,
            value: null,
            checked: null
        };
    };

    /*
     * @private
     * Runs the validation when the form is submitted.
     */

    FormValidator.prototype._validateForm = function(evt) {
        this.errors = [];

        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {},
                    element = this.form[field.name];

                if (element && element !== undefined) {
                    field.id = attributeValue(element, 'id');
                    field.type = (element.length > 0) ? element[0].type : element.type;
                    field.value = attributeValue(element, 'value');
                    field.checked = attributeValue(element, 'checked');

                    /*
                     * Run through the rules for each field.
                     */
                    this._validateField(field);
                }
            }
        }

        if (typeof this.callback === 'function') {
            this.callback(this.errors, evt);
        }

        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                // IE uses the global event variable
                event.returnValue = false;
            }
        }

        return true;
    };

    /*
     * @private
     * Looks at the fields value and evaluates it against the given rules
     */

    FormValidator.prototype._validateField = function(field) {
        var rules = field.rules.split('|'),
            indexOfRequired = field.rules.indexOf('required'),
            isEmpty = (!field.value || field.value === '' || field.value === undefined);

        /*
         * Run through the rules and execute the validation methods as needed
         */

        for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            var method = rules[i],
                param = null,
                failed = false,
                parts = ruleRegex.exec(method);

            /*
             * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
             * This ensures that a callback will always be called but other rules will be skipped.
             */

            if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
                continue;
            }

            /*
             * If the rule has a parameter (i.e. matches[param]) split it out
             */

            if (parts) {
                method = parts[1];
                param = parts[2];
            }

            if (method.charAt(0) === '!') {
                method = method.substring(1, method.length);
            }

            /*
             * If the hook is defined, run it to find any validation errors
             */

            if (typeof this._hooks[method] === 'function') {
                if (!this._hooks[method].apply(this, [field, param])) {
                    failed = true;
                }
            } else if (method.substring(0, 9) === 'callback_') {
                // Custom method. Execute the handler if it was registered
                method = method.substring(9, method.length);

                if (typeof this.handlers[method] === 'function') {
                    if (this.handlers[method].apply(this, [field.value, param]) === false) {
                        failed = true;
                    }
                }
            }

            /*
             * If the hook failed, add a message to the errors array
             */

            if (failed) {
                // Make sure we have a message for this rule
                // 

                var source = this.messages[method] || defaults[this.language][method],
                    message = 'An error has occurred with the ' + field.display + ' field.';

                if (source) {
                    message = source.replace('%s', field.display);

                    if (param) {
                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
                    }
                }

                this.errors.push({
                    id: field.id,
                    name: field.name,
                    message: message,
                    rule: method
                });

                // Break out so as to not spam with validation errors (i.e. required and valid_email)
                break;
            }
        }
    };

    /*
     * @private
     * Object containing all of the validation hooks
     */

    FormValidator.prototype._hooks = {
        required: function(field) {
            var value = field.value;

            if ((field.type === 'checkbox') || (field.type === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        "default": function(field, defaultName){
            return field.value !== defaultName;
        },

        matches: function(field, matchName) {
            var el = this.form[matchName];

            if (el) {
                return field.value === el.value;
            }

            return false;
        },

        valid_email: function(field) {
            return emailRegex.test(field.value);
        },

        valid_emails: function(field) {
            var result = field.value.split(",");

            for (var i = 0, resultLength = result.length; i < resultLength; i++) {
                if (!emailRegex.test(result[i])) {
                    return false;
                }
            }

            return true;
        },

        min_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },

        max_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },

        exact_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length === parseInt(length, 10));
        },

        greater_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        },

        alpha: function(field) {
            return (alphaRegex.test(field.value));
        },

        alpha_numeric: function(field) {
            return (alphaNumericRegex.test(field.value));
        },

        alpha_dash: function(field) {
            return (alphaDashRegex.test(field.value));
        },

        numeric: function(field) {
            return (numericRegex.test(field.value));
        },

        integer: function(field) {
            return (integerRegex.test(field.value));
        },

        decimal: function(field) {
            return (decimalRegex.test(field.value));
        },

        is_natural: function(field) {
            return (naturalRegex.test(field.value));
        },

        is_natural_no_zero: function(field) {
            return (naturalNoZeroRegex.test(field.value));
        },

        valid_ip: function(field) {
            return (ipRegex.test(field.value));
        },

        valid_base64: function(field) {
            return (base64Regex.test(field.value));
        },

        valid_url: function(field) {
            return (urlRegex.test(field.value));
        },

        valid_credit_card: function(field){
            // Luhn Check Code from https://gist.github.com/4075533
            // accept only digits, dashes or spaces
            if (!numericDashRegex.test(field.value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            var strippedField = field.value.replace(/\D/g, "");

            for (var n = strippedField.length - 1; n >= 0; n--) {
                var cDigit = strippedField.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        is_file_type: function(field,type) {
            if (field.type !== 'file') {
                return true;
            }

            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
                typeArray = type.split(','),
                inArray = false,
                i = 0,
                len = typeArray.length;

            for (i; i < len; i++) {
                if (ext == typeArray[i]) inArray = true;
            }

            return inArray;
        }
    };

    window.FormValidator = FormValidator;

})(window, document);

},{"./themes/basic/basic":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbGlqdW5nL0RvY3VtZW50cy9kYXRhR2FyYWdlL3ZhbGlkYXRlLW11bHRpLmpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGlqdW5nL0RvY3VtZW50cy9kYXRhR2FyYWdlL3ZhbGlkYXRlLW11bHRpLmpzL3RoZW1lcy9iYXNpYy9iYXNpYy5qcyIsIi9Vc2Vycy9saWp1bmcvRG9jdW1lbnRzL2RhdGFHYXJhZ2UvdmFsaWRhdGUtbXVsdGkuanMvdmFsaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBiYXNpYyA9IGZ1bmN0aW9uKGVycm9ycywgZXZ0KSB7XG4gICAgdmFyIFNFTEVDVE9SX0VSUk9SUyA9ICQoJy5lcnJvcl9ib3gnKSxcbiAgICAgICAgU0VMRUNUT1JfU1VDQ0VTUyA9ICQoJy5zdWNjZXNzX2JveCcpO1xuICAgICAgICBcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgU0VMRUNUT1JfRVJST1JTLmVtcHR5KCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpID0gMCwgZXJyb3JMZW5ndGggPSBlcnJvcnMubGVuZ3RoOyBpIDwgZXJyb3JMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgU0VMRUNUT1JfRVJST1JTLmFwcGVuZChlcnJvcnNbaV0ubWVzc2FnZSArICc8YnIgLz4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgU0VMRUNUT1JfU1VDQ0VTUy5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIFNFTEVDVE9SX0VSUk9SUy5mYWRlSW4oMjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBTRUxFQ1RPUl9FUlJPUlMuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICBTRUxFQ1RPUl9TVUNDRVNTLmZhZGVJbigyMDApO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2ljOyIsIi8qXG4gKiB2YWxpZGF0ZS1tdWx0aS5qc1xuICogXG4gKiBvcmlnaW5hbCBmcm9tIDogaHR0cDovL3JpY2toYXJyaXNvbi5naXRodWIuY29tL3ZhbGlkYXRlLmpzXG4gKi9cblxuXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIC8vIHJlcXVpcmUgeW91ciB0aGVtZVxuICAgIHZhciBiYXNpYyA9IHJlcXVpcmUoJy4vdGhlbWVzL2Jhc2ljL2Jhc2ljJyk7XG4gICAgLy92YXIgaW5ib3ggPSByZXF1aXJlKCcuL3RoZW1lcy9pbmJveC9pbmJveCcpO1xuICAgIC8qXG4gICAgICogSWYgeW91IHdvdWxkIGxpa2UgYW4gYXBwbGljYXRpb24td2lkZSBjb25maWcsIGNoYW5nZSB0aGVzZSBkZWZhdWx0cy5cbiAgICAgKiBPdGhlcndpc2UsIHVzZSB0aGUgc2V0TWVzc2FnZSgpIGZ1bmN0aW9uIHRvIGNvbmZpZ3VyZSBmb3JtIHNwZWNpZmljIG1lc3NhZ2VzLlxuICAgICAqL1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBlbmdsaXNoOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogJ1RoZSAlcyBmaWVsZCBpcyByZXF1aXJlZC4nLFxuICAgICAgICAgICAgbWF0Y2hlczogJ1RoZSAlcyBmaWVsZCBkb2VzIG5vdCBtYXRjaCB0aGUgJXMgZmllbGQuJyxcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiAnVGhlICVzIGZpZWxkIGlzIHN0aWxsIHNldCB0byBkZWZhdWx0LCBwbGVhc2UgY2hhbmdlLicsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWxpZCBlbWFpbCBhZGRyZXNzLicsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbHM6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGFsbCB2YWxpZCBlbWFpbCBhZGRyZXNzZXMuJyxcbiAgICAgICAgICAgIG1pbl9sZW5ndGg6ICdUaGUgJXMgZmllbGQgbXVzdCBiZSBhdCBsZWFzdCAlcyBjaGFyYWN0ZXJzIGluIGxlbmd0aC4nLFxuICAgICAgICAgICAgbWF4X2xlbmd0aDogJ1RoZSAlcyBmaWVsZCBtdXN0IG5vdCBleGNlZWQgJXMgY2hhcmFjdGVycyBpbiBsZW5ndGguJyxcbiAgICAgICAgICAgIGV4YWN0X2xlbmd0aDogJ1RoZSAlcyBmaWVsZCBtdXN0IGJlIGV4YWN0bHkgJXMgY2hhcmFjdGVycyBpbiBsZW5ndGguJyxcbiAgICAgICAgICAgIGdyZWF0ZXJfdGhhbjogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSBudW1iZXIgZ3JlYXRlciB0aGFuICVzLicsXG4gICAgICAgICAgICBsZXNzX3RoYW46ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgbnVtYmVyIGxlc3MgdGhhbiAlcy4nLFxuICAgICAgICAgICAgYWxwaGE6ICdUaGUgJXMgZmllbGQgbXVzdCBvbmx5IGNvbnRhaW4gYWxwaGFiZXRpY2FsIGNoYXJhY3RlcnMuJyxcbiAgICAgICAgICAgIGFscGhhX251bWVyaWM6ICdUaGUgJXMgZmllbGQgbXVzdCBvbmx5IGNvbnRhaW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJzLicsXG4gICAgICAgICAgICBhbHBoYV9kYXNoOiAnVGhlICVzIGZpZWxkIG11c3Qgb25seSBjb250YWluIGFscGhhLW51bWVyaWMgY2hhcmFjdGVycywgdW5kZXJzY29yZXMsIGFuZCBkYXNoZXMuJyxcbiAgICAgICAgICAgIG51bWVyaWM6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIG9ubHkgbnVtYmVycy4nLFxuICAgICAgICAgICAgaW50ZWdlcjogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYW4gaW50ZWdlci4nLFxuICAgICAgICAgICAgZGVjaW1hbDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSBkZWNpbWFsIG51bWJlci4nLFxuICAgICAgICAgICAgaXNfbmF0dXJhbDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gb25seSBwb3NpdGl2ZSBudW1iZXJzLicsXG4gICAgICAgICAgICBpc19uYXR1cmFsX25vX3plcm86ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiB6ZXJvLicsXG4gICAgICAgICAgICB2YWxpZF9pcDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWxpZCBJUC4nLFxuICAgICAgICAgICAgdmFsaWRfYmFzZTY0OiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIGJhc2U2NCBzdHJpbmcuJyxcbiAgICAgICAgICAgIHZhbGlkX2NyZWRpdF9jYXJkOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbGlkIGNyZWRpdCBjYXJkIG51bWJlci4nLFxuICAgICAgICAgICAgaXNfZmlsZV90eXBlOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBvbmx5ICVzIGZpbGVzLicsXG4gICAgICAgICAgICB2YWxpZF91cmw6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsaWQgVVJMLidcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbmVzZV96aDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6ICfoq4vovLjlhaUgJXMg5qyE5L2N44CCJyxcbiAgICAgICAgICAgIG1hdGNoZXM6ICfkvaDnmoQgJXMg5qyE5L2N6IiHICVzIOashOS9jeS4jeespuOAgicsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbDogJ+iri+Whq+S4iuacieaViOeahCAlcyAnLFxuICAgICAgICAgICAgdmFsaWRfZW1haWxzOiAn6KuL5aGr5LiK5pyJ5pWI55qEICVzICcsXG4gICAgICAgICAgICBtaW5fbGVuZ3RoOiAn5L2g55qEICVzIOW/hemgiOiHs+WwkeWhq+a7vyAlcyDlgIvlrZflhYPjgIInLFxuICAgICAgICAgICAgbWF4X2xlbmd0aDogJ+S9oOeahCAlcyDlv4XpoIjkuI3og73otoXpgY4gJXMg5YCL5a2X5YWD44CCJyxcbiAgICAgICAgICAgIGV4YWN0X2xlbmd0aDogJ+S9oOeahCAlcyDlv4XpoIjliZvlpb3opoEgJXMg5YCL5a2X5YWD44CCJyxcbiAgICAgICAgICAgIGdyZWF0ZXJfdGhhbjogJ+S9oOeahCAlcyDlv4XpoIjopoHmnInlgIvlpKfmlrwgJXMg55qE5pW45a2X44CCJyxcbiAgICAgICAgICAgIGxlc3NfdGhhbjogJ+S9oOeahCAlcyDlv4XpoIjopoHmnInlgIvlsI/mlrwgJXMg55qE5pW45a2X44CCJyxcbiAgICAgICAgICAgIGFscGhhOiAn5L2g55qEICVzIOW/hemgiOWPquacieiLseaWh+Wtl+avjeOAgicsXG4gICAgICAgICAgICBhbHBoYV9udW1lcmljOiAn5L2g55qEICVzIOW/hemgiOWPquacieiLseaWh+Wtl+avjeaIluaVuOWtl+OAgicsXG4gICAgICAgICAgICBhbHBoYV9kYXNoOiAn5L2g55qEICVzIOWPquWPr+S7peaYr+iLseaWh+Wtl+avjeOAgeaVuOWtl+OAgeW6lee3muaIluegtOaKmOiZn+OAgicsXG4gICAgICAgICAgICBudW1lcmljOiAn5L2g55qEICVzIOW/hemgiOWPquacieaVuOWtl+OAgicsXG4gICAgICAgICAgICBpbnRlZ2VyOiAn5L2g55qEICVzIOW/hemgiOaYr+WAi+aVtOaVuOOAgicsXG4gICAgICAgICAgICBkZWNpbWFsOiAn5L2g55qEICVzIOW/hemgiOaYr+WAi+Wwj+aVuOm7nuOAgicsXG4gICAgICAgICAgICBpc19uYXR1cmFsOiAn5L2g55qEICVzIOW/hemgiOWPquacieato+aVuOOAgicsXG4gICAgICAgICAgICBpc19uYXR1cmFsX25vX3plcm86ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCL5aSn5pa86Zu255qE5pW45a2X44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2lwOiAn5L2g55qEICVzIOW/hemgiOaYr+WAi+acieaViOeahCBJUOOAgicsXG4gICAgICAgICAgICB2YWxpZF9iYXNlNjQ6ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCLIGJhc2U2NCDlrZfkuLLjgIInLFxuICAgICAgICAgICAgdmFsaWRfY3JlZGl0X2NhcmQ6ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCL5pyJ5pWI55qE5L+h55So5Y2h6Jmf56K844CCJyxcbiAgICAgICAgICAgIGlzX2ZpbGVfdHlwZTogJ+S9oOeahCAlcyDmrITkvY3lv4XpoIjopoHkuIDlgIsgJXMg55qE5qqU5qGI44CCJyxcbiAgICAgICAgICAgIHZhbGlkX3VybDogJ+S9oOeahCAlcyDlv4XpoIjmmK/opoHkuIDlgIvmnInmlYjnmoQgVVJM44CCJ1xuICAgICAgICB9LFxuICAgICAgICBjaGluZXNlOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogJyVzIOS4jeiDveS4uuepuuOAgicsXG4gICAgICAgICAgICBtYXRjaGVzOiAnICVzIOS4jiAlcyDovpPlhaXkuI3kuIDoh7TjgIInLFxuICAgICAgICAgICAgdmFsaWRfZW1haWw6ICclcyDovpPlhaXml6DmlYgnLFxuICAgICAgICAgICAgdmFsaWRfZW1haWxzOiAnJXMg6L6T5YWl5peg5pWIJyxcbiAgICAgICAgICAgIG1pbl9sZW5ndGg6ICclcyDoh7PlsJEgJXMg5Liq5a2X56ym44CCJyxcbiAgICAgICAgICAgIG1heF9sZW5ndGg6ICclcyDmnIDlpJogJXMg5Liq5a2X56ym44CCJyxcbiAgICAgICAgICAgIGV4YWN0X2xlbmd0aDogJyVzIOWPquiDvSAlcyDkuKrlrZfnrKbjgIInLFxuICAgICAgICAgICAgZ3JlYXRlcl90aGFuOiAnJXMg5b+F6aG75piv5aSn5LqOICVzIOeahOaVsOWtl+OAgicsXG4gICAgICAgICAgICBsZXNzX3RoYW46ICclcyDlv4XpobvmmK/lsI/kuo4gJXMg55qE5pWw5a2X44CCJyxcbiAgICAgICAgICAgIGFscGhhOiAnJXMg5b+F6aG75piv6Iux5paH5a2X5q+N44CCJyxcbiAgICAgICAgICAgIGFscGhhX251bWVyaWM6ICfkvaDnmoQgJXMg5b+F6aCI5Y+q5pyJ6Iux5paH5a2X5q+N5oiW5pW45a2X44CCJyxcbiAgICAgICAgICAgIGFscGhhX2Rhc2g6ICclcyDlj6rog73mmK/oi7HmloflrZfmr43jgIHmlbDlrZfjgIHkuIvliJLnur/lkozmqKrnur8nLFxuICAgICAgICAgICAgbnVtZXJpYzogJyVzIOWPquiDveaYr+aVsOWtl+OAgicsXG4gICAgICAgICAgICBpbnRlZ2VyOiAnJXMg5Y+q6IO95piv5pW05pWw44CCJyxcbiAgICAgICAgICAgIGRlY2ltYWw6ICclcyDlv4XpobvmmK/lsI/mlbDjgIInLFxuICAgICAgICAgICAgaXNfbmF0dXJhbDogJyVzIOW/hemhu+aYr+ato+aVsOOAgicsXG4gICAgICAgICAgICBpc19uYXR1cmFsX25vX3plcm86ICclcyDlv4XpobvmmK/lpKfkuo7pm7bnmoTmlbDlrZfjgIInLFxuICAgICAgICAgICAgdmFsaWRfaXA6ICclcyDlv4XpobvmmK/mnInmlYjnmoRJUOOAgicsXG4gICAgICAgICAgICB2YWxpZF9iYXNlNjQ6ICclcyDlv4XpobvmmK8gYmFzZTY0IOWtl+espuOAgicsXG4gICAgICAgICAgICB2YWxpZF9jcmVkaXRfY2FyZDogJyVzIOW/hemhu+aYr+acieaViOeahOS/oeeUqOWNoeWPt+OAgicsXG4gICAgICAgICAgICBpc19maWxlX3R5cGU6ICclcyDlj6rog73mmK8gJXMg55qE5paH5Lu244CCJyxcbiAgICAgICAgICAgIHZhbGlkX3VybDogJyVzIOW/hemhu+aYr+acieaViOeahCBVUkzjgIInXG4gICAgICAgIH0sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gZGVjbGFyZSB5b3VyIHRoZW1lIG9iamVjdFxuICAgICAgICB0aGVtZUJhc2ljOiBiYXNpY1xuXG4gICAgICAgIC8vdGhlbWVJbmJveDogaW5ib3hcbiAgICB9O1xuXG5cbiAgICAvKlxuICAgICAqIERlZmluZSB0aGUgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IHdpbGwgYmUgdXNlZFxuICAgICAqL1xuXG4gICAgdmFyIHJ1bGVSZWdleCA9IC9eKC4rPylcXFsoLispXFxdJC8sXG4gICAgICAgIG51bWVyaWNSZWdleCA9IC9eWzAtOV0rJC8sXG4gICAgICAgIGludGVnZXJSZWdleCA9IC9eXFwtP1swLTldKyQvLFxuICAgICAgICBkZWNpbWFsUmVnZXggPSAvXlxcLT9bMC05XSpcXC4/WzAtOV0rJC8sXG4gICAgICAgIGVtYWlsUmVnZXggPSAvXlthLXpBLVowLTkuISMkJSZhbXA7JyorXFwtXFwvPT9cXF5fYHt8fX5cXC1dK0BbYS16QS1aMC05XFwtXSsoPzpcXC5bYS16QS1aMC05XFwtXSspKiQvLFxuICAgICAgICBhbHBoYVJlZ2V4ID0gL15bYS16XSskL2ksXG4gICAgICAgIGFscGhhTnVtZXJpY1JlZ2V4ID0gL15bYS16MC05XSskL2ksXG4gICAgICAgIGFscGhhRGFzaFJlZ2V4ID0gL15bYS16MC05X1xcLV0rJC9pLFxuICAgICAgICBuYXR1cmFsUmVnZXggPSAvXlswLTldKyQvaSxcbiAgICAgICAgbmF0dXJhbE5vWmVyb1JlZ2V4ID0gL15bMS05XVswLTldKiQvaSxcbiAgICAgICAgaXBSZWdleCA9IC9eKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7M30oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSkkL2ksXG4gICAgICAgIGJhc2U2NFJlZ2V4ID0gL1teYS16QS1aMC05XFwvXFwrPV0vaSxcbiAgICAgICAgbnVtZXJpY0Rhc2hSZWdleCA9IC9eW1xcZFxcLVxcc10rJC8sXG4gICAgICAgIHVybFJlZ2V4ID0gL14oKGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKXwpKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8kLztcblxuICAgIC8qXG4gICAgICogVGhlIGV4cG9zZWQgcHVibGljIG9iamVjdCB0byB2YWxpZGF0ZSBhIGZvcm06XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm9ybU5hbWVPck5vZGUgLSBTdHJpbmcgLSBUaGUgbmFtZSBhdHRyaWJ1dGUgb2YgdGhlIGZvcm0gKGkuZS4gPGZvcm0gbmFtZT1cIm15Rm9ybVwiPjwvZm9ybT4pIG9yIG5vZGUgb2YgdGhlIGZvcm0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBmaWVsZHMgLSBBcnJheSAtIFt7XG4gICAgICogICAgIG5hbWU6IFRoZSBuYW1lIG9mIHRoZSBlbGVtZW50IChpLmUuIDxpbnB1dCBuYW1lPVwibXlGaWVsZFwiIC8+KVxuICAgICAqICAgICBkaXNwbGF5OiAnRmllbGQgTmFtZSdcbiAgICAgKiAgICAgcnVsZXM6IHJlcXVpcmVkfG1hdGNoZXNbcGFzc3dvcmRfY29uZmlybV1cbiAgICAgKiB9XVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIEZ1bmN0aW9uIC0gVGhlIGNhbGxiYWNrIGFmdGVyIHZhbGlkYXRpb24gaGFzIGJlZW4gcGVyZm9ybWVkLlxuICAgICAqICAgICBAYXJndW1lbnQgZXJyb3JzIC0gQW4gYXJyYXkgb2YgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICAgKiAgICAgQGFyZ3VtZW50IGV2ZW50IC0gVGhlIGphdmFzY3JpcHQgZXZlbnRcbiAgICAgKi9cblxuXG4gICAgdmFyIEZvcm1WYWxpZGF0b3IgPSBmdW5jdGlvbihmb3JtTmFtZU9yTm9kZSwgZmllbGRzLCBsYW5ndWFnZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgYXJndW1lbnRzWzJdID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgICAgIC8vIG5vdCBlcXVhbCBzdHJpbmcgYW5kIGNhbid0IGZpbmQgY2FsbGJhY2sgaW4gdGhlIHN0cmluZ1xuICAgICAgICAgICAgICAgIC8vIGl0IHNob3VsZCBiZSBjYWxsYmFjayBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBsYW5ndWFnZTtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYXJndW1lbnRzWzJdLmluZGV4T2YoJ3RoZW1lJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBzdHJpbmcsIGJ1dCBmaW5kIGNhbGxiYWNrIGluIHRoZSBzdHJpbmcgXG4gICAgICAgICAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGEgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGxhbmd1YWdlO1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbnVsbDsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09IDIpe1xuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsXG4gICAgICAgIH0gZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RoZSBhcmd1bWVudHMgc2hvdWxkIGJlIGF0IGxlYXN0IDInKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJyB8fCBjYWxsYmFjayA9PSBudWxsKXtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGRlZmF1bHRzLmNhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gZGVmYXVsdHNbY2FsbGJhY2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRlZmF1bHQgbGFuZ3VhZ2UgdG8gZW5nbGlzaFxuICAgICAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ3VhZ2UgfHwgJ2VuZ2xpc2gnO1xuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgICB0aGlzLmZpZWxkcyA9IHt9O1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLl9mb3JtQnlOYW1lT3JOb2RlKGZvcm1OYW1lT3JOb2RlKSB8fCB7fTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHt9O1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGZpZWxkTGVuZ3RoID0gZmllbGRzLmxlbmd0aDsgaSA8IGZpZWxkTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc1tpXTtcblxuICAgICAgICAgICAgLy8gSWYgcGFzc2VkIGluIGluY29ycmVjdGx5LCB3ZSBuZWVkIHRvIHNraXAgdGhlIGZpZWxkLlxuICAgICAgICAgICAgaWYgKCghZmllbGQubmFtZSAmJiAhZmllbGQubmFtZXMpIHx8ICFmaWVsZC5ydWxlcykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogQnVpbGQgdGhlIG1hc3RlciBmaWVsZHMgYXJyYXkgdGhhdCBoYXMgYWxsIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gdmFsaWRhdGVcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAoZmllbGQubmFtZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgZmllbGROYW1lc0xlbmd0aCA9IGZpZWxkLm5hbWVzLmxlbmd0aDsgaiA8IGZpZWxkTmFtZXNMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRGaWVsZChmaWVsZCwgZmllbGQubmFtZXNbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkRmllbGQoZmllbGQsIGZpZWxkLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICogQXR0YWNoIGFuIGV2ZW50IGNhbGxiYWNrIGZvciB0aGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfb25zdWJtaXQgPSB0aGlzLmZvcm0ub25zdWJtaXQ7XG5cbiAgICAgICAgdGhpcy5mb3JtLm9uc3VibWl0ID0gKGZ1bmN0aW9uKHRoYXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5fdmFsaWRhdGVGb3JtKGV2dCkgJiYgKF9vbnN1Ym1pdCA9PT0gdW5kZWZpbmVkIHx8IF9vbnN1Ym1pdCgpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBpZiAoKGVsZW1lbnQubGVuZ3RoID4gMCkgJiYgKGVsZW1lbnRbMF0udHlwZSA9PT0gJ3JhZGlvJyB8fCBlbGVtZW50WzBdLnR5cGUgPT09ICdjaGVja2JveCcpKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBlbGVtZW50TGVuZ3RoID0gZWxlbWVudC5sZW5ndGg7IGkgPCBlbGVtZW50TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFtpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50W2ldW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRbYXR0cmlidXRlTmFtZV07XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHB1YmxpY1xuICAgICAqIFNldHMgYSBjdXN0b20gbWVzc2FnZSBmb3Igb25lIG9mIHRoZSBydWxlc1xuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuc2V0TWVzc2FnZSA9IGZ1bmN0aW9uKHJ1bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1tydWxlXSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgZm9yIGNoYWluaW5nXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayBmb3IgYSBjdXN0b20gcnVsZSAoaS5lLiBjYWxsYmFja191c2VybmFtZV9jaGVjaylcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLnJlZ2lzdGVyQ2FsbGJhY2sgPSBmdW5jdGlvbihuYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChuYW1lICYmIHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyAmJiBoYW5kbGVyICYmIHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzW25hbWVdID0gaGFuZGxlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiB0aGlzIGZvciBjaGFpbmluZ1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIERldGVybWluZXMgaWYgYSBmb3JtIGRvbSBub2RlIHdhcyBwYXNzZWQgaW4gb3IganVzdCBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGZvcm0gbmFtZVxuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuX2Zvcm1CeU5hbWVPck5vZGUgPSBmdW5jdGlvbihmb3JtTmFtZU9yTm9kZSkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBmb3JtTmFtZU9yTm9kZSA9PT0gJ29iamVjdCcpID8gZm9ybU5hbWVPck5vZGUgOiBkb2N1bWVudC5mb3Jtc1tmb3JtTmFtZU9yTm9kZV07XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBBZGRzIGEgZmlsZSB0byB0aGUgbWFzdGVyIGZpZWxkcyBhcnJheVxuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuX2FkZEZpZWxkID0gZnVuY3Rpb24oZmllbGQsIG5hbWVWYWx1ZSkgIHtcbiAgICAgICAgdGhpcy5maWVsZHNbbmFtZVZhbHVlXSA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWVWYWx1ZSxcbiAgICAgICAgICAgIGRpc3BsYXk6IGZpZWxkLmRpc3BsYXkgfHwgbmFtZVZhbHVlLFxuICAgICAgICAgICAgcnVsZXM6IGZpZWxkLnJ1bGVzLFxuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgICBjaGVja2VkOiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBSdW5zIHRoZSB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkLlxuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlRm9ybSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkc1trZXldIHx8IHt9LFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5mb3JtW2ZpZWxkLm5hbWVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmlkID0gYXR0cmlidXRlVmFsdWUoZWxlbWVudCwgJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnR5cGUgPSAoZWxlbWVudC5sZW5ndGggPiAwKSA/IGVsZW1lbnRbMF0udHlwZSA6IGVsZW1lbnQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQudmFsdWUgPSBhdHRyaWJ1dGVWYWx1ZShlbGVtZW50LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuY2hlY2tlZCA9IGF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQsICdjaGVja2VkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICogUnVuIHRocm91Z2ggdGhlIHJ1bGVzIGZvciBlYWNoIGZpZWxkLlxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGVGaWVsZChmaWVsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMuZXJyb3JzLCBldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChldnQgJiYgZXZ0LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSUUgdXNlcyB0aGUgZ2xvYmFsIGV2ZW50IHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogTG9va3MgYXQgdGhlIGZpZWxkcyB2YWx1ZSBhbmQgZXZhbHVhdGVzIGl0IGFnYWluc3QgdGhlIGdpdmVuIHJ1bGVzXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVGaWVsZCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgIHZhciBydWxlcyA9IGZpZWxkLnJ1bGVzLnNwbGl0KCd8JyksXG4gICAgICAgICAgICBpbmRleE9mUmVxdWlyZWQgPSBmaWVsZC5ydWxlcy5pbmRleE9mKCdyZXF1aXJlZCcpLFxuICAgICAgICAgICAgaXNFbXB0eSA9ICghZmllbGQudmFsdWUgfHwgZmllbGQudmFsdWUgPT09ICcnIHx8IGZpZWxkLnZhbHVlID09PSB1bmRlZmluZWQpO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFJ1biB0aHJvdWdoIHRoZSBydWxlcyBhbmQgZXhlY3V0ZSB0aGUgdmFsaWRhdGlvbiBtZXRob2RzIGFzIG5lZWRlZFxuICAgICAgICAgKi9cblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcnVsZUxlbmd0aCA9IHJ1bGVzLmxlbmd0aDsgaSA8IHJ1bGVMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHJ1bGVzW2ldLFxuICAgICAgICAgICAgICAgIHBhcmFtID0gbnVsbCxcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IHJ1bGVSZWdleC5leGVjKG1ldGhvZCk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBJZiB0aGlzIGZpZWxkIGlzIG5vdCByZXF1aXJlZCBhbmQgdGhlIHZhbHVlIGlzIGVtcHR5LCBjb250aW51ZSBvbiB0byB0aGUgbmV4dCBydWxlIHVubGVzcyBpdCdzIGEgY2FsbGJhY2suXG4gICAgICAgICAgICAgKiBUaGlzIGVuc3VyZXMgdGhhdCBhIGNhbGxiYWNrIHdpbGwgYWx3YXlzIGJlIGNhbGxlZCBidXQgb3RoZXIgcnVsZXMgd2lsbCBiZSBza2lwcGVkLlxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmIChpbmRleE9mUmVxdWlyZWQgPT09IC0xICYmIG1ldGhvZC5pbmRleE9mKCchY2FsbGJhY2tfJykgPT09IC0xICYmIGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIElmIHRoZSBydWxlIGhhcyBhIHBhcmFtZXRlciAoaS5lLiBtYXRjaGVzW3BhcmFtXSkgc3BsaXQgaXQgb3V0XG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYgKHBhcnRzKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gcGFydHNbMV07XG4gICAgICAgICAgICAgICAgcGFyYW0gPSBwYXJ0c1syXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZC5jaGFyQXQoMCkgPT09ICchJykge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1ldGhvZC5zdWJzdHJpbmcoMSwgbWV0aG9kLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBJZiB0aGUgaG9vayBpcyBkZWZpbmVkLCBydW4gaXQgdG8gZmluZCBhbnkgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2hvb2tzW21ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hvb2tzW21ldGhvZF0uYXBwbHkodGhpcywgW2ZpZWxkLCBwYXJhbV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRob2Quc3Vic3RyaW5nKDAsIDkpID09PSAnY2FsbGJhY2tfJykge1xuICAgICAgICAgICAgICAgIC8vIEN1c3RvbSBtZXRob2QuIEV4ZWN1dGUgdGhlIGhhbmRsZXIgaWYgaXQgd2FzIHJlZ2lzdGVyZWRcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBtZXRob2Quc3Vic3RyaW5nKDksIG1ldGhvZC5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZXJzW21ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbbWV0aG9kXS5hcHBseSh0aGlzLCBbZmllbGQudmFsdWUsIHBhcmFtXSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogSWYgdGhlIGhvb2sgZmFpbGVkLCBhZGQgYSBtZXNzYWdlIHRvIHRoZSBlcnJvcnMgYXJyYXlcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAoZmFpbGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYSBtZXNzYWdlIGZvciB0aGlzIHJ1bGVcbiAgICAgICAgICAgICAgICAvLyBcblxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLm1lc3NhZ2VzW21ldGhvZF0gfHwgZGVmYXVsdHNbdGhpcy5sYW5ndWFnZV1bbWV0aG9kXSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdBbiBlcnJvciBoYXMgb2NjdXJyZWQgd2l0aCB0aGUgJyArIGZpZWxkLmRpc3BsYXkgKyAnIGZpZWxkLic7XG5cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBzb3VyY2UucmVwbGFjZSgnJXMnLCBmaWVsZC5kaXNwbGF5KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoJyVzJywgKHRoaXMuZmllbGRzW3BhcmFtXSkgPyB0aGlzLmZpZWxkc1twYXJhbV0uZGlzcGxheSA6IHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZmllbGQuaWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHJ1bGU6IG1ldGhvZFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gQnJlYWsgb3V0IHNvIGFzIHRvIG5vdCBzcGFtIHdpdGggdmFsaWRhdGlvbiBlcnJvcnMgKGkuZS4gcmVxdWlyZWQgYW5kIHZhbGlkX2VtYWlsKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBPYmplY3QgY29udGFpbmluZyBhbGwgb2YgdGhlIHZhbGlkYXRpb24gaG9va3NcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLl9ob29rcyA9IHtcbiAgICAgICAgcmVxdWlyZWQ6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmaWVsZC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKChmaWVsZC50eXBlID09PSAnY2hlY2tib3gnKSB8fCAoZmllbGQudHlwZSA9PT0gJ3JhZGlvJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGZpZWxkLmNoZWNrZWQgPT09IHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKGZpZWxkLCBkZWZhdWx0TmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWUgIT09IGRlZmF1bHROYW1lO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hdGNoZXM6IGZ1bmN0aW9uKGZpZWxkLCBtYXRjaE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMuZm9ybVttYXRjaE5hbWVdO1xuXG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQudmFsdWUgPT09IGVsLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfZW1haWw6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF9lbWFpbHM6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmllbGQudmFsdWUuc3BsaXQoXCIsXCIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcmVzdWx0TGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDsgaSA8IHJlc3VsdExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlbWFpbFJlZ2V4LnRlc3QocmVzdWx0W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBtaW5fbGVuZ3RoOiBmdW5jdGlvbihmaWVsZCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIW51bWVyaWNSZWdleC50ZXN0KGxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoZmllbGQudmFsdWUubGVuZ3RoID49IHBhcnNlSW50KGxlbmd0aCwgMTApKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYXhfbGVuZ3RoOiBmdW5jdGlvbihmaWVsZCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIW51bWVyaWNSZWdleC50ZXN0KGxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoZmllbGQudmFsdWUubGVuZ3RoIDw9IHBhcnNlSW50KGxlbmd0aCwgMTApKTtcbiAgICAgICAgfSxcblxuICAgICAgICBleGFjdF9sZW5ndGg6IGZ1bmN0aW9uKGZpZWxkLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghbnVtZXJpY1JlZ2V4LnRlc3QobGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChmaWVsZC52YWx1ZS5sZW5ndGggPT09IHBhcnNlSW50KGxlbmd0aCwgMTApKTtcbiAgICAgICAgfSxcblxuICAgICAgICBncmVhdGVyX3RoYW46IGZ1bmN0aW9uKGZpZWxkLCBwYXJhbSkge1xuICAgICAgICAgICAgaWYgKCFkZWNpbWFsUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAocGFyc2VGbG9hdChmaWVsZC52YWx1ZSkgPiBwYXJzZUZsb2F0KHBhcmFtKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbGVzc190aGFuOiBmdW5jdGlvbihmaWVsZCwgcGFyYW0pIHtcbiAgICAgICAgICAgIGlmICghZGVjaW1hbFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlRmxvYXQoZmllbGQudmFsdWUpIDwgcGFyc2VGbG9hdChwYXJhbSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFscGhhOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChhbHBoYVJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbHBoYV9udW1lcmljOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChhbHBoYU51bWVyaWNSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxwaGFfZGFzaDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoYWxwaGFEYXNoUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG51bWVyaWM6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKG51bWVyaWNSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW50ZWdlcjogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoaW50ZWdlclJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWNpbWFsOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChkZWNpbWFsUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzX25hdHVyYWw6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5hdHVyYWxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNfbmF0dXJhbF9ub196ZXJvOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChuYXR1cmFsTm9aZXJvUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX2lwOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChpcFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF9iYXNlNjQ6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGJhc2U2NFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF91cmw6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKHVybFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF9jcmVkaXRfY2FyZDogZnVuY3Rpb24oZmllbGQpe1xuICAgICAgICAgICAgLy8gTHVobiBDaGVjayBDb2RlIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vNDA3NTUzM1xuICAgICAgICAgICAgLy8gYWNjZXB0IG9ubHkgZGlnaXRzLCBkYXNoZXMgb3Igc3BhY2VzXG4gICAgICAgICAgICBpZiAoIW51bWVyaWNEYXNoUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgLy8gVGhlIEx1aG4gQWxnb3JpdGhtLiBJdCdzIHNvIHByZXR0eS5cbiAgICAgICAgICAgIHZhciBuQ2hlY2sgPSAwLCBuRGlnaXQgPSAwLCBiRXZlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHN0cmlwcGVkRmllbGQgPSBmaWVsZC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIG4gPSBzdHJpcHBlZEZpZWxkLmxlbmd0aCAtIDE7IG4gPj0gMDsgbi0tKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNEaWdpdCA9IHN0cmlwcGVkRmllbGQuY2hhckF0KG4pO1xuICAgICAgICAgICAgICAgIG5EaWdpdCA9IHBhcnNlSW50KGNEaWdpdCwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChiRXZlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKG5EaWdpdCAqPSAyKSA+IDkpIG5EaWdpdCAtPSA5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5DaGVjayArPSBuRGlnaXQ7XG4gICAgICAgICAgICAgICAgYkV2ZW4gPSAhYkV2ZW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAobkNoZWNrICUgMTApID09PSAwO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzX2ZpbGVfdHlwZTogZnVuY3Rpb24oZmllbGQsdHlwZSkge1xuICAgICAgICAgICAgaWYgKGZpZWxkLnR5cGUgIT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZXh0ID0gZmllbGQudmFsdWUuc3Vic3RyKChmaWVsZC52YWx1ZS5sYXN0SW5kZXhPZignLicpICsgMSkpLFxuICAgICAgICAgICAgICAgIHR5cGVBcnJheSA9IHR5cGUuc3BsaXQoJywnKSxcbiAgICAgICAgICAgICAgICBpbkFycmF5ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgbGVuID0gdHlwZUFycmF5Lmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZXh0ID09IHR5cGVBcnJheVtpXSkgaW5BcnJheSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpbkFycmF5O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5Gb3JtVmFsaWRhdG9yID0gRm9ybVZhbGlkYXRvcjtcblxufSkod2luZG93LCBkb2N1bWVudCk7XG4iXX0=
(2)
});
