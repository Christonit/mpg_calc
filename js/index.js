 var url = 'https://api.myjson.com/bins/83o47'; //
 var vbrand,
     vmodel,
     vyear,
     avgmpg,
     cmpg,
     hmpg,
     gPrice,
     fuelType,
     amountToFill,
     gasToGalons,
     galonsToGas,
     filledGalons,
     budget,
     totalGalons,
     duplicate_brand,
     vbrand_label = $('#v-brand--btn'),
     mobile_vehicle = $('form[name="vehicle models"]'),
     mobile_v_year = $('#mobile-v-year'),
     vmodel_label = $('#v-model--btn'),
     vyear_label = $('#v-year--btn');

 //fetch viewport with for mobile mode purposes
 var windowSize = $(window).width();



 $.get(url, function(data) {

     vbrand_label.click(selectOtherVehicle);
     //                         
     vmodel_label.click(vehicleModel_backBtn);
     vyear_label.html('Año');
     vmodel_label.html('Modelo');

     // Appends vehicle info to MPG resume
     function mpg_resume() {
         $('#v-brand-model').append(vbrand + " " + vmodel + " " + vyear);
         $('[data-citympg]').append(cmpg);
         $('[data-hwmpg]').append(hmpg);
         $('[data-avgmpg]').append(avgmpg);

     };

     //Triggers the vehicle MPG resume
     $('#continue-btn').click(function() {
         $('#mpg-calculator').removeClass('hide');
         $('#car-model, #continue-btn, #mobile-v-year').addClass('hide');
         $('#car-model .container').empty();
         mpg_resume();
     });

     //Captures year of the vehicle and validates info to enable MPG resume
     function v_years() {
         vyear = '';
         vyear = $(this).text();
         vyear_label.html(vyear);

         //Checks if the 3 key variables have info and fetches the MPG info for the vehicle model
         if (vyear !== '' && vbrand !== '' && vmodel !== '') {
             $.each(data, function brand(i, obj) {
                 if (vyear == obj.year && vbrand == obj.make && vmodel == obj.model) {
                     avgmpg = obj.comb08;
                     cmpg = obj.city08;
                     hmpg = obj.highway08;
                 }
             });
             $('#continue-btn').removeClass('hide');

         }

     };

     function years() {
         if (windowSize <= 760) {
             mobile_vehicle.addClass('hide');
             $('#fwd-btn').addClass('hide');
         } else {
             $('#v-model').addClass('hide');
             $('#v-model-year').removeClass('hide');
             vmodel_label.html(vmodel).removeClass('active');
             vyear_label.addClass('active');
         }

         $('#car-model .container').empty();
         $.each(data, function brand(i, obj) {
             if (vmodel == obj.model) {
                 var v_model_years = '<span class="v-label" data-model-year="' + obj.year + '">' + obj.year + '</span>';
                 if (windowSize <= 760) {
                     $('#mobile-v-year').append(v_model_years);
                     console.log(obj.year);

                 } else {
                     //
                     $('#v-model-year').append(v_model_years);

                 }

                 $('[data-model-year="' + obj.year + '"]').not('[data-model-year="' + obj.year + '"]:eq(0)').remove();

             }


         });


         $('[data-model-year]').click(v_years);

     };
     // Captures the model
     function v_model() {
         vmodel = '';
         vmodel = $(this).text();
         if (vmodel !== '') {
             $('#car-model .container').empty();
         }
         // Executes function that populates "Years" tab
         years();

     };

     $('#mobile-v-model').mouseleave(function() {

         vmodel = $('#mobile-v-model option:selected').attr('data-model');

         if (vmodel !== "" || vmodel !== "-") {
             $('#fwd-btn').removeClass('hide');
         }

         if (vmodel === "-") {
             $('#fwd-btn').addClass('hide');
         } //




     })



     function models() {
         var v_models;
         $('#v-model').removeClass('hide');
         $('#car-model .container').empty();
         vbrand_label.html(vbrand).removeClass('active');

         $.each(data, function brand(i, obj) {
             if (vbrand == obj.make) {
                 if (windowSize <= 768) {
                     v_models = '<option data-model="' + obj.model + '">' + obj.model + '</option>'; //
                     $('#mobile-v-model').append(v_models);
                     $('#mobile-v-model option[data-model="' + obj.model + '"]').not('option[data-model="' + obj.model + '"]:eq(0)').remove();

                 } else {
                     v_models = '<span class="v-label" data-model="' + obj.model + '">' + obj.model + '</span>';
                     $('#v-model').append(v_models);
                     $('span[data-model="' + obj.model + '"]').not('[data-model="' + obj.model + '"]:eq(0)').remove();
                 }

             }

             $('#car-model').removeClass('hide');


         });


         $('[data-model]').click(v_model);
         $('#fwd-btn').click(function() {
             mobile_v_year.removeClass('hide');
             vmodel_label.html(vmodel);
             years();
             if (windowSize <= 768) {

                 vyear_label.removeClass('hide');
                 vbrand_label.addClass('hide');
                 vmodel_label.removeClass('active');
                 vyear_label.addClass('active');
             }
         });

     };

     // Captures brand value of clicked element
     function v_brand() {
         vbrand_label.removeClass('hide');
         vbrand = '';
         vbrand = $(this).text();
         if (vbrand !== '') {
             $('#filter-records, #brand-search').addClass('hide');
             $('#filter-records').empty();
         }
         if (windowSize <= 768) {
             vyear_label.addClass('hide');
             mobile_vehicle.removeClass('hide');
         }

         models();


     };


     var content;

     function createBrand() {
         $.each(data, function brand(i, obj) {
             if (windowSize >= 760) {
                 content = '<span id="' + obj.make + '" class="v-label" data-brand="' + obj.make + '">' + obj.make + '</span>';
                 $('#filter-records').append(content);
             } else {

             }
         });
         $('#filter-records .v-label').click(v_brand);

     }
     //On 
     
     // Back to model Select
     function vehicleModel_backBtn() {
         vyear = 0;
         if (windowSize <= 768) {
             vyear_label.html('Año').removeClass('active').addClass('hide');
             vmodel_label.html('Modelo').addClass('active');
             vbrand_label.removeClass('hide');
             $('#continue-btn').addClass('hide');
             mobile_vehicle.removeClass('hide');
             mobile_v_year.addClass('hide').empty();

             //$('#v-model-year').addClass('hide').empty();
         } else {
             $('#v-model-year').addClass('hide').empty();
             $('#continue-btn').addClass('hide');
         }
         models();
     }
   //
     // Restart Vehicle Select
     function selectOtherVehicle() {
        
         vyear_label.html('Año');
         vmodel_label.html('Modelo').addClass('active');
         if (windowSize <= 768) {
             mobile_vehicle.addClass('hide');
             $('#mobile-v-model').empty().html('<option data-model="-">-</option>');
         }
         $('#mpg-calculator, #car-model, #mpg-resume, #v-model-year, #continue-btn, #btn-grid').addClass('hide');
         $('#filter-records, #brand-search, [name="estimator"]').removeClass('hide');
         $('[data-citympg], [data-hwmpg], [data-avgmpg], #v-brand-model, #v-year').empty();
         emptyMpgResume();
         $('[name="cantidad_rd$"], [name="cantidad_galones"]').val('');
        // $('').removeClass('hide');
         $('#v-brand-model').prependTo('#v-resume')
         createBrand();
         $('span[data-brand]').click(v_brand);
     }

     // Ejecuta la funcion que popula div con las marcas
     $("#txt-search").click(function() {
         $('#filter-records').empty();
         if(windowSize >= 768){
           createBrand();
         }
     });


     //corre el evento que guarda la marca
     $('span[data-brand]').click(v_brand);

     // Funcion del Search Bar
     $('#txt-search').keyup(function() {
         var searchField = $(this).val();
         if (searchField === '') {
             $('#filter-records').html('');
             return;
         }
         var regex = new RegExp(searchField, 'i');
         var count = 1;
         var output = "";
         $.each(data, function(i, obj) {

             if (obj.make.search(regex) != -1) {
                 output += '<span id="' + obj.make + '" class="v-label">' + obj.make + '</span>';

                 if (count % 2 == 0) {
                     output += '<span id="' + obj.make + '" class="v-label">' + obj.make + '</span>';
                 }

                 count++
             }
             if (obj.make.search(regex) !== obj.make) {
                 $('#filter-records').empty();
             }

             $('#filter-records').append(output);
             $('#txt-search').keyup(function() {
                 $('span[id="' + obj.make + '"]').not('span[id="' + obj.make + '"]:eq(0)').remove();
             });
             $('#filter-records .v-label').click(v_brand);

         });

     });


     $('[name="otherCar"]').click(selectOtherVehicle); //
 });

 //Reinicia los calculos
 

 function estimator() {
     budget = parseInt($('input[name="cantidad_rd$"]').val());
     totalGalons = parseInt($('input[name="cantidad_galones"]').val());
     $('h1[data-fuel-type]').append(fuelType);
     $('#v-brand-model').prependTo('#mpg-calculator');
     $('#amount-filled').append(" RD$ " + budget);
     $('#total-galons').append(totalGalons + " Gls.");
     var estimatedDistance = (totalGalons * avgmpg).toFixed(1);
     $('#estimated-distance h1').append(estimatedDistance + " Millas");
 };

 //Gets Values budget to galons
 $('input[name="cantidad_rd$"]').keyup(function() {
     gPrice = parseInt($('select[data-fuel] option:selected').val());
     amountToFill = parseInt($('input[name="cantidad_rd$"]').val());
     gasToGalons = (amountToFill / gPrice).toFixed(1);
     $('input[name="cantidad_galones"]').val(gasToGalons);


 });

//Gets Values galons to budget
 $('input[name="cantidad_galones"]').keyup(function() {
     gPrice = parseInt($('select[data-fuel] option:selected').val());
     galonsToGas = ($('[name="cantidad_galones"]').val() * gPrice).toFixed(1);
     $('input[name="cantidad_rd$"]').val(galonsToGas);
 });

 $('#mpg-calculate-btn').click(function(e) {
     $('[name="estimator"]').addClass('hide');
     $('#mpg-resume, #btn-grid').removeClass('hide');
    
     fuelType = $('select[data-fuel] option:selected').text();
     estimator();
     e.preventDefault();
 });
function restartEstimator() {
     $('#mpg-resume, #btn-grid').addClass('hide');
     $('[name="estimator"]').removeClass('hide');
     emptyMpgResume();
   $('#v-brand-model').prependTo('#v-resume');
     

 };

function emptyMpgResume(){
       $('#amount-filled span, #total-galons span,h1[data-fuel-type], #estimated-distance span, h1[data-fuel-type],#amount-filled,#total-galons,#estimated-distance h1').empty();
     }

 $('button[name="reset"]').click(restartEstimator);