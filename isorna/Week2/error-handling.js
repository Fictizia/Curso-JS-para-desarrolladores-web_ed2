function throwStack (){
    var oError = new Error();
    
    return oError.stack;
}