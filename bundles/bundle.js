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
    
    if (evt && evt.preventDefault) {
        evt.preventDefault();
    } else if (event) {
        event.returnValue = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbGlqdW5nL0RvY3VtZW50cy9kYXRhR2FyYWdlL3ZhbGlkYXRlLW11bHRpLmpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGlqdW5nL0RvY3VtZW50cy9kYXRhR2FyYWdlL3ZhbGlkYXRlLW11bHRpLmpzL3RoZW1lcy9iYXNpYy9iYXNpYy5qcyIsIi9Vc2Vycy9saWp1bmcvRG9jdW1lbnRzL2RhdGFHYXJhZ2UvdmFsaWRhdGUtbXVsdGkuanMvdmFsaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYmFzaWMgPSBmdW5jdGlvbihlcnJvcnMsIGV2dCkge1xuICAgIHZhciBTRUxFQ1RPUl9FUlJPUlMgPSAkKCcuZXJyb3JfYm94JyksXG4gICAgICAgIFNFTEVDVE9SX1NVQ0NFU1MgPSAkKCcuc3VjY2Vzc19ib3gnKTtcbiAgICAgICAgXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIFNFTEVDVE9SX0VSUk9SUy5lbXB0eSgpO1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVycm9yTGVuZ3RoID0gZXJyb3JzLmxlbmd0aDsgaSA8IGVycm9yTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIFNFTEVDVE9SX0VSUk9SUy5hcHBlbmQoZXJyb3JzW2ldLm1lc3NhZ2UgKyAnPGJyIC8+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFNFTEVDVE9SX1NVQ0NFU1MuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICBTRUxFQ1RPUl9FUlJPUlMuZmFkZUluKDIwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgU0VMRUNUT1JfRVJST1JTLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgU0VMRUNUT1JfU1VDQ0VTUy5mYWRlSW4oMjAwKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGV2dCAmJiBldnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNpYzsiLCIvKlxuICogdmFsaWRhdGUtbXVsdGkuanNcbiAqIFxuICogb3JpZ2luYWwgZnJvbSA6IGh0dHA6Ly9yaWNraGFycmlzb24uZ2l0aHViLmNvbS92YWxpZGF0ZS5qc1xuICovXG5cblxuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgICAvLyByZXF1aXJlIHlvdXIgdGhlbWVcbiAgICB2YXIgYmFzaWMgPSByZXF1aXJlKCcuL3RoZW1lcy9iYXNpYy9iYXNpYycpO1xuICAgIC8vdmFyIGluYm94ID0gcmVxdWlyZSgnLi90aGVtZXMvaW5ib3gvaW5ib3gnKTtcbiAgICAvKlxuICAgICAqIElmIHlvdSB3b3VsZCBsaWtlIGFuIGFwcGxpY2F0aW9uLXdpZGUgY29uZmlnLCBjaGFuZ2UgdGhlc2UgZGVmYXVsdHMuXG4gICAgICogT3RoZXJ3aXNlLCB1c2UgdGhlIHNldE1lc3NhZ2UoKSBmdW5jdGlvbiB0byBjb25maWd1cmUgZm9ybSBzcGVjaWZpYyBtZXNzYWdlcy5cbiAgICAgKi9cblxuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgZW5nbGlzaDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6ICdUaGUgJXMgZmllbGQgaXMgcmVxdWlyZWQuJyxcbiAgICAgICAgICAgIG1hdGNoZXM6ICdUaGUgJXMgZmllbGQgZG9lcyBub3QgbWF0Y2ggdGhlICVzIGZpZWxkLicsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogJ1RoZSAlcyBmaWVsZCBpcyBzdGlsbCBzZXQgdG8gZGVmYXVsdCwgcGxlYXNlIGNoYW5nZS4nLFxuICAgICAgICAgICAgdmFsaWRfZW1haWw6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsaWQgZW1haWwgYWRkcmVzcy4nLFxuICAgICAgICAgICAgdmFsaWRfZW1haWxzOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhbGwgdmFsaWQgZW1haWwgYWRkcmVzc2VzLicsXG4gICAgICAgICAgICBtaW5fbGVuZ3RoOiAnVGhlICVzIGZpZWxkIG11c3QgYmUgYXQgbGVhc3QgJXMgY2hhcmFjdGVycyBpbiBsZW5ndGguJyxcbiAgICAgICAgICAgIG1heF9sZW5ndGg6ICdUaGUgJXMgZmllbGQgbXVzdCBub3QgZXhjZWVkICVzIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicsXG4gICAgICAgICAgICBleGFjdF9sZW5ndGg6ICdUaGUgJXMgZmllbGQgbXVzdCBiZSBleGFjdGx5ICVzIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicsXG4gICAgICAgICAgICBncmVhdGVyX3RoYW46ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAlcy4nLFxuICAgICAgICAgICAgbGVzc190aGFuOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIG51bWJlciBsZXNzIHRoYW4gJXMuJyxcbiAgICAgICAgICAgIGFscGhhOiAnVGhlICVzIGZpZWxkIG11c3Qgb25seSBjb250YWluIGFscGhhYmV0aWNhbCBjaGFyYWN0ZXJzLicsXG4gICAgICAgICAgICBhbHBoYV9udW1lcmljOiAnVGhlICVzIGZpZWxkIG11c3Qgb25seSBjb250YWluIGFscGhhLW51bWVyaWMgY2hhcmFjdGVycy4nLFxuICAgICAgICAgICAgYWxwaGFfZGFzaDogJ1RoZSAlcyBmaWVsZCBtdXN0IG9ubHkgY29udGFpbiBhbHBoYS1udW1lcmljIGNoYXJhY3RlcnMsIHVuZGVyc2NvcmVzLCBhbmQgZGFzaGVzLicsXG4gICAgICAgICAgICBudW1lcmljOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBvbmx5IG51bWJlcnMuJyxcbiAgICAgICAgICAgIGludGVnZXI6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGFuIGludGVnZXIuJyxcbiAgICAgICAgICAgIGRlY2ltYWw6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgZGVjaW1hbCBudW1iZXIuJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWw6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIG9ubHkgcG9zaXRpdmUgbnVtYmVycy4nLFxuICAgICAgICAgICAgaXNfbmF0dXJhbF9ub196ZXJvOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIG51bWJlciBncmVhdGVyIHRoYW4gemVyby4nLFxuICAgICAgICAgICAgdmFsaWRfaXA6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsaWQgSVAuJyxcbiAgICAgICAgICAgIHZhbGlkX2Jhc2U2NDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSBiYXNlNjQgc3RyaW5nLicsXG4gICAgICAgICAgICB2YWxpZF9jcmVkaXRfY2FyZDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWxpZCBjcmVkaXQgY2FyZCBudW1iZXIuJyxcbiAgICAgICAgICAgIGlzX2ZpbGVfdHlwZTogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gb25seSAlcyBmaWxlcy4nLFxuICAgICAgICAgICAgdmFsaWRfdXJsOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbGlkIFVSTC4nXG4gICAgICAgIH0sXG4gICAgICAgIGNoaW5lc2Vfemg6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiAn6KuL6Ly45YWlICVzIOashOS9jeOAgicsXG4gICAgICAgICAgICBtYXRjaGVzOiAn5L2g55qEICVzIOashOS9jeiIhyAlcyDmrITkvY3kuI3nrKbjgIInLFxuICAgICAgICAgICAgdmFsaWRfZW1haWw6ICfoq4vloavkuIrmnInmlYjnmoQgJXMgJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsczogJ+iri+Whq+S4iuacieaViOeahCAlcyAnLFxuICAgICAgICAgICAgbWluX2xlbmd0aDogJ+S9oOeahCAlcyDlv4XpoIjoh7PlsJHloavmu78gJXMg5YCL5a2X5YWD44CCJyxcbiAgICAgICAgICAgIG1heF9sZW5ndGg6ICfkvaDnmoQgJXMg5b+F6aCI5LiN6IO96LaF6YGOICVzIOWAi+Wtl+WFg+OAgicsXG4gICAgICAgICAgICBleGFjdF9sZW5ndGg6ICfkvaDnmoQgJXMg5b+F6aCI5Ymb5aW96KaBICVzIOWAi+Wtl+WFg+OAgicsXG4gICAgICAgICAgICBncmVhdGVyX3RoYW46ICfkvaDnmoQgJXMg5b+F6aCI6KaB5pyJ5YCL5aSn5pa8ICVzIOeahOaVuOWtl+OAgicsXG4gICAgICAgICAgICBsZXNzX3RoYW46ICfkvaDnmoQgJXMg5b+F6aCI6KaB5pyJ5YCL5bCP5pa8ICVzIOeahOaVuOWtl+OAgicsXG4gICAgICAgICAgICBhbHBoYTogJ+S9oOeahCAlcyDlv4XpoIjlj6rmnInoi7HmloflrZfmr43jgIInLFxuICAgICAgICAgICAgYWxwaGFfbnVtZXJpYzogJ+S9oOeahCAlcyDlv4XpoIjlj6rmnInoi7HmloflrZfmr43miJbmlbjlrZfjgIInLFxuICAgICAgICAgICAgYWxwaGFfZGFzaDogJ+S9oOeahCAlcyDlj6rlj6/ku6XmmK/oi7HmloflrZfmr43jgIHmlbjlrZfjgIHlupXnt5rmiJbnoLTmipjomZ/jgIInLFxuICAgICAgICAgICAgbnVtZXJpYzogJ+S9oOeahCAlcyDlv4XpoIjlj6rmnInmlbjlrZfjgIInLFxuICAgICAgICAgICAgaW50ZWdlcjogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIvmlbTmlbjjgIInLFxuICAgICAgICAgICAgZGVjaW1hbDogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIvlsI/mlbjpu57jgIInLFxuICAgICAgICAgICAgaXNfbmF0dXJhbDogJ+S9oOeahCAlcyDlv4XpoIjlj6rmnInmraPmlbjjgIInLFxuICAgICAgICAgICAgaXNfbmF0dXJhbF9ub196ZXJvOiAn5L2g55qEICVzIOW/hemgiOaYr+WAi+Wkp+aWvOmbtueahOaVuOWtl+OAgicsXG4gICAgICAgICAgICB2YWxpZF9pcDogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIvmnInmlYjnmoQgSVDjgIInLFxuICAgICAgICAgICAgdmFsaWRfYmFzZTY0OiAn5L2g55qEICVzIOW/hemgiOaYr+WAiyBiYXNlNjQg5a2X5Liy44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2NyZWRpdF9jYXJkOiAn5L2g55qEICVzIOW/hemgiOaYr+WAi+acieaViOeahOS/oeeUqOWNoeiZn+eivOOAgicsXG4gICAgICAgICAgICBpc19maWxlX3R5cGU6ICfkvaDnmoQgJXMg5qyE5L2N5b+F6aCI6KaB5LiA5YCLICVzIOeahOaqlOahiOOAgicsXG4gICAgICAgICAgICB2YWxpZF91cmw6ICfkvaDnmoQgJXMg5b+F6aCI5piv6KaB5LiA5YCL5pyJ5pWI55qEIFVSTOOAgidcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbmVzZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6ICclcyDkuI3og73kuLrnqbrjgIInLFxuICAgICAgICAgICAgbWF0Y2hlczogJyAlcyDkuI4gJXMg6L6T5YWl5LiN5LiA6Ie044CCJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsOiAnJXMg6L6T5YWl5peg5pWIJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsczogJyVzIOi+k+WFpeaXoOaViCcsXG4gICAgICAgICAgICBtaW5fbGVuZ3RoOiAnJXMg6Iez5bCRICVzIOS4quWtl+espuOAgicsXG4gICAgICAgICAgICBtYXhfbGVuZ3RoOiAnJXMg5pyA5aSaICVzIOS4quWtl+espuOAgicsXG4gICAgICAgICAgICBleGFjdF9sZW5ndGg6ICclcyDlj6rog70gJXMg5Liq5a2X56ym44CCJyxcbiAgICAgICAgICAgIGdyZWF0ZXJfdGhhbjogJyVzIOW/hemhu+aYr+Wkp+S6jiAlcyDnmoTmlbDlrZfjgIInLFxuICAgICAgICAgICAgbGVzc190aGFuOiAnJXMg5b+F6aG75piv5bCP5LqOICVzIOeahOaVsOWtl+OAgicsXG4gICAgICAgICAgICBhbHBoYTogJyVzIOW/hemhu+aYr+iLseaWh+Wtl+avjeOAgicsXG4gICAgICAgICAgICBhbHBoYV9udW1lcmljOiAn5L2g55qEICVzIOW/hemgiOWPquacieiLseaWh+Wtl+avjeaIluaVuOWtl+OAgicsXG4gICAgICAgICAgICBhbHBoYV9kYXNoOiAnJXMg5Y+q6IO95piv6Iux5paH5a2X5q+N44CB5pWw5a2X44CB5LiL5YiS57q/5ZKM5qiq57q/JyxcbiAgICAgICAgICAgIG51bWVyaWM6ICclcyDlj6rog73mmK/mlbDlrZfjgIInLFxuICAgICAgICAgICAgaW50ZWdlcjogJyVzIOWPquiDveaYr+aVtOaVsOOAgicsXG4gICAgICAgICAgICBkZWNpbWFsOiAnJXMg5b+F6aG75piv5bCP5pWw44CCJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWw6ICclcyDlv4XpobvmmK/mraPmlbDjgIInLFxuICAgICAgICAgICAgaXNfbmF0dXJhbF9ub196ZXJvOiAnJXMg5b+F6aG75piv5aSn5LqO6Zu255qE5pWw5a2X44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2lwOiAnJXMg5b+F6aG75piv5pyJ5pWI55qESVDjgIInLFxuICAgICAgICAgICAgdmFsaWRfYmFzZTY0OiAnJXMg5b+F6aG75pivIGJhc2U2NCDlrZfnrKbjgIInLFxuICAgICAgICAgICAgdmFsaWRfY3JlZGl0X2NhcmQ6ICclcyDlv4XpobvmmK/mnInmlYjnmoTkv6HnlKjljaHlj7fjgIInLFxuICAgICAgICAgICAgaXNfZmlsZV90eXBlOiAnJXMg5Y+q6IO95pivICVzIOeahOaWh+S7tuOAgicsXG4gICAgICAgICAgICB2YWxpZF91cmw6ICclcyDlv4XpobvmmK/mnInmlYjnmoQgVVJM44CCJ1xuICAgICAgICB9LFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGRlY2xhcmUgeW91ciB0aGVtZSBvYmplY3RcbiAgICAgICAgdGhlbWVCYXNpYzogYmFzaWNcblxuICAgICAgICAvL3RoZW1lSW5ib3g6IGluYm94XG4gICAgfTtcblxuXG4gICAgLypcbiAgICAgKiBEZWZpbmUgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCB3aWxsIGJlIHVzZWRcbiAgICAgKi9cblxuICAgIHZhciBydWxlUmVnZXggPSAvXiguKz8pXFxbKC4rKVxcXSQvLFxuICAgICAgICBudW1lcmljUmVnZXggPSAvXlswLTldKyQvLFxuICAgICAgICBpbnRlZ2VyUmVnZXggPSAvXlxcLT9bMC05XSskLyxcbiAgICAgICAgZGVjaW1hbFJlZ2V4ID0gL15cXC0/WzAtOV0qXFwuP1swLTldKyQvLFxuICAgICAgICBlbWFpbFJlZ2V4ID0gL15bYS16QS1aMC05LiEjJCUmYW1wOycqK1xcLVxcLz0/XFxeX2B7fH1+XFwtXStAW2EtekEtWjAtOVxcLV0rKD86XFwuW2EtekEtWjAtOVxcLV0rKSokLyxcbiAgICAgICAgYWxwaGFSZWdleCA9IC9eW2Etel0rJC9pLFxuICAgICAgICBhbHBoYU51bWVyaWNSZWdleCA9IC9eW2EtejAtOV0rJC9pLFxuICAgICAgICBhbHBoYURhc2hSZWdleCA9IC9eW2EtejAtOV9cXC1dKyQvaSxcbiAgICAgICAgbmF0dXJhbFJlZ2V4ID0gL15bMC05XSskL2ksXG4gICAgICAgIG5hdHVyYWxOb1plcm9SZWdleCA9IC9eWzEtOV1bMC05XSokL2ksXG4gICAgICAgIGlwUmVnZXggPSAvXigoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezN9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pJC9pLFxuICAgICAgICBiYXNlNjRSZWdleCA9IC9bXmEtekEtWjAtOVxcL1xcKz1dL2ksXG4gICAgICAgIG51bWVyaWNEYXNoUmVnZXggPSAvXltcXGRcXC1cXHNdKyQvLFxuICAgICAgICB1cmxSZWdleCA9IC9eKChodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKyl8KSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/JC87XG5cbiAgICAvKlxuICAgICAqIFRoZSBleHBvc2VkIHB1YmxpYyBvYmplY3QgdG8gdmFsaWRhdGUgYSBmb3JtOlxuICAgICAqXG4gICAgICogQHBhcmFtIGZvcm1OYW1lT3JOb2RlIC0gU3RyaW5nIC0gVGhlIG5hbWUgYXR0cmlidXRlIG9mIHRoZSBmb3JtIChpLmUuIDxmb3JtIG5hbWU9XCJteUZvcm1cIj48L2Zvcm0+KSBvciBub2RlIG9mIHRoZSBmb3JtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gZmllbGRzIC0gQXJyYXkgLSBbe1xuICAgICAqICAgICBuYW1lOiBUaGUgbmFtZSBvZiB0aGUgZWxlbWVudCAoaS5lLiA8aW5wdXQgbmFtZT1cIm15RmllbGRcIiAvPilcbiAgICAgKiAgICAgZGlzcGxheTogJ0ZpZWxkIE5hbWUnXG4gICAgICogICAgIHJ1bGVzOiByZXF1aXJlZHxtYXRjaGVzW3Bhc3N3b3JkX2NvbmZpcm1dXG4gICAgICogfV1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBGdW5jdGlvbiAtIFRoZSBjYWxsYmFjayBhZnRlciB2YWxpZGF0aW9uIGhhcyBiZWVuIHBlcmZvcm1lZC5cbiAgICAgKiAgICAgQGFyZ3VtZW50IGVycm9ycyAtIEFuIGFycmF5IG9mIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICogICAgIEBhcmd1bWVudCBldmVudCAtIFRoZSBqYXZhc2NyaXB0IGV2ZW50XG4gICAgICovXG5cblxuICAgIHZhciBGb3JtVmFsaWRhdG9yID0gZnVuY3Rpb24oZm9ybU5hbWVPck5vZGUsIGZpZWxkcywgbGFuZ3VhZ2UsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgaWYodHlwZW9mIGFyZ3VtZW50c1syXSA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgICAgICAgICAvLyBub3QgZXF1YWwgc3RyaW5nIGFuZCBjYW4ndCBmaW5kIGNhbGxiYWNrIGluIHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAgICAvLyBpdCBzaG91bGQgYmUgY2FsbGJhY2sgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbGFuZ3VhZ2U7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGFyZ3VtZW50c1syXS5pbmRleE9mKCd0aGVtZScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIGl0IGlzIGEgc3RyaW5nLCBidXQgZmluZCBjYWxsYmFjayBpbiB0aGUgc3RyaW5nIFxuICAgICAgICAgICAgICAgIC8vIGl0IHNob3VsZCBiZSBhIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBsYW5ndWFnZTtcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IG51bGw7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAyKXtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbFxuICAgICAgICB9IGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaGUgYXJndW1lbnRzIHNob3VsZCBiZSBhdCBsZWFzdCAyJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgfHwgY2FsbGJhY2sgPT0gbnVsbCl7XG4gICAgICAgICAgICBpZihjYWxsYmFjayA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBkZWZhdWx0cy5jYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGRlZmF1bHRzW2NhbGxiYWNrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgICAvLyBkZWZhdWx0IGxhbmd1YWdlIHRvIGVuZ2xpc2hcbiAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlIHx8ICdlbmdsaXNoJztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5maWVsZHMgPSB7fTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5fZm9ybUJ5TmFtZU9yTm9kZShmb3JtTmFtZU9yTm9kZSkgfHwge307XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSB7fTtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBmaWVsZExlbmd0aCA9IGZpZWxkcy5sZW5ndGg7IGkgPCBmaWVsZExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbaV07XG5cbiAgICAgICAgICAgIC8vIElmIHBhc3NlZCBpbiBpbmNvcnJlY3RseSwgd2UgbmVlZCB0byBza2lwIHRoZSBmaWVsZC5cbiAgICAgICAgICAgIGlmICgoIWZpZWxkLm5hbWUgJiYgIWZpZWxkLm5hbWVzKSB8fCAhZmllbGQucnVsZXMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIEJ1aWxkIHRoZSBtYXN0ZXIgZmllbGRzIGFycmF5IHRoYXQgaGFzIGFsbCB0aGUgaW5mb3JtYXRpb24gbmVlZGVkIHRvIHZhbGlkYXRlXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYgKGZpZWxkLm5hbWVzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGZpZWxkTmFtZXNMZW5ndGggPSBmaWVsZC5uYW1lcy5sZW5ndGg7IGogPCBmaWVsZE5hbWVzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkRmllbGQoZmllbGQsIGZpZWxkLm5hbWVzW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEZpZWxkKGZpZWxkLCBmaWVsZC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIEF0dGFjaCBhbiBldmVudCBjYWxsYmFjayBmb3IgdGhlIGZvcm0gc3VibWlzc2lvblxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgX29uc3VibWl0ID0gdGhpcy5mb3JtLm9uc3VibWl0O1xuXG4gICAgICAgIHRoaXMuZm9ybS5vbnN1Ym1pdCA9IChmdW5jdGlvbih0aGF0KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuX3ZhbGlkYXRlRm9ybShldnQpICYmIChfb25zdWJtaXQgPT09IHVuZGVmaW5lZCB8fCBfb25zdWJtaXQoKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgaWYgKChlbGVtZW50Lmxlbmd0aCA+IDApICYmIChlbGVtZW50WzBdLnR5cGUgPT09ICdyYWRpbycgfHwgZWxlbWVudFswXS50eXBlID09PSAnY2hlY2tib3gnKSkge1xuICAgICAgICAgICAgZm9yIChpID0gMCwgZWxlbWVudExlbmd0aCA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgZWxlbWVudExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRbaV0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFtpXVthdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50W2F0dHJpYnV0ZU5hbWVdO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBTZXRzIGEgY3VzdG9tIG1lc3NhZ2UgZm9yIG9uZSBvZiB0aGUgcnVsZXNcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLnNldE1lc3NhZ2UgPSBmdW5jdGlvbihydWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXNbcnVsZV0gPSBtZXNzYWdlO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGlzIGZvciBjaGFpbmluZ1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHVibGljXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZm9yIGEgY3VzdG9tIHJ1bGUgKGkuZS4gY2FsbGJhY2tfdXNlcm5hbWVfY2hlY2spXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5yZWdpc3RlckNhbGxiYWNrID0gZnVuY3Rpb24obmFtZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAobmFtZSAmJiB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgJiYgaGFuZGxlciAmJiB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyc1tuYW1lXSA9IGhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhpcyBmb3IgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGEgZm9ybSBkb20gbm9kZSB3YXMgcGFzc2VkIGluIG9yIGp1c3QgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBmb3JtIG5hbWVcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLl9mb3JtQnlOYW1lT3JOb2RlID0gZnVuY3Rpb24oZm9ybU5hbWVPck5vZGUpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgZm9ybU5hbWVPck5vZGUgPT09ICdvYmplY3QnKSA/IGZvcm1OYW1lT3JOb2RlIDogZG9jdW1lbnQuZm9ybXNbZm9ybU5hbWVPck5vZGVdO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQWRkcyBhIGZpbGUgdG8gdGhlIG1hc3RlciBmaWVsZHMgYXJyYXlcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLl9hZGRGaWVsZCA9IGZ1bmN0aW9uKGZpZWxkLCBuYW1lVmFsdWUpICB7XG4gICAgICAgIHRoaXMuZmllbGRzW25hbWVWYWx1ZV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lVmFsdWUsXG4gICAgICAgICAgICBkaXNwbGF5OiBmaWVsZC5kaXNwbGF5IHx8IG5hbWVWYWx1ZSxcbiAgICAgICAgICAgIHJ1bGVzOiBmaWVsZC5ydWxlcyxcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgY2hlY2tlZDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogUnVucyB0aGUgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZC5cbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLl92YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5maWVsZHNba2V5XSB8fCB7fSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZm9ybVtmaWVsZC5uYW1lXTtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5pZCA9IGF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQsICdpZCcpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC50eXBlID0gKGVsZW1lbnQubGVuZ3RoID4gMCkgPyBlbGVtZW50WzBdLnR5cGUgOiBlbGVtZW50LnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gYXR0cmlidXRlVmFsdWUoZWxlbWVudCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmNoZWNrZWQgPSBhdHRyaWJ1dGVWYWx1ZShlbGVtZW50LCAnY2hlY2tlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAqIFJ1biB0aHJvdWdoIHRoZSBydWxlcyBmb3IgZWFjaCBmaWVsZC5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlRmllbGQoZmllbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLmVycm9ycywgZXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZXZ0ICYmIGV2dC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElFIHVzZXMgdGhlIGdsb2JhbCBldmVudCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIExvb2tzIGF0IHRoZSBmaWVsZHMgdmFsdWUgYW5kIGV2YWx1YXRlcyBpdCBhZ2FpbnN0IHRoZSBnaXZlbiBydWxlc1xuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuX3ZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICB2YXIgcnVsZXMgPSBmaWVsZC5ydWxlcy5zcGxpdCgnfCcpLFxuICAgICAgICAgICAgaW5kZXhPZlJlcXVpcmVkID0gZmllbGQucnVsZXMuaW5kZXhPZigncmVxdWlyZWQnKSxcbiAgICAgICAgICAgIGlzRW1wdHkgPSAoIWZpZWxkLnZhbHVlIHx8IGZpZWxkLnZhbHVlID09PSAnJyB8fCBmaWVsZC52YWx1ZSA9PT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBSdW4gdGhyb3VnaCB0aGUgcnVsZXMgYW5kIGV4ZWN1dGUgdGhlIHZhbGlkYXRpb24gbWV0aG9kcyBhcyBuZWVkZWRcbiAgICAgICAgICovXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJ1bGVMZW5ndGggPSBydWxlcy5sZW5ndGg7IGkgPCBydWxlTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSBydWxlc1tpXSxcbiAgICAgICAgICAgICAgICBwYXJhbSA9IG51bGwsXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgcGFydHMgPSBydWxlUmVnZXguZXhlYyhtZXRob2QpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogSWYgdGhpcyBmaWVsZCBpcyBub3QgcmVxdWlyZWQgYW5kIHRoZSB2YWx1ZSBpcyBlbXB0eSwgY29udGludWUgb24gdG8gdGhlIG5leHQgcnVsZSB1bmxlc3MgaXQncyBhIGNhbGxiYWNrLlxuICAgICAgICAgICAgICogVGhpcyBlbnN1cmVzIHRoYXQgYSBjYWxsYmFjayB3aWxsIGFsd2F5cyBiZSBjYWxsZWQgYnV0IG90aGVyIHJ1bGVzIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAoaW5kZXhPZlJlcXVpcmVkID09PSAtMSAmJiBtZXRob2QuaW5kZXhPZignIWNhbGxiYWNrXycpID09PSAtMSAmJiBpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBJZiB0aGUgcnVsZSBoYXMgYSBwYXJhbWV0ZXIgKGkuZS4gbWF0Y2hlc1twYXJhbV0pIHNwbGl0IGl0IG91dFxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmIChwYXJ0cykge1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgICAgIHBhcmFtID0gcGFydHNbMl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QuY2hhckF0KDApID09PSAnIScpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBtZXRob2Quc3Vic3RyaW5nKDEsIG1ldGhvZC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogSWYgdGhlIGhvb2sgaXMgZGVmaW5lZCwgcnVuIGl0IHRvIGZpbmQgYW55IHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ob29rc1ttZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9ob29rc1ttZXRob2RdLmFwcGx5KHRoaXMsIFtmaWVsZCwgcGFyYW1dKSkge1xuICAgICAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWV0aG9kLnN1YnN0cmluZygwLCA5KSA9PT0gJ2NhbGxiYWNrXycpIHtcbiAgICAgICAgICAgICAgICAvLyBDdXN0b20gbWV0aG9kLiBFeGVjdXRlIHRoZSBoYW5kbGVyIGlmIGl0IHdhcyByZWdpc3RlcmVkXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kLnN1YnN0cmluZyg5LCBtZXRob2QubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVyc1ttZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZXJzW21ldGhvZF0uYXBwbHkodGhpcywgW2ZpZWxkLnZhbHVlLCBwYXJhbV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIElmIHRoZSBob29rIGZhaWxlZCwgYWRkIGEgbWVzc2FnZSB0byB0aGUgZXJyb3JzIGFycmF5XG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYgKGZhaWxlZCkge1xuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgbWVzc2FnZSBmb3IgdGhpcyBydWxlXG4gICAgICAgICAgICAgICAgLy8gXG5cbiAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gdGhpcy5tZXNzYWdlc1ttZXRob2RdIHx8IGRlZmF1bHRzW3RoaXMubGFuZ3VhZ2VdW21ldGhvZF0sXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnQW4gZXJyb3IgaGFzIG9jY3VycmVkIHdpdGggdGhlICcgKyBmaWVsZC5kaXNwbGF5ICsgJyBmaWVsZC4nO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gc291cmNlLnJlcGxhY2UoJyVzJywgZmllbGQuZGlzcGxheSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKCclcycsICh0aGlzLmZpZWxkc1twYXJhbV0pID8gdGhpcy5maWVsZHNbcGFyYW1dLmRpc3BsYXkgOiBwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGZpZWxkLmlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWVsZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBydWxlOiBtZXRob2RcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIEJyZWFrIG91dCBzbyBhcyB0byBub3Qgc3BhbSB3aXRoIHZhbGlkYXRpb24gZXJyb3JzIChpLmUuIHJlcXVpcmVkIGFuZCB2YWxpZF9lbWFpbClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogT2JqZWN0IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSB2YWxpZGF0aW9uIGhvb2tzXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5faG9va3MgPSB7XG4gICAgICAgIHJlcXVpcmVkOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZmllbGQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICgoZmllbGQudHlwZSA9PT0gJ2NoZWNrYm94JykgfHwgKGZpZWxkLnR5cGUgPT09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChmaWVsZC5jaGVja2VkID09PSB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIFwiZGVmYXVsdFwiOiBmdW5jdGlvbihmaWVsZCwgZGVmYXVsdE5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnZhbHVlICE9PSBkZWZhdWx0TmFtZTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYXRjaGVzOiBmdW5jdGlvbihmaWVsZCwgbWF0Y2hOYW1lKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmZvcm1bbWF0Y2hOYW1lXTtcblxuICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLnZhbHVlID09PSBlbC52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX2VtYWlsOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChmaWVsZC52YWx1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfZW1haWxzOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpZWxkLnZhbHVlLnNwbGl0KFwiLFwiKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJlc3VsdExlbmd0aCA9IHJlc3VsdC5sZW5ndGg7IGkgPCByZXN1bHRMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghZW1haWxSZWdleC50ZXN0KHJlc3VsdFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWluX2xlbmd0aDogZnVuY3Rpb24oZmllbGQsIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCFudW1lcmljUmVnZXgudGVzdChsZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGZpZWxkLnZhbHVlLmxlbmd0aCA+PSBwYXJzZUludChsZW5ndGgsIDEwKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWF4X2xlbmd0aDogZnVuY3Rpb24oZmllbGQsIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCFudW1lcmljUmVnZXgudGVzdChsZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGZpZWxkLnZhbHVlLmxlbmd0aCA8PSBwYXJzZUludChsZW5ndGgsIDEwKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXhhY3RfbGVuZ3RoOiBmdW5jdGlvbihmaWVsZCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIW51bWVyaWNSZWdleC50ZXN0KGxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoZmllbGQudmFsdWUubGVuZ3RoID09PSBwYXJzZUludChsZW5ndGgsIDEwKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JlYXRlcl90aGFuOiBmdW5jdGlvbihmaWVsZCwgcGFyYW0pIHtcbiAgICAgICAgICAgIGlmICghZGVjaW1hbFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKHBhcnNlRmxvYXQoZmllbGQudmFsdWUpID4gcGFyc2VGbG9hdChwYXJhbSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxlc3NfdGhhbjogZnVuY3Rpb24oZmllbGQsIHBhcmFtKSB7XG4gICAgICAgICAgICBpZiAoIWRlY2ltYWxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChwYXJzZUZsb2F0KGZpZWxkLnZhbHVlKSA8IHBhcnNlRmxvYXQocGFyYW0pKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbHBoYTogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoYWxwaGFSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxwaGFfbnVtZXJpYzogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoYWxwaGFOdW1lcmljUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFscGhhX2Rhc2g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGFscGhhRGFzaFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBudW1lcmljOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChudW1lcmljUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGludGVnZXI6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGludGVnZXJSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVjaW1hbDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoZGVjaW1hbFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc19uYXR1cmFsOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChuYXR1cmFsUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzX25hdHVyYWxfbm9femVybzogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAobmF0dXJhbE5vWmVyb1JlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF9pcDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXBSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfYmFzZTY0OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChiYXNlNjRSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfdXJsOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuICh1cmxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfY3JlZGl0X2NhcmQ6IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICAgICAgICAgIC8vIEx1aG4gQ2hlY2sgQ29kZSBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzQwNzU1MzNcbiAgICAgICAgICAgIC8vIGFjY2VwdCBvbmx5IGRpZ2l0cywgZGFzaGVzIG9yIHNwYWNlc1xuICAgICAgICAgICAgaWYgKCFudW1lcmljRGFzaFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIFRoZSBMdWhuIEFsZ29yaXRobS4gSXQncyBzbyBwcmV0dHkuXG4gICAgICAgICAgICB2YXIgbkNoZWNrID0gMCwgbkRpZ2l0ID0gMCwgYkV2ZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzdHJpcHBlZEZpZWxkID0gZmllbGQudmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBuID0gc3RyaXBwZWRGaWVsZC5sZW5ndGggLSAxOyBuID49IDA7IG4tLSkge1xuICAgICAgICAgICAgICAgIHZhciBjRGlnaXQgPSBzdHJpcHBlZEZpZWxkLmNoYXJBdChuKTtcbiAgICAgICAgICAgICAgICBuRGlnaXQgPSBwYXJzZUludChjRGlnaXQsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoYkV2ZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChuRGlnaXQgKj0gMikgPiA5KSBuRGlnaXQgLT0gOTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuQ2hlY2sgKz0gbkRpZ2l0O1xuICAgICAgICAgICAgICAgIGJFdmVuID0gIWJFdmVuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKG5DaGVjayAlIDEwKSA9PT0gMDtcbiAgICAgICAgfSxcblxuICAgICAgICBpc19maWxlX3R5cGU6IGZ1bmN0aW9uKGZpZWxkLHR5cGUpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGV4dCA9IGZpZWxkLnZhbHVlLnN1YnN0cigoZmllbGQudmFsdWUubGFzdEluZGV4T2YoJy4nKSArIDEpKSxcbiAgICAgICAgICAgICAgICB0eXBlQXJyYXkgPSB0eXBlLnNwbGl0KCcsJyksXG4gICAgICAgICAgICAgICAgaW5BcnJheSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHR5cGVBcnJheS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4dCA9PSB0eXBlQXJyYXlbaV0pIGluQXJyYXkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5BcnJheTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuRm9ybVZhbGlkYXRvciA9IEZvcm1WYWxpZGF0b3I7XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIl19
(2)
});
