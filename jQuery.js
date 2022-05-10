$(document).ready(function() {

	var account = ['k','k'];
  var accountList = [];
  accountList.push(account);


  
	$('#login-button').on('click', function() {
		var loginUsernameEntry = $("#userNameLog").val();
		var loginPasswordEntry = $("#passwordLog").val();
    var check=0;
    var arrayLength = accountList.length;
    for (var i = 0; i < arrayLength; i++) {
      if(accountList[i][0]==loginUsernameEntry && accountList[i][1]==loginPasswordEntry){
        check=1;
      }
    }

    if (check==1){
      $("#loginPage").hide();
      $("#settingsPage").show();
    }
		else {
			alert("Your username or password is incorrect please try again.")
		};
	});
  
	$('#submit-button').on('click', function() {
    
		var createUsernameEntry = $("#userNameReg").val();
		var createPasswordEntry = $("#passwordReg").val();
    var createNameEntry = $("#name").val();
		var createEmailEntry = $("#email").val();
    var createBirthDayEntry = $("#birthday").val();
    var createUsernameValid = false;
    var createPasswordValid = false;
    var createNameValid = false;
    var createEmailValid = false;
    var createBirthDayValid = false;

    var createUsernameObject = $("#userNameReg");
    var createPasswordObject = $("#passwordReg");
    var createBirthDayObject = $("#birthday");

    var createNameObject = $("#name");
    var createEmailObject = $("#email");

    var validate = /^\s*[a-zA-Z0-9,\s]+\s*$/;
    var validateName = /^([^0-9]*)$/;
    var validatePass= /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   


    if(!validate.test(createUsernameEntry) || (createUsernameEntry).length == 0 || (createUsernameEntry == "Enter a valid username")) {
      $(createUsernameObject).addClass("error")
      $(createUsernameObject).val("Enter a valid username")
    } else {
      createUsernameValid = true;
      var createUsername = $(createUsernameObject).val();
    }
    
    if(!validate.test(createPasswordEntry) || !validatePass.test(createPasswordEntry) || (createPasswordEntry).length < 6 || (createPasswordEntry == "Enter a valid password")) {
      $(createPasswordObject).addClass("error");
      $(createPasswordObject).val("Enter a valid password");
    } else {
      createPasswordValid = true;
      var createPassword = $(createPasswordObject).val();
    }

    if(!validate.test(createNameEntry) || !validateName.test(createNameEntry) || (createNameEntry).length == 0 || (createNameEntry == "Enter a valid name")){
        $(createNameObject).addClass("error");
        $(createNameObject).val("Enter a valid name");
      } else {
        createNameValid = true;
        var createName = $(createNameObject).val();
      }
    
    if(!validateEmail.test(createEmailEntry) || (createEmailEntry == "Enter a valid email")) {
      $(createEmailObject).addClass("error");
      $(createEmailObject).val("Enter a valid email");
    } else {
      createEmailValid = true;
    }

    if((createBirthDayEntry).length == 0 || (createEmailEntry == "Enter a valid date")) {
      $(createBirthDayObject).addClass("error");
      $(createBirthDayObject).val("Enter a valid date");
    } else {
      createBirthDayValid = true;
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

    $(createBirthDayObject).on('click', function () {
      $(this).val("");
      $(this).removeClass("error");
    });



		if(createUsernameValid == true && createPasswordValid == true && createEmailValid == true  && createNameValid == true && createBirthDayValid == true) {
        account = [createUsername, createPassword];
        accountList.push(account);
        $("#registerPage").hide();
        $("#loginPage").show();
    
      }
    });
    

  });