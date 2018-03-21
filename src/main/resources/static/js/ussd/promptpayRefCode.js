/**
 * Promptpay Reference Code
 */

const promptpayRefCode = {};
$(function () {

	var rex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

	promptpayRefCode.initDatepicker = function () {

		var ctxPath = CommonUtils.getContextPath();

		$("#inputDateFrom").datepicker({
			changeMonth: true,
			changeYear: true,
//			maxDate: new Date(),
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
//			maxDate: new Date(),
			dateFormat: 'dd/mm/yy',
			beforeShow: function () {
				setTimeout(function () {
					$('.ui-datepicker').css('z-index', 999);
				}, 100);
			}
		});
	};

	var contextPath = CommonUtils.getContextPath();

	promptpayRefCode.initTable = function () {
		var table = $('#promptpayRefCodeTable').DataTable({
			"searching": false,
			"ordering": false,
			"processing": true,
			"serverSide": true,
			"ajax": {
				"url": contextPath + "promptpay/refcode/list",
				"type": "POST",
				"contentType": "application/json",
				"data": function (d) {
					return JSON.stringify($.extend({}, d, {
						"dateFrom": $('#inputDateFrom').val(),
						"dateTo": $('#inputDateTo').val(),
						"status": $('#status').val()
					}));
				}
			},
			"columns": [
			{
				"data": "status",
				"className": "text-center",
				"render": function (data, type, row, meta) {
					return meta.row + meta.settings._iDisplayStart + 1;
				}
			}, {
				"data": "startDate",
				"className": "text-center",
				"render": function (data, type, row) {
					return promptpayRefCode.convertDate(data);
				}
			}, {
				"data": "endDate",
				"className": "text-center",
				"render": function (data, type, row) {
					return promptpayRefCode.convertDate(data);
				}
			}, {
				"data": "status",
				"className": "text-center",
				"render": function (data, type, row) {
					var btn = '';
					
					if(data == 'ACTIVE'){
						btn += ` &nbsp; <button class="btn btn-inline btn-success btn-sm ladda-button promptpay-onoff-button" data-style="expand-right" data-size="s">
							<span class="ladda-label">เปิด</span>
							</button>`;
					}
					
					if(data == 'INACTIVE'){
						btn += ` &nbsp; <button class="btn btn-inline btn-danger btn-sm ladda-button promptpay-onoff-button" data-style="expand-right" data-size="s">
							<span class="ladda-label">ปิด</span>
							</button>`;
					}

					return btn;
				}
			}, {
				"data": "createdByName"
			}, {
				"data": "status",
				"render": function (data, type, row) {
					var btn = '';

					if(data == 'INACTIVE'){
						btn += ` &nbsp; <button class="btn btn-inline btn-primary btn-sm ladda-button promptpay-edit-button" data-style="expand-right" data-size="s">
						<span class="ladda-label">แก้ไข</span>
						</button>`;
	
						btn += ` &nbsp; <button class="btn btn-inline btn-danger btn-sm ladda-button promptpay-delete-button" data-style="expand-right" data-size="s">
						<span class="ladda-label">ลบ</span>
						</button>`;
					}

					return btn;
				}
			},

			]
		});
		
		table.on('click', 'tbody tr button.promptpay-onoff-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			promptpayRefCode.rest(data.id);
		});
		
		table.on('click', 'tbody tr button.promptpay-edit-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			var url = CommonUtils.getContextPath() + "promptpay/refcode/edit?id=" + data.id;
			window.location.href = url;
		});

		table.on('click', 'tbody tr button.promptpay-delete-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			promptpayRefCode.onDeleteById(data);
		});
	};

	promptpayRefCode.convertDate = function (ms) {
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

	promptpayRefCode.onChangeDateFrom = function () {
		$('#inputDateTo').datepicker('option', 'minDate', $('#inputDateFrom').val());
	}

	promptpayRefCode.onChangeDateTo = function () {
		$('#inputDateFrom').datepicker('option', 'maxDate', $('#inputDateTo').val());
	}

	promptpayRefCode.onClickSearch = function () {
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

		$('#promptpayRefCodeTable').DataTable().ajax.reload();
	}

	promptpayRefCode.onClickClearData = function () {
		$('input[type=text]').val("");
		$('select.select2-arrow').val("");
		promptpayRefCode.onClickSearch();
	}

	// load on start
	promptpayRefCode.initTable();
	// load on start
	promptpayRefCode.initDatepicker();
	
	promptpayRefCode.onDeleteById = function (row) {
		CommonUtils.confirm(
			function (result) {

				if (result) {

					CommonUtils.blockUi();
					var form = $("#mainForm");
					form.attr("action", contextPath + "promptpay/refcode/delete");
					form.find("input[name='id']").val(row.id);
					form.submit();

				}
			}
		);
	};
	
	promptpayRefCode.rest = function (id) {
		
//		$.ajax({
//	        url: contextPath + 'ussd/rest/promptpay/refcode/onoff',
//	        type : 'POST',
//	        contentType : 'application/json',
//	        dataType: 'json',
//	        async: true,
//	        data: function (d) {
//				return JSON.stringify($.extend({}, d, {
//					"dateFrom": $('#inputDateFrom').val(),
//					"dateTo": $('#inputDateTo').val(),
//					"status": $('#status').val()
//				}));
//			},
//	        success: function(data) {
//	           
//	        },
//	        fail : function(data) {
//	        	
//	        },
//	        done : function(data) {
//	            
//	        }
//	    });
		
		CommonUtils.confirm(
				
			function (result) {
					
				if (result) {
						
					$.ajax({
				        url: contextPath + "promptpay/rest/refcode/onoff/" + id,
				        type : "GET",
				        contentType : "application/json",
				        async: true,
				        data: null,
				        success: function(data) {
				            switch(data.msgCode) {
				                case "SUCCESS": {
				                	console.log("SUCCESS data =" + JSON.stringify(data));
				                    break;
				                }
				                case "ERROR" : {
				                	CommonUtils.alert("ERROR >> " + data.msgDesc);
				                    break;
				                }
				                default:
				            }
				        },
				        fail : function(data) {
			//	            console.log("FAIL");
				        },
				        done : function(data) {
			//	            console.log("DONE");
				        },
				        complete : function(data) {
				        	$('#promptpayRefCodeTable').DataTable().ajax.reload()
			//	            console.log("COMPLETE");
				        },
					});
				}
			}
		);
	}
});