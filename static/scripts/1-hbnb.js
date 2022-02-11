$(document).ready(function () {
    let amenityChecked = {};
    $(document).on('change', ".checkbox-amenity", function () {
        if($(this).is(':checked')){
                amenityChecked[$(this).data('id')] = $(this).data('name');
            } else {
                delete amenityChecked[$(this).data('id')];
            }
        
            let dictAmenity = Object.values(amenityChecked);
            if (dictAmenity.length > 0) {
                $('.select').text(dictAmenity.join(', '));
            } else {
                $('.select').html('&nbsp;');
            }
        });
});
