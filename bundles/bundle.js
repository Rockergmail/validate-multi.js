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

    var basic = _dereq_('./themes/basic/basic');
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

        themeBasic: basic
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9ob3dhcmQvRG9jdW1lbnRzL0RhdGFHYXJhZ2UvdmFsaWRhdGUuanMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL2hvd2FyZC9Eb2N1bWVudHMvRGF0YUdhcmFnZS92YWxpZGF0ZS5qcy90aGVtZXMvYmFzaWMvYmFzaWMuanMiLCIvaG9tZS9ob3dhcmQvRG9jdW1lbnRzL0RhdGFHYXJhZ2UvdmFsaWRhdGUuanMvdmFsaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBiYXNpYyA9IGZ1bmN0aW9uKGVycm9ycywgZXZ0KSB7XG4gICAgdmFyIFNFTEVDVE9SX0VSUk9SUyA9ICQoJy5lcnJvcl9ib3gnKSxcbiAgICAgICAgU0VMRUNUT1JfU1VDQ0VTUyA9ICQoJy5zdWNjZXNzX2JveCcpO1xuICAgICAgICBcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgU0VMRUNUT1JfRVJST1JTLmVtcHR5KCk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpID0gMCwgZXJyb3JMZW5ndGggPSBlcnJvcnMubGVuZ3RoOyBpIDwgZXJyb3JMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgU0VMRUNUT1JfRVJST1JTLmFwcGVuZChlcnJvcnNbaV0ubWVzc2FnZSArICc8YnIgLz4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgU0VMRUNUT1JfU1VDQ0VTUy5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIFNFTEVDVE9SX0VSUk9SUy5mYWRlSW4oMjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBTRUxFQ1RPUl9FUlJPUlMuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICAgICAgICBTRUxFQ1RPUl9TVUNDRVNTLmZhZGVJbigyMDApO1xuICAgIH1cbiAgICBcbiAgICBpZiAoZXZ0ICYmIGV2dC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2ljOyIsIi8qXG4gKiB2YWxpZGF0ZS1tdWx0aS5qc1xuICogXG4gKiBvcmlnaW5hbCBmcm9tIDogaHR0cDovL3JpY2toYXJyaXNvbi5naXRodWIuY29tL3ZhbGlkYXRlLmpzXG4gKi9cblxuXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICAgIHZhciBiYXNpYyA9IHJlcXVpcmUoJy4vdGhlbWVzL2Jhc2ljL2Jhc2ljJyk7XG4gICAgLypcbiAgICAgKiBJZiB5b3Ugd291bGQgbGlrZSBhbiBhcHBsaWNhdGlvbi13aWRlIGNvbmZpZywgY2hhbmdlIHRoZXNlIGRlZmF1bHRzLlxuICAgICAqIE90aGVyd2lzZSwgdXNlIHRoZSBzZXRNZXNzYWdlKCkgZnVuY3Rpb24gdG8gY29uZmlndXJlIGZvcm0gc3BlY2lmaWMgbWVzc2FnZXMuXG4gICAgICovXG5cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIGVuZ2xpc2g6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiAnVGhlICVzIGZpZWxkIGlzIHJlcXVpcmVkLicsXG4gICAgICAgICAgICBtYXRjaGVzOiAnVGhlICVzIGZpZWxkIGRvZXMgbm90IG1hdGNoIHRoZSAlcyBmaWVsZC4nLFxuICAgICAgICAgICAgXCJkZWZhdWx0XCI6ICdUaGUgJXMgZmllbGQgaXMgc3RpbGwgc2V0IHRvIGRlZmF1bHQsIHBsZWFzZSBjaGFuZ2UuJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsczogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYWxsIHZhbGlkIGVtYWlsIGFkZHJlc3Nlcy4nLFxuICAgICAgICAgICAgbWluX2xlbmd0aDogJ1RoZSAlcyBmaWVsZCBtdXN0IGJlIGF0IGxlYXN0ICVzIGNoYXJhY3RlcnMgaW4gbGVuZ3RoLicsXG4gICAgICAgICAgICBtYXhfbGVuZ3RoOiAnVGhlICVzIGZpZWxkIG11c3Qgbm90IGV4Y2VlZCAlcyBjaGFyYWN0ZXJzIGluIGxlbmd0aC4nLFxuICAgICAgICAgICAgZXhhY3RfbGVuZ3RoOiAnVGhlICVzIGZpZWxkIG11c3QgYmUgZXhhY3RseSAlcyBjaGFyYWN0ZXJzIGluIGxlbmd0aC4nLFxuICAgICAgICAgICAgZ3JlYXRlcl90aGFuOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIG51bWJlciBncmVhdGVyIHRoYW4gJXMuJyxcbiAgICAgICAgICAgIGxlc3NfdGhhbjogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSBudW1iZXIgbGVzcyB0aGFuICVzLicsXG4gICAgICAgICAgICBhbHBoYTogJ1RoZSAlcyBmaWVsZCBtdXN0IG9ubHkgY29udGFpbiBhbHBoYWJldGljYWwgY2hhcmFjdGVycy4nLFxuICAgICAgICAgICAgYWxwaGFfbnVtZXJpYzogJ1RoZSAlcyBmaWVsZCBtdXN0IG9ubHkgY29udGFpbiBhbHBoYS1udW1lcmljIGNoYXJhY3RlcnMuJyxcbiAgICAgICAgICAgIGFscGhhX2Rhc2g6ICdUaGUgJXMgZmllbGQgbXVzdCBvbmx5IGNvbnRhaW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJzLCB1bmRlcnNjb3JlcywgYW5kIGRhc2hlcy4nLFxuICAgICAgICAgICAgbnVtZXJpYzogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gb25seSBudW1iZXJzLicsXG4gICAgICAgICAgICBpbnRlZ2VyOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhbiBpbnRlZ2VyLicsXG4gICAgICAgICAgICBkZWNpbWFsOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIGRlY2ltYWwgbnVtYmVyLicsXG4gICAgICAgICAgICBpc19uYXR1cmFsOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBvbmx5IHBvc2l0aXZlIG51bWJlcnMuJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWxfbm9femVybzogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSBudW1iZXIgZ3JlYXRlciB0aGFuIHplcm8uJyxcbiAgICAgICAgICAgIHZhbGlkX2lwOiAnVGhlICVzIGZpZWxkIG11c3QgY29udGFpbiBhIHZhbGlkIElQLicsXG4gICAgICAgICAgICB2YWxpZF9iYXNlNjQ6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgYmFzZTY0IHN0cmluZy4nLFxuICAgICAgICAgICAgdmFsaWRfY3JlZGl0X2NhcmQ6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIGEgdmFsaWQgY3JlZGl0IGNhcmQgbnVtYmVyLicsXG4gICAgICAgICAgICBpc19maWxlX3R5cGU6ICdUaGUgJXMgZmllbGQgbXVzdCBjb250YWluIG9ubHkgJXMgZmlsZXMuJyxcbiAgICAgICAgICAgIHZhbGlkX3VybDogJ1RoZSAlcyBmaWVsZCBtdXN0IGNvbnRhaW4gYSB2YWxpZCBVUkwuJ1xuICAgICAgICB9LFxuICAgICAgICBjaGluZXNlX3poOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogJ+iri+i8uOWFpSAlcyDmrITkvY3jgIInLFxuICAgICAgICAgICAgbWF0Y2hlczogJ+S9oOeahCAlcyDmrITkvY3oiIcgJXMg5qyE5L2N5LiN56ym44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2VtYWlsOiAn6KuL5aGr5LiK5pyJ5pWI55qEICVzICcsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbHM6ICfoq4vloavkuIrmnInmlYjnmoQgJXMgJyxcbiAgICAgICAgICAgIG1pbl9sZW5ndGg6ICfkvaDnmoQgJXMg5b+F6aCI6Iez5bCR5aGr5ru/ICVzIOWAi+Wtl+WFg+OAgicsXG4gICAgICAgICAgICBtYXhfbGVuZ3RoOiAn5L2g55qEICVzIOW/hemgiOS4jeiDvei2hemBjiAlcyDlgIvlrZflhYPjgIInLFxuICAgICAgICAgICAgZXhhY3RfbGVuZ3RoOiAn5L2g55qEICVzIOW/hemgiOWJm+WlveimgSAlcyDlgIvlrZflhYPjgIInLFxuICAgICAgICAgICAgZ3JlYXRlcl90aGFuOiAn5L2g55qEICVzIOW/hemgiOimgeacieWAi+Wkp+aWvCAlcyDnmoTmlbjlrZfjgIInLFxuICAgICAgICAgICAgbGVzc190aGFuOiAn5L2g55qEICVzIOW/hemgiOimgeacieWAi+Wwj+aWvCAlcyDnmoTmlbjlrZfjgIInLFxuICAgICAgICAgICAgYWxwaGE6ICfkvaDnmoQgJXMg5b+F6aCI5Y+q5pyJ6Iux5paH5a2X5q+N44CCJyxcbiAgICAgICAgICAgIGFscGhhX251bWVyaWM6ICfkvaDnmoQgJXMg5b+F6aCI5Y+q5pyJ6Iux5paH5a2X5q+N5oiW5pW45a2X44CCJyxcbiAgICAgICAgICAgIGFscGhhX2Rhc2g6ICfkvaDnmoQgJXMg5Y+q5Y+v5Lul5piv6Iux5paH5a2X5q+N44CB5pW45a2X44CB5bqV57ea5oiW56C05oqY6Jmf44CCJyxcbiAgICAgICAgICAgIG51bWVyaWM6ICfkvaDnmoQgJXMg5b+F6aCI5Y+q5pyJ5pW45a2X44CCJyxcbiAgICAgICAgICAgIGludGVnZXI6ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCL5pW05pW444CCJyxcbiAgICAgICAgICAgIGRlY2ltYWw6ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCL5bCP5pW46bue44CCJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWw6ICfkvaDnmoQgJXMg5b+F6aCI5Y+q5pyJ5q2j5pW444CCJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWxfbm9femVybzogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIvlpKfmlrzpm7bnmoTmlbjlrZfjgIInLFxuICAgICAgICAgICAgdmFsaWRfaXA6ICfkvaDnmoQgJXMg5b+F6aCI5piv5YCL5pyJ5pWI55qEIElQ44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2Jhc2U2NDogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIsgYmFzZTY0IOWtl+S4suOAgicsXG4gICAgICAgICAgICB2YWxpZF9jcmVkaXRfY2FyZDogJ+S9oOeahCAlcyDlv4XpoIjmmK/lgIvmnInmlYjnmoTkv6HnlKjljaHomZ/norzjgIInLFxuICAgICAgICAgICAgaXNfZmlsZV90eXBlOiAn5L2g55qEICVzIOashOS9jeW/hemgiOimgeS4gOWAiyAlcyDnmoTmqpTmoYjjgIInLFxuICAgICAgICAgICAgdmFsaWRfdXJsOiAn5L2g55qEICVzIOW/hemgiOaYr+imgeS4gOWAi+acieaViOeahCBVUkzjgIInXG4gICAgICAgIH0sXG4gICAgICAgIGNoaW5lc2U6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiAnJXMg5LiN6IO95Li656m644CCJyxcbiAgICAgICAgICAgIG1hdGNoZXM6ICcgJXMg5LiOICVzIOi+k+WFpeS4jeS4gOiHtOOAgicsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbDogJyVzIOi+k+WFpeaXoOaViCcsXG4gICAgICAgICAgICB2YWxpZF9lbWFpbHM6ICclcyDovpPlhaXml6DmlYgnLFxuICAgICAgICAgICAgbWluX2xlbmd0aDogJyVzIOiHs+WwkSAlcyDkuKrlrZfnrKbjgIInLFxuICAgICAgICAgICAgbWF4X2xlbmd0aDogJyVzIOacgOWkmiAlcyDkuKrlrZfnrKbjgIInLFxuICAgICAgICAgICAgZXhhY3RfbGVuZ3RoOiAnJXMg5Y+q6IO9ICVzIOS4quWtl+espuOAgicsXG4gICAgICAgICAgICBncmVhdGVyX3RoYW46ICclcyDlv4XpobvmmK/lpKfkuo4gJXMg55qE5pWw5a2X44CCJyxcbiAgICAgICAgICAgIGxlc3NfdGhhbjogJyVzIOW/hemhu+aYr+Wwj+S6jiAlcyDnmoTmlbDlrZfjgIInLFxuICAgICAgICAgICAgYWxwaGE6ICclcyDlv4XpobvmmK/oi7HmloflrZfmr43jgIInLFxuICAgICAgICAgICAgYWxwaGFfbnVtZXJpYzogJ+S9oOeahCAlcyDlv4XpoIjlj6rmnInoi7HmloflrZfmr43miJbmlbjlrZfjgIInLFxuICAgICAgICAgICAgYWxwaGFfZGFzaDogJyVzIOWPquiDveaYr+iLseaWh+Wtl+avjeOAgeaVsOWtl+OAgeS4i+WIkue6v+WSjOaoque6vycsXG4gICAgICAgICAgICBudW1lcmljOiAnJXMg5Y+q6IO95piv5pWw5a2X44CCJyxcbiAgICAgICAgICAgIGludGVnZXI6ICclcyDlj6rog73mmK/mlbTmlbDjgIInLFxuICAgICAgICAgICAgZGVjaW1hbDogJyVzIOW/hemhu+aYr+Wwj+aVsOOAgicsXG4gICAgICAgICAgICBpc19uYXR1cmFsOiAnJXMg5b+F6aG75piv5q2j5pWw44CCJyxcbiAgICAgICAgICAgIGlzX25hdHVyYWxfbm9femVybzogJyVzIOW/hemhu+aYr+Wkp+S6jumbtueahOaVsOWtl+OAgicsXG4gICAgICAgICAgICB2YWxpZF9pcDogJyVzIOW/hemhu+aYr+acieaViOeahElQ44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2Jhc2U2NDogJyVzIOW/hemhu+aYryBiYXNlNjQg5a2X56ym44CCJyxcbiAgICAgICAgICAgIHZhbGlkX2NyZWRpdF9jYXJkOiAnJXMg5b+F6aG75piv5pyJ5pWI55qE5L+h55So5Y2h5Y+344CCJyxcbiAgICAgICAgICAgIGlzX2ZpbGVfdHlwZTogJyVzIOWPquiDveaYryAlcyDnmoTmlofku7bjgIInLFxuICAgICAgICAgICAgdmFsaWRfdXJsOiAnJXMg5b+F6aG75piv5pyJ5pWI55qEIFVSTOOAgidcbiAgICAgICAgfSxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0aGVtZUJhc2ljOiBiYXNpY1xuICAgIH07XG5cblxuICAgIC8qXG4gICAgICogRGVmaW5lIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgd2lsbCBiZSB1c2VkXG4gICAgICovXG5cbiAgICB2YXIgcnVsZVJlZ2V4ID0gL14oLis/KVxcWyguKylcXF0kLyxcbiAgICAgICAgbnVtZXJpY1JlZ2V4ID0gL15bMC05XSskLyxcbiAgICAgICAgaW50ZWdlclJlZ2V4ID0gL15cXC0/WzAtOV0rJC8sXG4gICAgICAgIGRlY2ltYWxSZWdleCA9IC9eXFwtP1swLTldKlxcLj9bMC05XSskLyxcbiAgICAgICAgZW1haWxSZWdleCA9IC9eW2EtekEtWjAtOS4hIyQlJmFtcDsnKitcXC1cXC89P1xcXl9ge3x9flxcLV0rQFthLXpBLVowLTlcXC1dKyg/OlxcLlthLXpBLVowLTlcXC1dKykqJC8sXG4gICAgICAgIGFscGhhUmVnZXggPSAvXlthLXpdKyQvaSxcbiAgICAgICAgYWxwaGFOdW1lcmljUmVnZXggPSAvXlthLXowLTldKyQvaSxcbiAgICAgICAgYWxwaGFEYXNoUmVnZXggPSAvXlthLXowLTlfXFwtXSskL2ksXG4gICAgICAgIG5hdHVyYWxSZWdleCA9IC9eWzAtOV0rJC9pLFxuICAgICAgICBuYXR1cmFsTm9aZXJvUmVnZXggPSAvXlsxLTldWzAtOV0qJC9pLFxuICAgICAgICBpcFJlZ2V4ID0gL14oKDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFwuKXszfSgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KSQvaSxcbiAgICAgICAgYmFzZTY0UmVnZXggPSAvW15hLXpBLVowLTlcXC9cXCs9XS9pLFxuICAgICAgICBudW1lcmljRGFzaFJlZ2V4ID0gL15bXFxkXFwtXFxzXSskLyxcbiAgICAgICAgdXJsUmVnZXggPSAvXigoaHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspfCkoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPyQvO1xuXG4gICAgLypcbiAgICAgKiBUaGUgZXhwb3NlZCBwdWJsaWMgb2JqZWN0IHRvIHZhbGlkYXRlIGEgZm9ybTpcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmb3JtTmFtZU9yTm9kZSAtIFN0cmluZyAtIFRoZSBuYW1lIGF0dHJpYnV0ZSBvZiB0aGUgZm9ybSAoaS5lLiA8Zm9ybSBuYW1lPVwibXlGb3JtXCI+PC9mb3JtPikgb3Igbm9kZSBvZiB0aGUgZm9ybSBlbGVtZW50XG4gICAgICogQHBhcmFtIGZpZWxkcyAtIEFycmF5IC0gW3tcbiAgICAgKiAgICAgbmFtZTogVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgKGkuZS4gPGlucHV0IG5hbWU9XCJteUZpZWxkXCIgLz4pXG4gICAgICogICAgIGRpc3BsYXk6ICdGaWVsZCBOYW1lJ1xuICAgICAqICAgICBydWxlczogcmVxdWlyZWR8bWF0Y2hlc1twYXNzd29yZF9jb25maXJtXVxuICAgICAqIH1dXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIC0gRnVuY3Rpb24gLSBUaGUgY2FsbGJhY2sgYWZ0ZXIgdmFsaWRhdGlvbiBoYXMgYmVlbiBwZXJmb3JtZWQuXG4gICAgICogICAgIEBhcmd1bWVudCBlcnJvcnMgLSBBbiBhcnJheSBvZiB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAqICAgICBAYXJndW1lbnQgZXZlbnQgLSBUaGUgamF2YXNjcmlwdCBldmVudFxuICAgICAqL1xuXG5cbiAgICB2YXIgRm9ybVZhbGlkYXRvciA9IGZ1bmN0aW9uKGZvcm1OYW1lT3JOb2RlLCBmaWVsZHMsIGxhbmd1YWdlLCBjYWxsYmFjaykge1xuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBhcmd1bWVudHNbMl0gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IGVxdWFsIHN0cmluZyBhbmQgY2FuJ3QgZmluZCBjYWxsYmFjayBpbiB0aGUgc3RyaW5nXG4gICAgICAgICAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGNhbGxiYWNrIHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGxhbmd1YWdlO1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZihhcmd1bWVudHNbMl0uaW5kZXhPZigndGhlbWUnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBpdCBpcyBhIHN0cmluZywgYnV0IGZpbmQgY2FsbGJhY2sgaW4gdGhlIHN0cmluZyBcbiAgICAgICAgICAgICAgICAvLyBpdCBzaG91bGQgYmUgYSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbGFuZ3VhZ2U7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBudWxsOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT0gMil7XG4gICAgICAgICAgICBsYW5ndWFnZSA9IG51bGw7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG51bGxcbiAgICAgICAgfSBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVGhlIGFyZ3VtZW50cyBzaG91bGQgYmUgYXQgbGVhc3QgMicpXG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnIHx8IGNhbGxiYWNrID09IG51bGwpe1xuICAgICAgICAgICAgaWYoY2FsbGJhY2sgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gZGVmYXVsdHMuY2FsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBkZWZhdWx0c1tjYWxsYmFja107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGVmYXVsdCBsYW5ndWFnZSB0byBlbmdsaXNoXG4gICAgICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZSB8fCAnZW5nbGlzaCc7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuZmllbGRzID0ge307XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuX2Zvcm1CeU5hbWVPck5vZGUoZm9ybU5hbWVPck5vZGUpIHx8IHt9O1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0ge307XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgZmllbGRMZW5ndGggPSBmaWVsZHMubGVuZ3RoOyBpIDwgZmllbGRMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2ldO1xuXG4gICAgICAgICAgICAvLyBJZiBwYXNzZWQgaW4gaW5jb3JyZWN0bHksIHdlIG5lZWQgdG8gc2tpcCB0aGUgZmllbGQuXG4gICAgICAgICAgICBpZiAoKCFmaWVsZC5uYW1lICYmICFmaWVsZC5uYW1lcykgfHwgIWZpZWxkLnJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBCdWlsZCB0aGUgbWFzdGVyIGZpZWxkcyBhcnJheSB0aGF0IGhhcyBhbGwgdGhlIGluZm9ybWF0aW9uIG5lZWRlZCB0byB2YWxpZGF0ZVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmIChmaWVsZC5uYW1lcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBmaWVsZE5hbWVzTGVuZ3RoID0gZmllbGQubmFtZXMubGVuZ3RoOyBqIDwgZmllbGROYW1lc0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZEZpZWxkKGZpZWxkLCBmaWVsZC5uYW1lc1tqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRGaWVsZChmaWVsZCwgZmllbGQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgKiBBdHRhY2ggYW4gZXZlbnQgY2FsbGJhY2sgZm9yIHRoZSBmb3JtIHN1Ym1pc3Npb25cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIF9vbnN1Ym1pdCA9IHRoaXMuZm9ybS5vbnN1Ym1pdDtcblxuICAgICAgICB0aGlzLmZvcm0ub25zdWJtaXQgPSAoZnVuY3Rpb24odGhhdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Ll92YWxpZGF0ZUZvcm0oZXZ0KSAmJiAoX29uc3VibWl0ID09PSB1bmRlZmluZWQgfHwgX29uc3VibWl0KCkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpO1xuICAgIH0sXG5cbiAgICBhdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGlmICgoZWxlbWVudC5sZW5ndGggPiAwKSAmJiAoZWxlbWVudFswXS50eXBlID09PSAncmFkaW8nIHx8IGVsZW1lbnRbMF0udHlwZSA9PT0gJ2NoZWNrYm94JykpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGVsZW1lbnRMZW5ndGggPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGVsZW1lbnRMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50W2ldLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRbaV1bYXR0cmlidXRlTmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudFthdHRyaWJ1dGVOYW1lXTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHVibGljXG4gICAgICogU2V0cyBhIGN1c3RvbSBtZXNzYWdlIGZvciBvbmUgb2YgdGhlIHJ1bGVzXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5zZXRNZXNzYWdlID0gZnVuY3Rpb24ocnVsZSwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzW3J1bGVdID0gbWVzc2FnZTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcyBmb3IgY2hhaW5pbmdcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHB1YmxpY1xuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIGZvciBhIGN1c3RvbSBydWxlIChpLmUuIGNhbGxiYWNrX3VzZXJuYW1lX2NoZWNrKVxuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUucmVnaXN0ZXJDYWxsYmFjayA9IGZ1bmN0aW9uKG5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnICYmIGhhbmRsZXIgJiYgdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbbmFtZV0gPSBoYW5kbGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMgZm9yIGNoYWluaW5nXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogRGV0ZXJtaW5lcyBpZiBhIGZvcm0gZG9tIG5vZGUgd2FzIHBhc3NlZCBpbiBvciBqdXN0IGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZm9ybSBuYW1lXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5fZm9ybUJ5TmFtZU9yTm9kZSA9IGZ1bmN0aW9uKGZvcm1OYW1lT3JOb2RlKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIGZvcm1OYW1lT3JOb2RlID09PSAnb2JqZWN0JykgPyBmb3JtTmFtZU9yTm9kZSA6IGRvY3VtZW50LmZvcm1zW2Zvcm1OYW1lT3JOb2RlXTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEFkZHMgYSBmaWxlIHRvIHRoZSBtYXN0ZXIgZmllbGRzIGFycmF5XG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5fYWRkRmllbGQgPSBmdW5jdGlvbihmaWVsZCwgbmFtZVZhbHVlKSAge1xuICAgICAgICB0aGlzLmZpZWxkc1tuYW1lVmFsdWVdID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZVZhbHVlLFxuICAgICAgICAgICAgZGlzcGxheTogZmllbGQuZGlzcGxheSB8fCBuYW1lVmFsdWUsXG4gICAgICAgICAgICBydWxlczogZmllbGQucnVsZXMsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIGNoZWNrZWQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFJ1bnMgdGhlIHZhbGlkYXRpb24gd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQuXG4gICAgICovXG5cbiAgICBGb3JtVmFsaWRhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuZmllbGRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmllbGRzW2tleV0gfHwge30sXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZvcm1bZmllbGQubmFtZV07XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuaWQgPSBhdHRyaWJ1dGVWYWx1ZShlbGVtZW50LCAnaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQudHlwZSA9IChlbGVtZW50Lmxlbmd0aCA+IDApID8gZWxlbWVudFswXS50eXBlIDogZWxlbWVudC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC52YWx1ZSA9IGF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQsICd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5jaGVja2VkID0gYXR0cmlidXRlVmFsdWUoZWxlbWVudCwgJ2NoZWNrZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgKiBSdW4gdGhyb3VnaCB0aGUgcnVsZXMgZm9yIGVhY2ggZmllbGQuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0ZUZpZWxkKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5lcnJvcnMsIGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGV2dCAmJiBldnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJRSB1c2VzIHRoZSBnbG9iYWwgZXZlbnQgdmFyaWFibGVcbiAgICAgICAgICAgICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBMb29rcyBhdCB0aGUgZmllbGRzIHZhbHVlIGFuZCBldmFsdWF0ZXMgaXQgYWdhaW5zdCB0aGUgZ2l2ZW4gcnVsZXNcbiAgICAgKi9cblxuICAgIEZvcm1WYWxpZGF0b3IucHJvdG90eXBlLl92YWxpZGF0ZUZpZWxkID0gZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgdmFyIHJ1bGVzID0gZmllbGQucnVsZXMuc3BsaXQoJ3wnKSxcbiAgICAgICAgICAgIGluZGV4T2ZSZXF1aXJlZCA9IGZpZWxkLnJ1bGVzLmluZGV4T2YoJ3JlcXVpcmVkJyksXG4gICAgICAgICAgICBpc0VtcHR5ID0gKCFmaWVsZC52YWx1ZSB8fCBmaWVsZC52YWx1ZSA9PT0gJycgfHwgZmllbGQudmFsdWUgPT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogUnVuIHRocm91Z2ggdGhlIHJ1bGVzIGFuZCBleGVjdXRlIHRoZSB2YWxpZGF0aW9uIG1ldGhvZHMgYXMgbmVlZGVkXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBydWxlTGVuZ3RoID0gcnVsZXMubGVuZ3RoOyBpIDwgcnVsZUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gcnVsZXNbaV0sXG4gICAgICAgICAgICAgICAgcGFyYW0gPSBudWxsLFxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhcnRzID0gcnVsZVJlZ2V4LmV4ZWMobWV0aG9kKTtcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIElmIHRoaXMgZmllbGQgaXMgbm90IHJlcXVpcmVkIGFuZCB0aGUgdmFsdWUgaXMgZW1wdHksIGNvbnRpbnVlIG9uIHRvIHRoZSBuZXh0IHJ1bGUgdW5sZXNzIGl0J3MgYSBjYWxsYmFjay5cbiAgICAgICAgICAgICAqIFRoaXMgZW5zdXJlcyB0aGF0IGEgY2FsbGJhY2sgd2lsbCBhbHdheXMgYmUgY2FsbGVkIGJ1dCBvdGhlciBydWxlcyB3aWxsIGJlIHNraXBwZWQuXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYgKGluZGV4T2ZSZXF1aXJlZCA9PT0gLTEgJiYgbWV0aG9kLmluZGV4T2YoJyFjYWxsYmFja18nKSA9PT0gLTEgJiYgaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogSWYgdGhlIHJ1bGUgaGFzIGEgcGFyYW1ldGVyIChpLmUuIG1hdGNoZXNbcGFyYW1dKSBzcGxpdCBpdCBvdXRcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBpZiAocGFydHMpIHtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgICAgICBwYXJhbSA9IHBhcnRzWzJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWV0aG9kLmNoYXJBdCgwKSA9PT0gJyEnKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kLnN1YnN0cmluZygxLCBtZXRob2QubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIElmIHRoZSBob29rIGlzIGRlZmluZWQsIHJ1biBpdCB0byBmaW5kIGFueSB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5faG9va3NbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faG9va3NbbWV0aG9kXS5hcHBseSh0aGlzLCBbZmllbGQsIHBhcmFtXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZC5zdWJzdHJpbmcoMCwgOSkgPT09ICdjYWxsYmFja18nKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3VzdG9tIG1ldGhvZC4gRXhlY3V0ZSB0aGUgaGFuZGxlciBpZiBpdCB3YXMgcmVnaXN0ZXJlZFxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1ldGhvZC5zdWJzdHJpbmcoOSwgbWV0aG9kLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuaGFuZGxlcnNbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1ttZXRob2RdLmFwcGx5KHRoaXMsIFtmaWVsZC52YWx1ZSwgcGFyYW1dKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBJZiB0aGUgaG9vayBmYWlsZWQsIGFkZCBhIG1lc3NhZ2UgdG8gdGhlIGVycm9ycyBhcnJheVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhIG1lc3NhZ2UgZm9yIHRoaXMgcnVsZVxuICAgICAgICAgICAgICAgIC8vIFxuXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMubWVzc2FnZXNbbWV0aG9kXSB8fCBkZWZhdWx0c1t0aGlzLmxhbmd1YWdlXVttZXRob2RdLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0FuIGVycm9yIGhhcyBvY2N1cnJlZCB3aXRoIHRoZSAnICsgZmllbGQuZGlzcGxheSArICcgZmllbGQuJztcblxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IHNvdXJjZS5yZXBsYWNlKCclcycsIGZpZWxkLmRpc3BsYXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgnJXMnLCAodGhpcy5maWVsZHNbcGFyYW1dKSA/IHRoaXMuZmllbGRzW3BhcmFtXS5kaXNwbGF5IDogcGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBmaWVsZC5pZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmllbGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgcnVsZTogbWV0aG9kXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBCcmVhayBvdXQgc28gYXMgdG8gbm90IHNwYW0gd2l0aCB2YWxpZGF0aW9uIGVycm9ycyAoaS5lLiByZXF1aXJlZCBhbmQgdmFsaWRfZW1haWwpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIE9iamVjdCBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsaWRhdGlvbiBob29rc1xuICAgICAqL1xuXG4gICAgRm9ybVZhbGlkYXRvci5wcm90b3R5cGUuX2hvb2tzID0ge1xuICAgICAgICByZXF1aXJlZDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZpZWxkLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoKGZpZWxkLnR5cGUgPT09ICdjaGVja2JveCcpIHx8IChmaWVsZC50eXBlID09PSAncmFkaW8nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZmllbGQuY2hlY2tlZCA9PT0gdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBcImRlZmF1bHRcIjogZnVuY3Rpb24oZmllbGQsIGRlZmF1bHROYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWx1ZSAhPT0gZGVmYXVsdE5hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWF0Y2hlczogZnVuY3Rpb24oZmllbGQsIG1hdGNoTmFtZSkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5mb3JtW21hdGNoTmFtZV07XG5cbiAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWx1ZSA9PT0gZWwudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWxpZF9lbWFpbDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX2VtYWlsczogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWVsZC52YWx1ZS5zcGxpdChcIixcIik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByZXN1bHRMZW5ndGggPSByZXN1bHQubGVuZ3RoOyBpIDwgcmVzdWx0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVtYWlsUmVnZXgudGVzdChyZXN1bHRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1pbl9sZW5ndGg6IGZ1bmN0aW9uKGZpZWxkLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghbnVtZXJpY1JlZ2V4LnRlc3QobGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChmaWVsZC52YWx1ZS5sZW5ndGggPj0gcGFyc2VJbnQobGVuZ3RoLCAxMCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1heF9sZW5ndGg6IGZ1bmN0aW9uKGZpZWxkLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghbnVtZXJpY1JlZ2V4LnRlc3QobGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChmaWVsZC52YWx1ZS5sZW5ndGggPD0gcGFyc2VJbnQobGVuZ3RoLCAxMCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGV4YWN0X2xlbmd0aDogZnVuY3Rpb24oZmllbGQsIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCFudW1lcmljUmVnZXgudGVzdChsZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKGZpZWxkLnZhbHVlLmxlbmd0aCA9PT0gcGFyc2VJbnQobGVuZ3RoLCAxMCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdyZWF0ZXJfdGhhbjogZnVuY3Rpb24oZmllbGQsIHBhcmFtKSB7XG4gICAgICAgICAgICBpZiAoIWRlY2ltYWxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChwYXJzZUZsb2F0KGZpZWxkLnZhbHVlKSA+IHBhcnNlRmxvYXQocGFyYW0pKTtcbiAgICAgICAgfSxcblxuICAgICAgICBsZXNzX3RoYW46IGZ1bmN0aW9uKGZpZWxkLCBwYXJhbSkge1xuICAgICAgICAgICAgaWYgKCFkZWNpbWFsUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAocGFyc2VGbG9hdChmaWVsZC52YWx1ZSkgPCBwYXJzZUZsb2F0KHBhcmFtKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxwaGE6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGFscGhhUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFscGhhX251bWVyaWM6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGFscGhhTnVtZXJpY1JlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhbHBoYV9kYXNoOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChhbHBoYURhc2hSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbnVtZXJpYzogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAobnVtZXJpY1JlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnRlZ2VyOiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIChpbnRlZ2VyUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlY2ltYWw6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGRlY2ltYWxSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNfbmF0dXJhbDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAobmF0dXJhbFJlZ2V4LnRlc3QoZmllbGQudmFsdWUpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc19uYXR1cmFsX25vX3plcm86IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5hdHVyYWxOb1plcm9SZWdleC50ZXN0KGZpZWxkLnZhbHVlKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRfaXA6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gKGlwUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX2Jhc2U2NDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAoYmFzZTY0UmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX3VybDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodXJsUmVnZXgudGVzdChmaWVsZC52YWx1ZSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbGlkX2NyZWRpdF9jYXJkOiBmdW5jdGlvbihmaWVsZCl7XG4gICAgICAgICAgICAvLyBMdWhuIENoZWNrIENvZGUgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS80MDc1NTMzXG4gICAgICAgICAgICAvLyBhY2NlcHQgb25seSBkaWdpdHMsIGRhc2hlcyBvciBzcGFjZXNcbiAgICAgICAgICAgIGlmICghbnVtZXJpY0Rhc2hSZWdleC50ZXN0KGZpZWxkLnZhbHVlKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBUaGUgTHVobiBBbGdvcml0aG0uIEl0J3Mgc28gcHJldHR5LlxuICAgICAgICAgICAgdmFyIG5DaGVjayA9IDAsIG5EaWdpdCA9IDAsIGJFdmVuID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc3RyaXBwZWRGaWVsZCA9IGZpZWxkLnZhbHVlLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgbiA9IHN0cmlwcGVkRmllbGQubGVuZ3RoIC0gMTsgbiA+PSAwOyBuLS0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY0RpZ2l0ID0gc3RyaXBwZWRGaWVsZC5jaGFyQXQobik7XG4gICAgICAgICAgICAgICAgbkRpZ2l0ID0gcGFyc2VJbnQoY0RpZ2l0LCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGJFdmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgobkRpZ2l0ICo9IDIpID4gOSkgbkRpZ2l0IC09IDk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbkNoZWNrICs9IG5EaWdpdDtcbiAgICAgICAgICAgICAgICBiRXZlbiA9ICFiRXZlbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChuQ2hlY2sgJSAxMCkgPT09IDA7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNfZmlsZV90eXBlOiBmdW5jdGlvbihmaWVsZCx0eXBlKSB7XG4gICAgICAgICAgICBpZiAoZmllbGQudHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBleHQgPSBmaWVsZC52YWx1ZS5zdWJzdHIoKGZpZWxkLnZhbHVlLmxhc3RJbmRleE9mKCcuJykgKyAxKSksXG4gICAgICAgICAgICAgICAgdHlwZUFycmF5ID0gdHlwZS5zcGxpdCgnLCcpLFxuICAgICAgICAgICAgICAgIGluQXJyYXkgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gPSB0eXBlQXJyYXkubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChleHQgPT0gdHlwZUFycmF5W2ldKSBpbkFycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGluQXJyYXk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LkZvcm1WYWxpZGF0b3IgPSBGb3JtVmFsaWRhdG9yO1xuXG59KSh3aW5kb3csIGRvY3VtZW50KTtcbiJdfQ==
(2)
});
