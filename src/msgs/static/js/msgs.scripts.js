'use strict';

var app = {};
app.modal = UIkit.modal($('#mdl-addedit'));

app.del = function () {

}

app.edit = function (ID) {
    $.ajax({
        url: '/edit/' + ID,
        type: 'get',
        dataType: 'json',
        success: function (s) {
            $('#mdl-addedit .uk-modal-body').html(s.html_form);
            app.modal.show();

            $('#mdl-addedit').on('submit', '.uk-form-stacked', function (e) {
                e.preventDefault;

                var frm = $(this);
                $.ajax({
                    url: '/edit/' + ID,
                    data: frm.serialize(),
                    type: frm.attr('method'),
                    dataType: 'json',
                    success: function(s) {
                        if (s.isValid) {
                            UIkit.notification({
                                message: 'Atualizado com sucesso',
                                status: 'success',
                                pos: 'top-center',
                                timeout: 5000
                            });
                            app.modal.hide();
                            $('#tbl-msgs tbody').html(s.list_msgs);
                        } else {
                            $('#mdl-addedit .uk-modal-body').html(s.html_form);
                        }
                    }
                });
                return false;
            });
        },
        error: function (e) {
            UIkit.notification({
                message: e.statusText,
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });
            app.modal.hide();
        }
    })
}

app.add = function () {
    $.ajax({
        url: '/add',
        type: 'get',
        dataType: 'json',
        success: function(s) {
            $('#mdl-addedit .uk-modal-body').html(s.html_form);
            app.modal.show();
            $('#mdl-addedit').on('submit', '.uk-form-stacked', function (e) {
                e.preventDefault;

                var frm = $(this);
                $.ajax({
                    url: frm.attr('action'),
                    data: frm.serialize(),
                    type: frm.attr('method'),
                    dataType: 'json',
                    success: function(s) {
                        if (s.isValid) {
                            UIkit.notification({
                                message: 'Adicionado com sucesso',
                                status: 'success',
                                pos: 'top-center',
                                timeout: 5000
                            });
                            app.modal.hide();
                            $('#tbl-msgs tbody').html(s.list_msgs);
                        } else {
                            $('#mdl-addedit .uk-modal-body').html(s.html_form);
                        }
                    }
                });
                return false;
            });
        }
    });
}

app.crud = function (e) {
    e.preventDefault

    var $this = $(this);
    var dataCrud = $this.data('crud');

    if (dataCrud == 'add') {
        app.add();
    } else if (dataCrud == 'edit') {
        var dataID = $this.data('id');
        app.edit(dataID);
    } else if (dataCrud == 'del') {
        var $el = $this.closest('tr');
        $el.fadeOut('ease', function () {
            $el.remove();
        });
    } else if (dataCrud == 'det') {
        var dataID = $this.data('id');
        app.details(dataID);
    }
};

app.init = function (event) {
    $(document).on('click', '[data-crud]', app.crud);
};

document.addEventListener('DOMContentLoaded', app.init)