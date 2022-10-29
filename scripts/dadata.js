let $street = $("#address_query_street, #insurance_address_query_street");

let token = 'ceb7ea8c740b2068cab4e2a2cfcaa7240ac091c7';

$street.suggestions({
    token: token,
    type: "ADDRESS",
    hint: true,
    bounds: "city-street",
    count: 10,
    minChars: 3,
    onSelect: function (suggestion) {
        $(this).attr('kladr_id', suggestion.data.city_kladr_id)
    }
});