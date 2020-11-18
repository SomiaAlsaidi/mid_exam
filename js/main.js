// preparing language file
var aLangKeys=new Array();
aLangKeys['en']=new Array();
aLangKeys['ar']=new Array();

aLangKeys['en']['home']='Home';
aLangKeys['en']['about']='About ';
aLangKeys['en']['store']='Store';
aLangKeys['en']['contact_us']='Contact us';
aLangKeys['en']['welcome']='Welcome ';

aLangKeys['ar']['home']='الرئيسيه';
aLangKeys['ar']['about']='من نحن';
aLangKeys['ar']['store']='المتجر';
aLangKeys['ar']['contact_us']='ទាក់ទង​មក​ពួក​យើង';
aLangKeys['ar']['welcome']='សូមស្វាគមន៍';


$(document).ready(function() {

    // onclick behavior
    $('.lang').click( function() {
        var lang = $(this).attr('id'); // obtain language id

        // translate all translatable elements
        $('.tr').each(function(i){
          $(this).text(aLangKeys[lang][ $(this).attr('key') ]);
        });

    } );

});