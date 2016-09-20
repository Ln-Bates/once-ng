/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/9/1.
 */
;(function($){
    $.fn.dropToggle=function(state){
        var $this = $(this);
        var $menu = $this.find(".menu");
        var selfState = $this.data("state")||state;
        $this.click(function(){
            switch (selfState){
                case "fade":
                    $menu.fadeToggle();
                    break;
                case "slide":
                    $menu.slideToggle();
                    break;
                default :
                    $menu.toggle();
            }
        });
        return this;
    };
})(jQuery);