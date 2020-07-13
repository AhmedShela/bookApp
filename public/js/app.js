'use strict';
$('.btnSelect').click(function handleSelectClick(event){
    event.preventDefault();
    console.log('Hi');
    $('.bookDtlForm :input').css('display','inline');
    event.target.style.display = 'none';
    $('.btnSelect').css('display','none');
    $(".bookDtlForm :first-child").css('display','none');
});