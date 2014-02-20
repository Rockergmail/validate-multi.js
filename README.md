# validate-multi.js

Lightweight JavaScript form validation library with multi languages and themes. And `validate.js` is original from https://github.com/rickharrison/validate.js

## Features

- Validate form fields from over a dozen rules
- No dependencies
- Customizable Messages
- Supply your own validation callbacks for custom rules
- Chainable customization methods for ease of declaration
- Works in all major browsers, (even IE6!)
- Modeled off the CodeIgniter form validation API
- Support multipule language. Now avaliable (Fork and add yours in https://github.com/chilijung/validate-multi.js/blob/master/validate.js#L17)

	- chinese
	- chinese_zh
	- english

- Supporting multiple themes: Now avaliable

	- callbackBasic

## Installation

You can find minified file in `dist` folder.

``` 
   <script type="text/javascript" src="bundle.min.js"></script>
```

or you can also use the unminified file in `bundles` folder.

```   
   <script type="text/javascript" src="bundle.js"></script>
```

## How to use

### Parameters 

REFERENCE : http://rickharrison.github.io/validate.js/

	- formName : `must` `string` The form name of the form.
	- fields : `must` `array` field settings see details in http://rickharrison.github.io/validate.js/
	- language : `optional` `string` now support `chinese`, chinese_zh`, `english`
	- callback : `optional` `string | function`  we support some themes that you could use. The default theme is `callbackBasic`, you can also use your customize callback for example `function(errors){}`, `errors` will be an array that contains the errors occurs in the fields.

``` javascript
    var validator = new FormValidator('example_form', [{
        name: 'req',
        display: 'required',    
        rules: 'required'
    }, {
        name: 'alphanumeric',
        rules: 'alpha_numeric'
    }, {
        name: 'password',
        rules: 'required'
    }, {
        name: 'password_confirm',
        display: 'password confirmation',
        rules: 'required|matches[password]'
    }, {
        name: 'email',
        rules: 'valid_email'
    }, {
        name: 'minlength',
        display: 'min length',
        rules: 'min_length[8]'
    }]
    , 'english' // this is optional, if there is no specific language, it will default to `english`
    , function(errors) {
        if (errors.length > 0) {
            // Show the errors
	    // here will return the error messages in an array.
        }
    } // callback is now also optional too, the default theme is `callbackBasic`.
    );

```

## Themes

- callbackBasic


## Develop

```
npm install
```

### Bundle

And we are using `browserify` and `watchify` to export and include the files. For building a new `bundle.js`, you'll need to enter

```
node build.js // the up-to-date js file will be in `bundles/bundle.js`
```

### Minifiy

```
sudo npm install -g gulp
```

Using gulp to minify javascript. The output minified js will be in folder `dist`

You can also use a dummy http server for seeing the samples. Enter `node app.js`.

And open up `http://localhost:8080/themes/basic/basic.html`



# License 

MIT [@chilijung](http://github.com/chilijung)

License for `validate.js` see details in : http://rickharrison.github.com/validate.js
