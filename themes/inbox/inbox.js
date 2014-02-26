var inbox = function(errors, evt) {
    for(var i = 0; i < errors.length; i++) {
        var el_id = '#' + errors[i]['id']
        var el_msg = errors[i]['message']
        if($(el_id).prop("tagName").toLowerCase() == 'input' && ($(el_id).attr('type') == 'text' || $(el_id).attr('type') == 'password') && $(el_id).val() == '') {
            console.log('no value input')
            $(el_id).attr('placeholder', el_msg).attr('class', 'input-validation-error')
        }else if($(el_id).prop("tagName").toLowerCase() == 'input' && ($(el_id).attr('type') == 'text' || $(el_id).attr('type') == 'password') && $(el_id).val() != '') {
            console.log('have value input')

        }else if($(el_id).prop("tagName").toLowerCase() == 'textarea' && $(el_id).val() == '') {
            $(el_id).attr('placeholder', el_msg).attr('class', 'input-validation-error')
        }
    }

    // if (evt && evt.preventDefault) {
    //     evt.preventDefault();
    // } else if (event) {
    //     event.returnValue = false;
    // }
}

module.exports = inbox;