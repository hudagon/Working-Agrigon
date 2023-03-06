
// General Display View Model 
var myDisplayViewModel = {
    currentUserDeleteName: ko.observable(''),
    currentUserDeleteId: ko.observable(''),
    listUser: ko.observableArray([]),
    msg: ko.observable(''),
}

// Adding View Model 
var addingFormViewModel = {
    userId: ko.observable(0),
    firstName: ko.observable(''),
    lastName: ko.observable(''),
    age: ko.observable(0)
}

// Edit View Model 
var editViewModel = {
    userId: ko.observable(0),
    firstName: ko.observable(''),
    lastName: ko.observable(''),
    age: ko.observable(0)
}

// Get initially data after loading page 
getListUser();

// Function to get List User 
function getListUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        success: function (data) {
            myDisplayViewModel.listUser(data);
        }
    });
}

// Event to get user's info after clicking delete button
$(document).on("click", ".btn-danger", function () {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    myDisplayViewModel.currentUserDeleteId(userId)
    myDisplayViewModel.currentUserDeleteName(userName)
});

// Event to get user's info after clicking edit button
$(document).on("click", ".btn-warning.view", function () {
    var userId = $(this).attr("data-user-id");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users/" + userId,
        success: function (data) {
            editViewModel.userId(data.id);
            editViewModel.firstName(data.firstName);
            editViewModel.lastName(data.lastName);
            editViewModel.age(data.age);
        }
    });
});

// Event to delete a specific user
$('#btnDeleteAccept').click(function () {
    let userDeleteId = myDisplayViewModel.currentUserDeleteId();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/users/" + userDeleteId,
        success: function () {
            getListUser();
            myDisplayViewModel.msg('User deleted successfully!')
            $('#msg').show();
            setTimeout(function() {
                $('#msg').hide(); 
            }, 2000);
        }
    });
});

// Event to add a user
$('#btnAddingAccept').click(function () {
    let newUser = {
        id: addingFormViewModel.userId(),
        firstName: addingFormViewModel.firstName(),
        lastName: addingFormViewModel.lastName(),
        age: addingFormViewModel.age()
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users",
        data: newUser,
        success: function () {
            getListUser();
            addingFormViewModel.userId(0);
            addingFormViewModel.firstName('');
            addingFormViewModel.lastName('');
            addingFormViewModel.age(0);
            myDisplayViewModel.msg('User added successfully!')
            $('#msg').show();
            setTimeout(function() {
                $('#msg').hide(); 
            }, 2000);
        }
    });

});

// Event to edit a user
$('#btnEditingAccept').click(function () {
    let editedUser = {
        id: editViewModel.userId(),
        firstName: editViewModel.firstName(),
        lastName: editViewModel.lastName(),
        age: editViewModel.age()
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/users/" + editViewModel.userId(),
        data: editedUser,
        success: function () {
            getListUser();
            myDisplayViewModel.msg('User edit successfully!')
            $('#msg').show();
            setTimeout(function() {
                $('#msg').hide(); 
            }, 2000);
        }
    });

});

//  Binding ViewModels to View
ko.applyBindings(myDisplayViewModel, document.getElementById('container'));
ko.applyBindings(myDisplayViewModel, document.getElementById('deleteModal'));
ko.applyBindings(addingFormViewModel, document.getElementById('addingModal'));
ko.applyBindings(editViewModel, document.getElementById('editModal'));
