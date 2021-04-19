//Form Validation

$(document).ready(function(){
   $('#passwordd').hide();//error
   $('#namee').hide();
    
  
   $('#password').mouseleave(function(){
        Paa();
 
   });
   $('#name').mouseleave(function(){
         Naa();
       
});


function Paa(){
    
  var  pass = document.getElementById('password').value;
    if(pass =="" || pass.trim()==""){
        $('#passwordd').html('Enter a caracter');
        $("#passwordd").css('color','red');
        $("#passwordd").show();
        

    }

else if(pass.length <8){
    $('#passwordd').html('password must be 8 caracter');
    $("#passwordd").css('color','red');
    $("#passwordd").show();
    

}

else if(pass.search(/[a-z]/)==-1){
    $('#passwordd').html('You must have atleast 1 small letter ');
    $("#passwordd").css('color','red');
    $("#passwordd").show();
    
}
 
else if(pass.search(/[A-Z]/)==-1){
    $('#passwordd').html('You must have atleast 1 capital letter ');
    $("#passwordd").css('color','red');
    $("#passwordd").show();
    
}

else if(pass.search(/[0-9]/)==-1){
    $('#passwordd').html('You must have atleast 1 number ');
    $("#passwordd").css('color','red');
    $("#passwordd").show();
    
}

else if(pass.search(/[!\@\#\$\%\^\&\*\(\)\-\_\=\+\;\:\,\.\<\>\?\|\/]/)==-1){
    $('#passwordd').html('You must have atleast 1 special caracter ');
    $("#passwordd").css('color','red');
    $("#passwordd").show();
    
}
else{
    $('#passwordd').html('Sucess ');
    $("#passwordd").css('color','green');
    $("#passwordd").show();
    
}

};


function Naa(){
    var nam=document.getElementById('name').value;
    if(nam =="" || nam.trim()==""){
        $('#namee').html('Enter your name');
        $("#namee").css('color','red');
        $("#namee").show();
    
    }

    else if(nam.length<5){
        $('#namee').html('Name must be more than 5 caracters');
        $("#namee").css('color','red');
        $("#namee").show();
    }

    else if(nam.search(/[0-9]/)!==-1){
        $('#namee').html('Name must not have any numbers');
        $("#namee").css('color','red');
        $("#namee").show();
    }

    else if(nam.search(/[!\@\#\$\%\^\&\*\(\)\-\_\=\+\;\:\,\.\<\>\?\|\/]/)!==-1){
        $('#namee').html('You must not have any special caracters ');
        $("#namee").css('color','red');
        $("#namee").show();
        
    }
    else{
        $('#namee').html('Sucess ');
        $("#namee").css('color','green');
        $("#namee").show();
        
    }

}


});//Main function



function val(){

    var paass=document.getElementById('password').value;
    var eemm=document.getElementById('email').value;
    
    var p1= ['12#Aafahgdfsagh','aaaa@gmail.com']
    var p2= ['123#Aafahgdfsagh','bbbb@gmail.com']
    var p3= ['124#Aafahgdfsagh','cccc@gmail.com']
    var p4= ['125#Aafahgdfsagh','dddd@gmail.com']
    var p5= ['126#Aafahgdfsagh','eeee@gmail.com']
    
    
if(paass == p1[0] && eemm==p1[1]){
    document.write("LOG IN SUCESSFULL")
}
else if(paass == p2[0] && eemm==p2[1]){
    document.write("LOG IN SUCESSFULL")
}
else if(paass == p3[0] && eemm==p3[1]){
    document.write("LOG IN SUCESSFULL")
}
else if(paass == p4[0] && eemm==p4[1]){
    document.write("LOG IN SUCESSFULL")
}
else if(paass == p5[0] && eemm==p5[1]){
    document.write("LOG IN SUCESSFULL")
}
else{
    alert("TRY AGAIN")
}
  }