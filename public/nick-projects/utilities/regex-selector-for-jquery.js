/*
 * regex selector for jquery
 * http://james.padolsey.com/javascript/regex-selector-for-jquery/
 */
jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}
// Select all elements with an ID starting a vowel:
$(':regex(id,^[aeiou])');
 
// Select all DIVs with classes that contain numbers:
$('div:regex(class,[0-9])');
 
// Select all SCRIPT tags with a SRC containing jQuery:
$('script:regex(src,jQuery)');