var CommonUtils = {};

$(document).ready(function () {
	///* ==========================================================================
	//	Scroll
	//	========================================================================== */
	//
	//	if (!("ontouchstart" in document.documentElement)) {
	//
	//		document.documentElement.className += " no-touch";
	//
	//		var jScrollOptions = {
	//			autoReinitialise: true,
	//			autoReinitialiseDelay: 100
	//		};
	//
	//		$('.box-typical-body').jScrollPane(jScrollOptions);
	//		$('.side-menu').jScrollPane(jScrollOptions);
	//		//$('.side-menu-addl').jScrollPane(jScrollOptions);
	//		$('.scrollable-block').jScrollPane(jScrollOptions);
	//	}
	//
	///* ==========================================================================
	//    Header search
	//    ========================================================================== */
	//
	//	$('.site-header .site-header-search').each(function(){
	//		var parent = $(this),
	//			overlay = parent.find('.overlay');
	//
	//		overlay.click(function(){
	//			parent.removeClass('closed');
	//		});
	//
	//		parent.clickoutside(function(){
	//			if (!parent.hasClass('closed')) {
	//				parent.addClass('closed');
	//			}
	//		});
	//	});

	/* ==========================================================================
		Header mobile menu
		========================================================================== */

	// Dropdowns
	$('.site-header-collapsed .dropdown').each(function () {
		var parent = $(this),
			btn = parent.find('.dropdown-toggle');

		btn.click(function () {
			if (parent.hasClass('mobile-opened')) {
				parent.removeClass('mobile-opened');
			} else {
				parent.addClass('mobile-opened');
			}
		});
	});

	$('.dropdown-more').each(function () {
		var parent = $(this),
			more = parent.find('.dropdown-more-caption'),
			classOpen = 'opened';

		more.click(function () {
			if (parent.hasClass(classOpen)) {
				parent.removeClass(classOpen);
			} else {
				parent.addClass(classOpen);
			}
		});
	});

	// Left mobile menu
	$('.hamburger').click(function () {
		if ($('body').hasClass('menu-left-opened')) {
			$(this).removeClass('is-active');
			$('body').removeClass('menu-left-opened');
			$('html').css('overflow', 'auto');
		} else {
			$(this).addClass('is-active');
			$('body').addClass('menu-left-opened');
			$('html').css('overflow', 'hidden');
		}
	});

	$('.mobile-menu-left-overlay').click(function () {
		$('.hamburger').removeClass('is-active');
		$('body').removeClass('menu-left-opened');
		$('html').css('overflow', 'auto');
	});

	// Right mobile menu
	$('.site-header .burger-right').click(function () {
		if ($('body').hasClass('menu-right-opened')) {
			$('body').removeClass('menu-right-opened');
			$('html').css('overflow', 'auto');
		} else {
			$('.hamburger').removeClass('is-active');
			$('body').removeClass('menu-left-opened');
			$('body').addClass('menu-right-opened');
			$('html').css('overflow', 'hidden');
		}
	});

	$('.mobile-menu-right-overlay').click(function () {
		$('body').removeClass('menu-right-opened');
		$('html').css('overflow', 'auto');
	});

	/* ==========================================================================
		Header help
		========================================================================== */

	$('.help-dropdown').each(function () {
		var parent = $(this),
			btn = parent.find('>button'),
			popup = parent.find('.help-dropdown-popup'),
			jscroll;

		btn.click(function () {
			if (parent.hasClass('opened')) {
				parent.removeClass('opened');
				jscroll.destroy();
			} else {
				parent.addClass('opened');

				$('.help-dropdown-popup-cont, .help-dropdown-popup-side').matchHeight();

				if (!("ontouchstart" in document.documentElement)) {
					setTimeout(function () {
						jscroll = parent.find('.jscroll').jScrollPane(jScrollOptions).data().jsp;
						//jscroll.reinitialise();
					}, 0);
				}
			}
		});

		$('html').click(function (event) {
			if (
				!$(event.target).closest('.help-dropdown-popup').length
				&&
				!$(event.target).closest('.help-dropdown>button').length
				&&
				!$(event.target).is('.help-dropdown-popup')
				&&
				!$(event.target).is('.help-dropdown>button')
			) {
				if (parent.hasClass('opened')) {
					parent.removeClass('opened');
					jscroll.destroy();
				}
			}
		});

	});

	/* ==========================================================================
		Side menu list
		========================================================================== */

	$('.side-menu-list li.with-sub').each(function () {
		var parent = $(this),
			clickLink = parent.find('>span'),
			subMenu = parent.find('>ul');

		clickLink.click(function () {
			if (parent.hasClass('opened')) {
				parent.removeClass('opened');
				subMenu.slideUp();
				subMenu.find('.opened').removeClass('opened');
			} else {
				if (clickLink.parents('.with-sub').size() == 1) {
					$('.side-menu-list .opened').removeClass('opened').find('ul').slideUp();
				}
				parent.addClass('opened');
				subMenu.slideDown();
			}
		});
	});


	//	$(window).resize(function(){
	//		$('body').click('click');
	//	});


	//	Block UI.
	CommonUtils.blockUi = function () {
		$('body').block({
			message: '<div class="blockui-default-message"><i class="fa fa-circle-o-notch fa-spin"></i><h6>Please Wait...</h6></div>',
			overlayCSS: {
				background: 'rgba(24, 44, 68, 0.8)',
				opacity: 1,
				cursor: 'wait'
			},
			css: {
				width: '50%'
			},
			blockMsgClass: 'block-msg-default'
		});
	};

	CommonUtils.unblock = function () {
		$('body').unblock();
	};

	CommonUtils.getContextPath = function () {
		return $('meta[name=context-path]').attr("content");
	};


	CommonUtils.confirm = function (fnCallcack, msg) {
		bootbox.confirm({
			title: 'ยืนยัน',
			message: (msg) ? msg : "ยืนยันการทำรายการ ?",
			buttons: {
				confirm: {
					label: 'ตกลง',
					className: 'btn-primary pull-ok-left'
				},
				cancel: {
					label: 'ยกเลิก',
					className: 'btn-default'
				}
			},
			callback: function (result) {
				fnCallcack(result);
			}
		});
	};

	CommonUtils.confirm = function (fnCallcack, msg) {
		bootbox.confirm({
			title: 'ยืนยัน',
			message: (msg) ? msg : "ยืนยันการทำรายการ ?",
			buttons: {
				confirm: {
					label: 'ตกลง',
					className: 'btn-primary pull-ok-left'
				},
				cancel: {
					label: 'ยกเลิก',
					className: 'btn-default'
				}
			},
			callback: function (result) {
				fnCallcack(result);
			}
		});
	};


	CommonUtils.alert = function (msg, fnCallcack) {
		bootbox.alert({
			title: 'แจ้งเตือน',
			message: msg,
			callback: function () {
				if (fnCallcack) {
					fnCallcack()
				}
			},
			buttons: {
				ok: {
					label: 'ตกลง'
				}
			}
		});

	};


	CommonUtils.convertDate = function (ms) {
		if (!ms) return "-";

		var date = new Date(ms),
			year = date.getFullYear(),
			month = (date.getMonth() + 1).toString(),
			formatedMonth = (month.length === 1) ? ("0" + month) : month,
			day = date.getDate().toString(),
			formatedDay = (day.length === 1) ? ("0" + day) : day,
			hour = date.getHours().toString(),
			formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
			minute = date.getMinutes().toString(),
			formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
			second = date.getSeconds().toString(),
			formatedSecond = (second.length === 1) ? ("0" + second) : second;
		return formatedDay + "/" + formatedMonth + "/" + year + "  " + formatedHour + ':' + formatedMinute;
	};


	CommonUtils.isBlank = function ( inputId ){
		var v = $("#" + inputId).val();
		return $.trim(v) == "";
	};



});

function fnLogout() {
	$("#formLogout").submit();
}