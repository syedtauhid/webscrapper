var rowNum = 0;
(function(){
    for (i= 0 ; i <= 100; i++){
        $.get("/api/scraps/"+i, function(data, status){
                scrapDataFromUrls(data);
         });
    }
})();

function scrapDataFromUrls(data) {
    var urls = data.urls;
    for (i in urls){
        $.get("/api/scraps/get?"+"url="+urls[i], function(data, status){
                console.log(data);
                addRow(data);
            });
    }
}

function addRow(data) {
    waitingDialog.hide();
    $("#counter").text(++rowNum);
    var row = "<tr>"+"<td>"+data.title+"</td>"+"<td>"+data.view_count+"</td>"+"<td>"+(data.phone.length > 0 ? data.phone : "-----" )+"</td>"+"</tr>";
    $('#myTable tbody').append(row);
}

var waitingDialog = waitingDialog || (function ($) {
    'use strict';
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null
			}, options);
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);
waitingDialog.show("Scrapping Data. Please Wait...");