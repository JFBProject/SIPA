var CurrentSearch  = {};

$(function() {
	
	var contextPath = CommonUtils.getContextPath() ;
	
	$('#example').DataTable({
		"searching": false ,
		"processing": true,
        "serverSide": true,
        "ajax":  contextPath + "admin/currentSearch/query",
        "columns": [
            { "data": "roleId" },
            { "data": "roleCode" },
            { "data": "roleDesc" },
            { 
            	"data": "roleId",
            	 "render": function (data, type, row ) {
            		 var btn = '<button type="button" class="btn btn-inline btn-sm" onclick="CurrentSearch.onClickEdit(\'#EDITID#\')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span> Edit</button>';
            		 btn = btn.replace("#EDITID#",data);
            		 return btn;
                 }
           },
        ]
	});
	
	CurrentSearch.onClickEdit = function( id ){
		var url =  CommonUtils.getContextPath() + "admin/currentSearch/edit?id=" + id ;
		window.location.href = url;
	};
});