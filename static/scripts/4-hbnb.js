$.get('http://0.0.0.0:5001/api/v1/status/', function (answer) {
  if (answer.status === 'OK') {
    $('#api_status').addClass('available');
    $('#api_status').css({ 'background-color': '#ff545f' });
  } else {
    $('#api_status').removeClass('available');
  }
});

const amenityChecked = {};
$(document).on('change', '.checkbox-amenity', function () {
  if ($(this).is(':checked')) {
    amenityChecked[$(this).data('id')] = $(this).data('name');
  } else {
    delete amenityChecked[$(this).data('id')];
  }

  if (Object.keys(amenityChecked).length > 0) {
    $('.select').text(Object.values(amenityChecked).join(', '));
  } else {
    $('.select').html('&nbsp;');
  }
});

function searchFilter () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: Object.keys(amenityChecked) }),
    success: function (data) {
      $('section.places').empty();
      for (let i = 0; i < data.length; i++) {
        let info = data[i];
        let numberGuest = '';
        let numberRooms = '';
        let numberBath = '';
        if (info.max_guest !== 1) {
          numberGuest = 'Guests';
        } else {
          numberGuest = 'Guest';
        }
        if (info.number_rooms !== 1) {
          numberRooms = 'Rooms';
        } else {
          numberRooms = 'Room';
        }
        if (info.number_bathrooms !== 1) {
          numberBath = 'Bathrooms';
        } else {
          numberBath = 'Bathroom';
        }

        $('section.places').append('<article><div class="title_box"><h2>' + info.name + '</h2><div class="price_by_night">$' + info.price_by_night + '</div></div><div class="information"><div class="max_guest">' + info.max_guest + ' ' + numberGuest + '</div><div class="number_rooms">' + info.number_rooms + ' ' + numberRooms + '</div><div class="number_bathrooms">' + info.number_bathrooms + ' ' + numberBath + '</div></div><div class="user"><b>Owners: </b> Paola Andrea García Alamirano & Diana Maria Henao Parra</div>' + '<div class="description">' + info.description + '</div></article>');
      }
    }
  });
}
