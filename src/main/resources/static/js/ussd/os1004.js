/**
 * OS1004 –
 */

const OS1004 = {};
$(function () {


	OS1004.onClickSave = function () {

		if ($.trim($("#serviceId").val()) == "") {
			bootbox.alert("กรุณาระบุ รหัสบริการ");
			return false;
		}

		if ($.trim($("#serviceName").val()) == "") {
			bootbox.alert("กรุณาระบุ ชื่อบริการ");
			return false;
		}

		var edit = $("input[type='hidden'][name='id']").val();
		if ($.trim( edit ) == "" && $.trim($("#currentStatus").val()) == "") {
			bootbox.alert("กรุณาระบุ สถานะเปิด/ปิด");
			return false;
		}

		CommonUtils.confirm(function (result) {
			if (result) {
				$("#ussdForm").submit();
			}
		});

	};

});