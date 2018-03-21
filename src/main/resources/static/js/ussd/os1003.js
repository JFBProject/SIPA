/**
 * OS1003 –
 */

const OS1003 = {};
$(function () {

	var rex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

	OS1003.initDatepicker = function () {

		var ctxPath = CommonUtils.getContextPath();

		$("#inputDateFrom").datepicker({
			changeMonth: true,
			changeYear: true,
			maxDate: new Date(),
			dateFormat: 'dd/mm/yy',
			beforeShow: function () {
				setTimeout(function () {
					$('.ui-datepicker').css('z-index', 999);
				}, 100);
			}
		});

		$("#inputDateTo").datepicker({
			changeMonth: true,
			changeYear: true,
			maxDate: new Date(),
			dateFormat: 'dd/mm/yy',
			beforeShow: function () {
				setTimeout(function () {
					$('.ui-datepicker').css('z-index', 999);
				}, 100);
			}
		});
	};

	var contextPath = CommonUtils.getContextPath();

	OS1003.initTable = function () {
		var table = $('#ussdAuditTable').DataTable({
			"searching": false,
			"ordering": false,
			"processing": true,
			"serverSide": true,
			"ajax": {
				"url": contextPath + "ussd/os1003/ussdAuditList",
				"type": "POST",
				"data": function (d) {
					return $.extend({}, d, {
						"dateFrom": $('#inputDateFrom').val(),
						"dateTo": $('#inputDateTo').val(),
						"logBy": $('#logBy').val(),
						"serviceId": $('#serviceId').val(),
						"status": $('#status').val()
					});
				}
			},
			"columns": [{
				"data": "logDatetime",
				"className": "text-center",
				"render": function (data, type, row) {
					return OS1003.convertDate(data);
				}
			}, {
				"data": "logBy"
			}, {
				"data": "serviceId"
			}, {
				"data": "serviceName"
			}, {
				"data": "timer",
				"className": "text-center",
				"render": function (data, type, row) {
					return OS1003.convertDate(data);
				}
			}, {
				"data": "action",
				"className": "text-center",
			}, {
				"data": "status",
				"className": "text-center"
			},

			]
		});
	};

	OS1003.convertDate = function (ms) {
		if (!ms)
			return "-";

		var date = new Date(ms), year = date.getFullYear(), month = (date
			.getMonth() + 1).toString(), formatedMonth = (month.length === 1) ? ("0" + month)
				: month, day = date.getDate().toString(), formatedDay = (day.length === 1) ? ("0" + day)
					: day, hour = date.getHours().toString(), formatedHour = (hour.length === 1) ? ("0" + hour)
						: hour, minute = date.getMinutes().toString(), formatedMinute = (minute.length === 1) ? ("0" + minute)
							: minute, second = date.getSeconds().toString(), formatedSecond = (second.length === 1) ? ("0" + second)
								: second;
		return formatedDay + "/" + formatedMonth + "/" + year + "  "
			+ formatedHour + ':' + formatedMinute;
	};

	OS1003.onChangeDateFrom = function () {
		$('#inputDateTo').datepicker('option', 'minDate', $('#inputDateFrom').val());
	}

	OS1003.onChangeDateTo = function () {
		$('#inputDateFrom').datepicker('option', 'maxDate', $('#inputDateTo').val());
	}

	OS1003.onClickSearch = function () {
		var dateFrom = $('#inputDateFrom').val();
		var dateTo = $('#inputDateTo').val();

		if ($.trim(dateFrom) != "") {
			if (!rex.test(dateFrom)) {
				bootbox.alert("วันที่ ไม่ถูกต้อง");
				return false;
			}
		}

		if ($.trim(dateTo) != "") {
			if (!rex.test(dateTo)) {
				bootbox.alert("วันที่ ไม่ถูกต้อง");
				return false;
			}
		}

		$('#ussdAuditTable').DataTable().ajax.reload();
	}

	OS1003.onClickClearData = function () {
		$('input[type=text]').val("");
		$('select.select2-arrow').val("");
		OS1003.onClickSearch();
	}

	// load on start
	OS1003.initTable();
	// load on start
	OS1003.initDatepicker();
});