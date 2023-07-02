const checkAll = document.getElementById('checkAll');
const checkBoxes = $('tbody input[type=checkbox]');
const restoreBtn = $(".restore-btn");

checkAll.addEventListener('click', event => {
	if (event.target.checked && checkBoxes.length > 0) {
		$('tbody input[type=checkbox]').prop('checked', true);
		$(".btnDelete").removeClass("disabled");
	} else {
		$('tbody input[type=checkbox]').prop('checked', false);
		$(".btnDelete").addClass("disabled");
	}
});

function allCheckBoxChecked() {
	for (let checkbox of checkBoxes) {
		if (checkbox.checked == false) {
			return false;
		}
	}
	return true;
}

function leastOneCheckBoxChecked() {
	for (let checkbox of checkBoxes) {
		if (checkbox.checked == true) {
			return true;
		}
	}
	return false;
}

if (checkBoxes.length >= 2) {
	checkBoxes.map((index, item) => {
		item.addEventListener("click", e => {
			if (allCheckBoxChecked()) {
				$("#checkAll").prop('checked', true);
			} else if (leastOneCheckBoxChecked()) {
				$(".btnDelete").removeClass("disabled");
				$("#checkAll").prop('checked', false);
			} else {
				$(".btnDelete").addClass("disabled");
				$("#checkAll").prop('checked', false);
			}
		})
	})
} else {
	checkBoxes.map((index, item) => {
		item.addEventListener("click", e => {
			if (e.target.checked) {
				$("#checkAll").prop('checked', true);
				$(".btnDelete").removeClass("disabled");
			} else {
				$("#checkAll").prop('checked', false);
				$(".btnDelete").addClass("disabled");
			}
		})
	})
}

$(".btnDelete.force").click(function() {
	var ids = [];
	$('tbody input[type=checkbox]:checked').map((index, item) => {
		ids.push(item.id);
	})
	forceDeleteProduct(ids);

});

$(".btnDelete").click(function() {
	var ids = [];
	$('tbody input[type=checkbox]:checked').map((index, item) => {
		ids.push(item.id);
	})
	deleteProduct(ids);

});

restoreBtn.click(function() {
	restoreProduct(this.id);
});

function deleteProduct(data) {
	$.ajax({
		url: "/api/seller/product",
		type: "DELETE",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function() {
			window.location.href = "/seller/product/list/all?page=1&size=2";
		},
		error: function(e) {
			console.log("error")
		}
	})
}

function forceDeleteProduct(data) {
	$.ajax({
		url: "/api/seller/product/forceDelete",
		type: "DELETE",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function() {
			window.location.href = "/seller/trashbin?page=1&size=2";
		},
		error: function(e) {
			console.log("error")
		}
	})
}

function restoreProduct(data) {
	$.ajax({
		url: "/api/seller/product/restore",
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function() {
			window.location.href = "/seller/product/list/all?page=1&size=2";
		},
		error: function(e) {
			console.log("error" + e)
		}
	})
}

var alertElement = $(".alert");
if (alertElement) {
	setTimeout(() => {
		alertElement.remove();
	}, 3000);
}
