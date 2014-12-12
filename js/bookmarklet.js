var feedback_link = "http://127.0.0.1:19006";

if (!($ = window.jQuery)) {
  var script_srcs = [
    'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js',
    'https://cdn.rawgit.com/makeusabrew/bootbox/master/bootbox.js'
  ];

  var css = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css'
  ];
  for (var i = 0; i < css.length; i++) {
    var link = document.createElement('link');
    link.href = css[i];
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  for (var i = 0; i < script_srcs.length; i++) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = script_srcs[i];
    if (script_srcs[i] === 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js') {
      script.onload = sendRequest;
    }
    document.head.appendChild(script);
  }
}
else {
  sendRequest();
}

function sendRequest() {
  var url = location.href;
  $(document).ready(function() {
    // Add waiting gif image
    $("body").append("<div class='modaling'></div>");
    $("body").addClass("loading");
    
    $.ajax({
        url: feedback_link + '/classify',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {'url': 'http://newsoffice.mit.edu/2014/recycling-batteries-into-solar-cells-0818'},
        success: function(data) {
          // Rmove waiting gif image
          $("body").removeClass("loading");
          $('.modaling').fadeOut(500);

          if (data) {
              var category = data[0][0];
              if (category) {
                  getCategory(category);
              }
          }
        }, 
        error: function(e) {
          alert(e);
        }
    })
  })
}
function getCategory(category) {
    function counter($el, n) {
      (function loop() {
         $el.html(n);
         if (n--) {
             setTimeout(loop, 1000);
         }
      })();
    }

    var postCategory = '';
    if (typeof category == "string") {
        if (category == 'real-estate') {
          postCategory = 'Real Estate';
        }
        else {
            var categories = category.split('-');
            postCategory += categories[0][0].toUpperCase() + categories[0].slice(1);
            if (categories.length > 1) {
                postCategory += ' & ' + categories[1][0].toUpperCase() + categories[1].slice(1);
            }
        }        
    }
          
    bootbox.dialog({
                title: "Category classification result",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<div class="col-md-1"></div>' +
                    '<span>This article belongs to&nbsp;<strong>' + postCategory + '</strong>&nbsp;category. If no, please choose which one below:</span></div>' + 
                    
                    '<div class="form-group"> ' + 
                    '<label class="col-md-4 control-label" for="awesomeness">Which category?</label>' + 
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-0"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-0" value="automotive" checked="checked"> ' +
                    'Automotive </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="business"> Business </label></div></div>' +
                    
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="career"> Career </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="career"> Education </label></div></div>' +

                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="food-drink"> Food & Drink </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="news"> News </label></div></div>' +
                    
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="real-estate"> Real Estate </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="shopping"> Shopping</label></div></div>' +
                    
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="sport"> Sport </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="style-fashion"> Style & Fashion </label></div></div>' +
                    
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="technology"> Technology </label></div></div>' +
                    
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> <label for="awesomeness-1"> ' +
                    '<input type="radio" name="awesomeness" id="awesomeness-1" value="travel"> Travel </label></div></div>' +

                    '</div></div>' +
                    '</form></div></div>' + 

                    '<div class="alert alert-info" role="alert">This popup will disappear in &nbsp;' + '<span id="countdown" class="alert-link"></span>' +  '&nbsp; second</div>',

                buttons: {
                    success: {
                        label: "Send feedback",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                            var answer = $("input[name='awesomeness']:checked").val();
                            var url = location.href;
                            $.ajax({
                              type: "GET",
                              // url: 'http://54.255.101.212:19006/classifier/get_feedback',
                              url: feedback_link + '/classifier/get_feedback',
                              dataType: 'jsonp',
                              jsonp: 'callback',
                              data: {'url': url, 'category_feedback': answer, 'category': category},                              
                              success: function(data) {
                                bootbox.hideAll();
                              }, 
                              error: function(e) {
                                alert("error" + JSON.stringify(e));
                                bootbox.hideAll();
                              }
                          })
                        }
                    }
                }
            }
    );
    counter($('#countdown'), 12);
    window.setTimeout(function() {
      bootbox.hideAll();
    }, 12000);  
}