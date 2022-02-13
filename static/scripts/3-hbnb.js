$(document).ready(function () {
  const amenityChecked = {};
  $(document).on('change', '.checkbox-amenity', function () {
    if ($(this).is(':checked')) {
      amenityChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityChecked[$(this).data('id')];
    }

    const dictAmenity = Object.values(amenityChecked);
    if (dictAmenity.length > 0) {
      $('.select').text(dictAmenity.join(', '));
    } else {
      $('.select').html('&nbsp;');
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (answer) {
  if (answer.status === 'OK') {
    $('#api_status').addClass('available');
    $('#api_status').css({ 'background-color': '#ff545f' });
  } else {
    $('#api_status').removeClass('available');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: JSON.stringify({}),
  contentType: 'application/json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      const info = data[i];
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

      $('section.places').append('<article><div class="title_box"><h2>' + info.name + '</h2><div class="price_by_night">$' + info.price_by_night + '</div></div><div class="information"><div class="max_guest">' + info.max_guest + ' ' + numberGuest + '</div><div class="number_rooms">' + info.number_rooms + ' ' + numberRooms + '</div><div class="number_bathrooms">' + info.number_bathrooms + ' ' + numberBath + '</div></div><div class="user"><b>Owners: </b> Paola Andrea García Altamirano & Diana Maria Henao Parra</div>' + '<div class="description">' + info.description + '</div></article>');
    }
  }
});
