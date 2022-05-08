$(document).ready(function() {
	var loginUsername;
	var loginPassword;
	var account = [loginUsername, loginPassword];
    var accountList = [[k,k]]

  
	$('#login-button').on('click', function() {
		var loginUsernameEntry = $("#login-username").val();
		var loginPasswordEntry = $("#login-password").val();
		if (loginUsernameEntry == account[0] && loginPasswordEntry == account[1]) {
			console.log("Current Username " + account[0]);
			console.log("Current Password " + account[1]);
			console.log("Logged In");
		} else {
			console.log("Attempted Username " + loginUsernameEntry);
			console.log("Attempted Password " + loginPasswordEntry);
			console.log("Login Falied");
		};
	});
  
	$('#submit-button').on('click', function() {
		var createUsernameEntry = $("#userNameReg").val();
		var createPasswordEntry = $("#passwordReg").val();
        var createNameEntry = $("#name").val();
		var createEmailEntry = $("#email").val();
        var createUsernameValid = false;
        var createPasswordValid = false;
        var createNameValid = false;
        var createEmailValid = false;
        var createUsernameObject = $("#userNameReg");
        var createPasswordObject = $("#passwordReg");
        var createNameObject = $("#name");
        var createEmailObject = $("#email");

        var validate = /^\s*[a-zA-Z0-9,\s]+\s*$/;
        var validateName = /^([^0-9]*)$/;
        var validatePass= /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(!validate.test(createUsernameEntry) || (createUsernameEntry).length == 0) {
      $(createUsernameObject).addClass("error")
      $(createUsernameObject).val("Enter a valid username")
    } else {
      createUsernameValid = true;
      var createUsername = $(createUsernameObject).val();
    }
    
    if(!validate.test(createPasswordEntry) || !validatePass.test(createPasswordEntry) || (createPasswordEntry).length < 6) {
      $(createPasswordObject).addClass("error");
      $(createPasswordObject).val("Enter a valid password");
    } else {
      createPasswordValid = true;
      var createPassword = $(createPasswordObject).val();
    }

    if(!validate.test(createNameEntry) || !validateName.test(createNameEntry) || (createNameEntry).length == 0) {
        $(createNameObject).addClass("error");
        $(createNameObject).val("Enter a valid name");
      } else {
        createNameValid = true;
        var createName = $(createNameObject).val();
      }
    
    if(!validateEmail.test(createEmailEntry)) {
      $(createEmailObject).addClass("error");
      $(createEmailObject).val("Enter a valid email");
    } else {
      createEmailValid = true;
      console.log("Account Email " + createEmailObject.val())
    }
      
    $(createUsernameObject).on('click', function () {
      $(this).val("");  
      $(this).removeClass("error");
    });
    
    $(createPasswordObject).on('click', function () {
      $(this).val("");  
      $(this).removeClass("error");
    });

    $(createNameObject).on('click', function () {
        $(this).val("");
        $(this).removeClass("error");
      });
    
    $(createEmailObject).on('click', function () {
      $(this).val("");
      $(this).removeClass("error");
    });
    
		account = [createUsername, createPassword];
        accountList.push(account);
		console.log("Account Username " + account[0]);
		console.log("Account Password " + account[1]);
    
		if(createUsernameValid == true && createPasswordValid == true && createEmailValid == true) {
      $('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "fast");
    }
	});
  
	$('.message a').on('click', function() {
		$('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "fast");
	});
});