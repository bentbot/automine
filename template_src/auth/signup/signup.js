//SignupForm validation
$(function() {
	if (!$('#signup-form').length) {
        return false;
    }

    var signupValidationSettings = {
	    rules: {
	    	username: {
	    		required: true,
	    	},
	    	lastname: {
	    		required: true,
	    	},
	        email: {
	            required: true,
	            email: true
	        },
	        password: {
				required: true,
				minlength: 8
	        },
	        retype_password: {
				required: true,
				minlength: 8,
				equalTo: "#password"
			},
			agreement: {
				required: true,
			}
	    },
	    groups: {
	    	name: "username lastname",
			pass: "password retype_password",
		},
		errorPlacement: function(error, element) {
			if (
				element.attr("name") == "username"
			) {
				error.insertAfter($("#lastname").closest('.row'));
				element.parents("div.form-group")
				.addClass('has-error');
			} 
			else if (
				element.attr("name") == "password" || 
				element.attr("name") == "retype_password" 
			) {
				error.insertAfter($("#retype_password").closest('.row'));
				element.parents("div.form-group")
				.addClass('has-error');
			}
			else if (element.attr("name") == "agreement") {
				error.insertAfter($("#agreement").closest('.form-group'));
				element.parents("div.form-group")
				.addClass('has-error');
			}
			else {
				error.insertAfter(element);
			}
		},
	    messages: {
	    	username: "Please enter a username",
	        email: {
	            required: "Please enter email",
	            email: "Please enter a valid email address"
	        },
	        password: {
	        	required: "Please enter password fields.",
	        	minlength: "Passwords should be at least 8 characters."
	        },
	        retype_password: {
	        	required: "Please enter password fields.",
	        	minlength: "Passwords should be at least 8 characters."
	        },
	        agreement: "Please accept our policy"
	    },
	    invalidHandler: function() {
			animate({
				name: 'shake',
				selector: '.auth-container > .card'
			});
		}
	}

	$.extend(signupValidationSettings, config.validations);

	var terms = '';
    $('#agree').click(function(e){ 
    	terms = (terms=='true') ? '' : 'true';
    	$('#agreement').value(terms); 
    });

    $('#signup-form').validate(signupValidationSettings);
});