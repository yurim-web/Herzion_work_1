(function(){
	var toggleList = document.querySelectorAll('.couponList td.layer');
    toggleList.forEach(function(toggle){
        toggle.addEventListener('click', function() {
            var target = toggle.parentNode.nextElementSibling;
            if(toggle.className.indexOf('selected') > 0) {
                toggle.classList.remove('selected');
                target.classList.remove('selected');
            } else {
                toggle.classList.add('selected');
                target.classList.add('selected');
            }
        });
    });
})();
