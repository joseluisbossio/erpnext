$(document).on("toolbar_setup", function() {
	if (frappe.boot.sysdefaults.demo_company) {
		erpnext.setup_clear_button();
	}
});

erpnext.setup_clear_button = function() {
	let message_string = __('Demo data is setup, use this button to clear before starting actual transactions');
	let $floatingBar = $(`
		<div class="flex justify-content-center" style="width: 100%;">
			<div class="flex justify-content-center flex-col shadow rounded p-2"
					style="
						width: 50%;
						background-color: #e0f2fe;
						position: fixed;
						bottom: 20px;
						z-index: 1;">
			<p style="margin: auto 0; padding-left: 10px; margin-right: 20px; font-size: 15px;">
					${message_string}
				</p>
				<button id="clear-demo" type="button"
					class="
						px-4
						py-2
						border
						border-transparent
						text-white
					"
					style="
						margin: auto 0;
						height: fit-content;
						background-color: #007bff;
						border-radius: 5px;
						margin-right: 10px
					"
				>
					Clear
				</button>
			</div>
		</div>
	`);

	$('footer').append($floatingBar);

	$('#clear-demo').on('click', function () {
		frappe.call({
			method: "erpnext.setup.demo.clear_demo_data",
			freeze: true,
			freeze_message: __('Clearing Demo Data...'),
			callback: function(r) {
				frappe.ui.toolbar.clear_cache();
				frappe.show_alert({ message: __('Demo data cleared'), indicator: 'green' });
				$('footer').remove($floatingBar);
			}
		})
	});
}