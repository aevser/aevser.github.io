$(document).ready(function() {
    function formatState (state) {
        if (!state.id) {
          return state.text;
        }
      
        var baseUrl = "/calc/images";
        var $state = $(
          '<span class="flex"><img class="img-flag" /> <span></span></span>'
        );
      
        // Use .text() instead of HTML string concatenation to avoid script injection issues
        $state.find("span").text(state.text);
        $state.find("img").attr("src", baseUrl + "/" + state.element.value.toLowerCase() + ".png");
      
        return $state;
      };
      
      $(".configurator__block-form-select").select2({
        templateResult: formatState,
        templateSelection: formatState,
        minimumResultsForSearch: Infinity
      });
  
    let obj = {
        width: $("#width").val(),
        height: $("#height").val(),
        form: $("#form").find(':selected').data('cof'),
        type: $("#type").find(':selected').data('cof'),
        quantity: $("#quantity").val(),
    }

    $("#width, #height").keyup(function() {
        obj = changeVal(obj);
        result(obj)
    });

    $("#type, #form").change(function() {
        obj = changeVal(obj);
        result(obj)
    });

    $(".configurator__block-form-quantity-minus").click(function() {
        let block = $(this).parent(".configurator__block-form-quantity");
        let quantity = $(block).children(".configurator__block-form-input");
        $(quantity).val( Number($(quantity).val()) - 1);
        obj = changeVal(obj);
        result(obj)
    });

    $(".configurator__block-form-quantity-plus").click(function() {
        let block = $(this).parent(".configurator__block-form-quantity");
        let quantity = $(block).children(".configurator__block-form-input");
        $(quantity).val( Number($(quantity).val()) + 1);
        obj = changeVal(obj);
        result(obj)
    });

    $(".configurator__block-form-close").click(function() {
        $(this).parent(".configurator__form-inner").remove()
    });

    $(".question").click(function() {
        $(".answer").hide();
        $(this).parent(".configurator__block-form-title").children(".answer").toggle();
        $(".overlay").show();
    });
    $(".overlay").click(function() {
        $(".answer").hide();
        $(".overlay").hide();

    });
    function changeVal(obj) {
        obj = {
            width: $("#width").val(),
            height: $("#height").val(),
            form: $("#form").find(':selected').data('cof'),
            type: $("#type").find(':selected').data('cof'),
            quantity: $("#quantity").val(),
        }

        return obj;
    }

    function result(obj){
        $("#result").text(((obj.width * obj.height)/1000) * 1.5 * obj.form * obj.type * obj.quantity)
    }
});
