var list_files = new DataTransfer();

function addImages(files){
    if (files) {
        let filesAmount = files.length;
        var list_file_names = [];
        var list_type_files = [];
        
        for (let i = 0; i < filesAmount; i++) {
            list_files.items.add(files[i]);
            let file_name = new String(files[i].name);
            list_file_names.push(file_name.valueOf());

            let file_type = (file_name) => {
                let name_splited = file_name.split('.');
                return name_splited[name_splited.length - 1];
            };

            list_type_files.push(file_type(file_name));

            let tbody = $("#list_images").children('tbody');
            let row = '<tr onclick=deleteImage(this)><td>' + list_file_names[i] + '</td><td>'+ list_type_files[i] +'</td></tr>';
            tbody.append(row);
        }
        document.getElementById('myImages').files = list_files.files;
    }
}

function deleteImage(row){
    var index = row.rowIndex;
    document.getElementById('list_images').deleteRow(index);

    var dt = new DataTransfer();
    list_files = new DataTransfer();
    var input = document.getElementById('myImages');
    var { files } = input
    for (let i = 0; i < files.length; i++) {
        var file = files[i]
        if (index - 1 !== i){
            dt.items.add(file);
            list_files.items.add(file);
        }
        input.files = dt.files;
    }
}

$(function () {
    'use strict';
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = $('#birth_date').datepicker({
        onRender: function (date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
        }
        checkin.hide();
        $('#timeCheckOut')[0].focus();
    }).data('datepicker');
    var checkout = $('#timeCheckOut').datepicker({
        onRender: function (date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        checkout.hide();
    }).data('datepicker');
});

$(document).ready(function(){
    $("#gender_female").on("click", function(){
        console.log("female")
        $("#gender_female").prop('checked', true);
        $("#gender_male").prop('checked', false);
    });

    $("#gender_male").on("click", function(){
        console.log("male")
        $("#gender_male").prop('checked', true);
        $("#gender_female").prop('checked', false);
    });

    $("#submit_button").on("click", function(){
        console.log("Hello");
    })
});
