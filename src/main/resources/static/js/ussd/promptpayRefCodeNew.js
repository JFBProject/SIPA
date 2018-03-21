/**
 * promptpayRefCodeNew –
 */

const promptpayRefCodeNew = {};
$(function () {

	promptpayRefCodeNew.initDatepicker = function () {

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
	
	promptpayRefCodeNew.onChangeDateFrom = function () {
		$('#inputDateTo').datepicker('option', 'minDate', $('#inputDateFrom').val());
	}

	promptpayRefCodeNew.onChangeDateTo = function () {
		$('#inputDateFrom').datepicker('option', 'maxDate', $('#inputDateTo').val());
	}

	promptpayRefCodeNew.initDatepicker();
	promptpayRefCodeNew.onChangeDateFrom();
	promptpayRefCodeNew.onChangeDateTo();
	
	var contextPath = CommonUtils.getContextPath();
	
	promptpayRefCodeNew.onClickSave = function () {
			
		if ($.trim($("#sharedKey").val()) == "") {
			bootbox.alert("กรุณาระบุ เงื่อนไขการสร้างรหัสอ้างอิง");
			return false;
		}

		if ($.trim($("#inputDateFrom").val()) == "" && $.trim($("#inputDateTo").val()) == "") {
			bootbox.alert("กรุณาระบุ วันที่เริ่มต้น และ วันที่สิ้นสุด");
			return false;
		}
		
		if ($.trim($("#status").val()) == "") {
			bootbox.alert("กรุณาระบุ สถานะ");
			return false;
		}

//		var edit = $("input[type='hidden'][name='id']").val();
//		if ($.trim( edit ) == "" && $.trim($("#currentStatus").val()) == "") {
//			bootbox.alert("กรุณาระบุ สถานะเปิด/ปิด");
//			return false;
//		}

		CommonUtils.confirm(function (result) {
			if (result) {
				$("#refcodeForm").submit();
			}
		});

	};

});