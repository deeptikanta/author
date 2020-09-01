function checkPassword(password){

    var t=new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%^&+=])(?=\\S+$).{6,}$');
    if(t.test(password)){
    return 'sucess'
    }else{
    var length=0;
    var caps=new RegExp('[A-Z\s]+');
    var small=new RegExp('[a-z\s]+');
    var number=new RegExp('[0-9\s]+');
    var special=new RegExp('^(?=.*[@!#$%^&+=])(?=\\S+$)');
    length=caps.test(password)?length:length+1;
    length=small.test(password)?length:length+1;
    length=special.test(password)?length:length+1;
    length=number.test(password)?length:length+1;
    if(password.length<6)
    {
    return 6 -password.length>length?6 -password.length: length;
    }else{
    return length;
    }
    
    }
    }
    console.log(checkPassword('a@3435'));