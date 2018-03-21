/**
 * OS1002 – ตั้งค่าเปิด/ปิด บริการ USSD
 */

const OS1002 = {};
$(function () {

    var rex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    OS1002.onFormSubmit = function () {
        var modBatchConfig = $("#modBatchConfig").val();

        if ("ON" == modBatchConfig) {
            var d = $("#inputDate").val();
            if (!rex.test(d)) {
                bootbox.alert("วันที่ ไม่ถูกต้อง");
                return false;
            }
            if ($.trim($("#displayHH").val()) == "" || $.trim($("#displayMM").val()) == "") {
                bootbox.alert("ระบุเวลา ไม่ถูกต้อง");
                return false;
            }

            var e = $("#email").val();
            if ($.trim(e) != "" && !regexEmail.test(e)) {
                bootbox.alert("อีเมล ไม่ถูกต้อง");
                return false;
            }

        } else {
            var oldStatus = $("#oldStatus").val();
            var currentStatus = $("#currentStatus").val();
            if (oldStatus == currentStatus) {
                if (oldStatus == 0) {
                    bootbox.alert("ปัจจุบันบริการนี้สถานะบนระบบปิดอยู่");
                }
                if (oldStatus == 1) {
                    bootbox.alert("ปัจจุบันบริการนี้สถานะบนระบบเปิดอยู่");
                }
                return false;
            }
        }

        CommonUtils.confirm(function (result) {
            if (result) {
                CommonUtils.blockUi();
                $("#ussdEdit").submit();
            }
        });

    };

    OS1002.initDatepicker = function () {

        var ctxPath = CommonUtils.getContextPath();
        $("#inputDate").datepicker({
            // showOn: "button",
            // buttonImage: ctxPath + "calendar.gif",
            // buttonImageOnly: true,
            // buttonText: "Select date",
            changeMonth: true,
            changeYear: true,
            minDate: new Date(),
            dateFormat: 'dd/mm/yy',
            beforeShow: function () {
                setTimeout(function () {
                    $('.ui-datepicker').css('z-index', 999);
                }, 100);
            }
        });
    };

    OS1002.onChangeConfig = function (obj) {
        var opt = $(obj).is(":checked");
        console.log("onChangeConfig", opt);

        if (opt) {
            $("#modBatchConfig").val("ON");
            $("#inputDate").removeAttr("disabled");
            $("#email").removeAttr("disabled");
            $("select.time-picker").removeAttr("disabled");
        } else {
            $("#modBatchConfig").val("OFF");
            $("#inputDate").attr("disabled", true);
            $("#email").attr("disabled", true);
            $("select.time-picker").attr("disabled", true);
        }
    };


    //load on start
    OS1002.initDatepicker();

});