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
- Support multipule language.(now for chinese, chinese_zh, english)

## Installation

   `<script type="text/javascript" src="validate.min.js"></script>`

or
   
   `<script type="text/javascript" src="validate.js"></script>`

## How to use

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
        }
    });

```


## Develop

```
npm install
sudo npm install -g gulp
```

Using gulp to minify javascript. The output minified js will be in folder `dist`

You can also use a dummy http server for seeing the samples. Enter `node app.js`.

And open up `http://localhost:8080/samples/themes/`


## Documentation

You can view everything at http://rickharrison.github.com/validate.js

