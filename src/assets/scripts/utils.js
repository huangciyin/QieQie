function showOverlay(name) {
	$("#overlay").removeAttr('hidden').find("#" + name).removeAttr('hidden');
};

function closeAllOverlay() {
	$("#overlay").attr('hidden', '').find('.page').attr('hidden', '');
}