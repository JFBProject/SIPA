/**
 * OS1001 - แสดงรายการบริการ USSD
 */
const OS1001 = {};
$(function () {

	var contextPath = CommonUtils.getContextPath();
	OS1001.initTable = function () {
		var table = $('#ussdTable').DataTable({
			"searching": false,
			"order": [[1, 'asc']],
			"processing": true,
			"serverSide": true,
			"ajax": {
				"url": contextPath + "ussd/os1001/ussdList",
				"type": "POST",
				"contentType": "application/json",
				"data": function (d) {
					return JSON.stringify($.extend({}, d, {
						"serviceId": $('#serviceId').val(),
						"serviceName": $('#serviceName').val()
					}));
				}
			},
			"columns": [
				{
					"data": "id",
					"className": "text-center",
					"render": function (data, type, row, meta) {
						return meta.row + meta.settings._iDisplayStart + 1;
					},
					"orderable": false
				},
				{ "data": "serviceId" },
				{ "data": "serviceName" },
				{
					"data": "updatedBy",
					"orderable": false
				},
				{
					"data": "status",
					"className": "text-center",
					"render": function (data, type, row) {
						var txt = 'เปิด';
						if (data == '0') {
							txt = 'ปิด';
						}
						return txt;
					},
					"orderable": false
				},
				{
					"data": "timer",
					"className": "text-center",
					"render": function (data, type, row) {
						return CommonUtils.convertDate(data);
					},
					"orderable": false
				},
				{
					"data": "status",
					"render": function (data, type, row) {
						var btn = '';

						btn = `<button class="btn btn-inline btn-primary btn-sm ladda-button ussd-action" data-size="s">
										<span class="ladda-label">เปิด/ปิด</span>
								</button>`;


						if (row.servicesTimers.length > 0) {
							btn += ` &nbsp; <button class="btn btn-inline btn-primary btn-sm ladda-button ussd-list-timer" data-style="expand-right" data-size="s">
							<span class="ladda-label">แสดงการตั้งค่า</span>
							</button>`;
						}
						return btn;
					},
					"orderable": false
				},
				{
					"data": "serviceId",
					"render": function (data, type, row) {
						var btn = '';

						btn += ` &nbsp; <button class="btn btn-inline btn-primary btn-sm ladda-button ussd-edit-button" data-style="expand-right" data-size="s">
						<span class="ladda-label">แก้ไข</span>
						</button>`;

						if (row.status == 0) {
							btn += ` &nbsp; <button class="btn btn-inline btn-danger btn-sm ladda-button ussd-delete-button" data-style="expand-right" data-size="s">
							<span class="ladda-label">ลบ</span>
							</button>`;
						}

						return btn;
					},
					"orderable": false
				},
			]
		});


		table.on('click', 'tbody tr button.ussd-action', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			var url = CommonUtils.getContextPath() + "ussd/os1002/init?id=" + data.id;
			window.location.href = url;
		});

		table.on('click', 'tbody tr button.ussd-remove-timer', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			OS1001.onCancelTimer(data);
		});

		table.on('click', 'tbody tr button.ussd-edit-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			var url = CommonUtils.getContextPath() + "ussd/os1004/edit?id=" + data.id;
			window.location.href = url;
		});

		table.on('click', 'tbody tr button.ussd-delete-button', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			OS1001.onDeleteById(data);
		});

		table.on('click', 'tbody tr button.ussd-list-timer', function () {
			var closestRow = $(this).closest('tr');
			var data = table.row(closestRow).data();
			var url = CommonUtils.getContextPath() + "ussd/os1005/init?id=" + data.id;
			window.location.href = url;
		});

		OS1001.maintable = table;

	};

	OS1001.onClickSearch = function () {
		$('#ussdTable').DataTable().ajax.reload();
	};

	OS1001.onClickClearData = function () {
		$('input[type=text]').val("");
		$('#ussdTable').DataTable().ajax.reload();
	}


	OS1001.onDeleteById = function (row) {


		CommonUtils.confirm(
			function (result) {

				if (result) {

					CommonUtils.blockUi();
					var form = $("#mainForm");
					form.attr("action", contextPath + "ussd/os1001/deleteService");
					form.find("input[name='id']").val(row.id);
					form.submit();

				}
			}
		);

	};

	//load on ready
	OS1001.initTable();

});