const OS1005 = {};
$(function () {

	var contextPath = CommonUtils.getContextPath();
	OS1005.initTable = function () {
		var table = $('#ussdTimerTable').DataTable({
			"searching": false,
			"ordering": false,
			"processing": true,
			"serverSide": true,
			"ajax": {
				"url": contextPath + "ussd/os1005/list",
				"type": "POST",
				"contentType": "application/json",
				"data": function (d) {
					return JSON.stringify($.extend({}, d, {
						"id": $('#ussdId').val()
					}));
				}
			},
			"columns": [
				{
					"data": "id",
					"className": "text-center",
					"render": function (data, type, row, meta) {
						return meta.row + meta.settings._iDisplayStart + 1;
					}
				},
				{ "data": "serviceStatusCode" },
				{ "data": "serviceName" },
				{
					"data": "updateBy"
				},
				{ "data": "email" },
				{
					"data": "status",
					"className": "text-center",
					"render": function (data, type, row) {
						var txt = 'เปิด';
						if (data == '0') {
							txt = 'ปิด';
						}
						return txt;
					}
				},
				{
					"data": "timer",
					"className": "text-center",
					"render": function (data, type, row) {
						return CommonUtils.convertDate(data);
					}
				},
				{
					"data": "servicesTimerId",
					"render": function (data, type, row) {
						var btn = '';

						btn += `<button class="btn btn-inline btn-primary btn-sm ladda-button ussd-delete-button" data-style="expand-right" data-size="s">
						<span class="ladda-label">ยกเลิกตั้งเวลา</span>
						</button>`;

						return btn;
					}
				},
				{
					"data": "servicesTimerId",
					"className": "text-center",
					"render": function (data, type, row) {
						var btn = '';

						btn += `<button class="btn btn-inline btn-primary btn-sm ladda-button ussd-edit-button" data-style="expand-right" data-size="s">
						<span class="ladda-label">แก้ไข</span>
						</button>`;

						return btn;
					}
				},
			]
		});


		table.on('click', 'tbody tr button.ussd-delete-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			OS1005.onDeleteById(data);
		});

		table.on('click', 'tbody tr button.ussd-edit-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			var url = CommonUtils.getContextPath() + "ussd/os1006/init?id=" + data.servicesTimerId;
			window.location.href = url;
		});

		OS1005.maintable = table;

	};
	
	OS1005.onDeleteById = function (row) {

		CommonUtils.confirm(
			function (result) {

				if (result) {
					CommonUtils.blockUi();
					var form = $("#mainForm");
					form.attr("action", contextPath + "ussd/os1005/deleteServiceTimer?servicesTimerId=" + row.servicesTimerId + "&serviceStatusId=" + row.serviceStatusId);
					form.submit();

				}
			}
		);

	};
	
	OS1005.initTable();

});