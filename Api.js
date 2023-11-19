const express=require("express")
const app=express()
const bodyP=require("body-parser")
const compiler = require("compilex")
const options = {stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use(bodyP.urlencoded({ extended: true }));
app.use("/codemirror-5.65.12",express.static(__dirname+"/codemirror-5.65.12"))
app.use(express.static("public"));
const mongoose = require("mongoose");

app.set("view engine", "ejs");

const loginRecord = require("./model/Login.js");



mongoose.connect("mongodb+srv://harsh:harsh@harsh.ubevjnt.mongodb.net/login?retryWrites=true&w=majority");
app.get("/compiler", function(req,res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile(__dirname+"/compiler.html")
})
app.post("/compile",function(req,res){
      
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    
    try{
        if(lang=="Cpp"){
            if(!input){ 
                var envData = { OS : "windows" , cmd : "g++" , options:{timeout:10000}};
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrrrrrre"})
                    }
                });
            }
            else{ 
                var envData = { OS : "windows" , cmd : "g++" , options:{timeout:10000}}; 
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrrrrrrer"})
                    }
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"};
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "Java errorrr"})
                    }
                });    
            }
            else if(input){  
                var envData = { OS : "windows"};
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "Java errorrr"})
                    }
                });
            }
        }
        else if(lang == "Python"){
            if(!input){ 
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrr1"})
                    }
                });    
            }
            else if(input){ 
                var envData = { OS : "windows"};
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrr"})
                    }       
                });
            }
        }
    }
    catch(e){
        console.log("errorrrrrrr")
    }

})

app.get("/home", function(req,res){
    res.sendFile(__dirname+"/home.html")
})
app.post("/home", function(req,res){
    res.sendFile(__dirname+"/home.html")
})
app.get("/javaIntro" ,function(req,res){
    res.sendFile(__dirname+"/javaIntro.html")
})
app.post("/javaIntro" ,function(req,res){
    res.sendFile(__dirname+"/javaIntro.html")
})
app.get("/array" ,function(req,res){
    res.sendFile(__dirname+"/array.html")
})
app.post("/array" ,function(req,res){
    res.sendFile(__dirname+"/array.html")
})
app.get("/multi" ,function(req,res){
    res.sendFile(__dirname+"/multiDimensionalArray.html")
})
app.post("/multi" ,function(req,res){
    res.sendFile(__dirname+"/multiDimensionalArray.html")
})

app.get("/input" ,function(req,res){
    res.sendFile(__dirname+"/inputOutput.html")
})
app.post("/input" ,function(req,res){
    res.sendFile(__dirname+"/inputOutput.html")
})

app.get("/ifelse" ,function(req,res){
    res.sendFile(__dirname+"/ifElse.html")
})
app.post("/ifelse" ,function(req,res){
    res.sendFile(__dirname+"/ifElse.html")
})
app.get("/switch" ,function(req,res){
    res.sendFile(__dirname+"/switchStatements.html")
})
app.post("/switch" ,function(req,res){
    res.sendFile(__dirname+"/switchStatements.html")
})

app.get("/variable" ,function(req,res){
    res.sendFile(__dirname+"/variablesLiterals.html")
})
app.post("/variable" ,function(req,res){
    res.sendFile(__dirname+"/variablesLiterals.html")
})

app.get("/forloop" ,function(req,res){
    res.sendFile(__dirname+"/forLoop.html")
})
app.post("/forloop" ,function(req,res){
    res.sendFile(__dirname+"/forLoop.html")
})

app.get("/while" ,function(req,res){
    res.sendFile(__dirname+"/whileLoop.html")
})
app.post("/while" ,function(req,res){
    res.sendFile(__dirname+"/whileLoop.html")
})

app.get("/hello" ,function(req,res){
    res.sendFile(__dirname+"/helloWorld.html")
})
app.post("/hello" ,function(req,res){
    res.sendFile(__dirname+"/helloWorld.html")
})
app.get("/jvm" ,function(req,res){
    res.sendFile(__dirname+"/jvmJdk.html")
})
app.post("/jvm" ,function(req,res){
    res.sendFile(__dirname+"/jvmJdk.html")
})

app.get("/data" ,function(req,res){
    res.sendFile(__dirname+"/dataTypes.html")
})
app.post("/jvm" ,function(req,res){
    res.sendFile(__dirname+"/dataTypes.html")
})

app.get("/operator" ,function(req,res){
    res.sendFile(__dirname+"/forEach.html")
})
app.post("/operator" ,function(req,res){
    res.sendFile(__dirname+"/forEach.html")
})

app.get("/expression" ,function(req,res){
    res.sendFile(__dirname+"/expression.html")
})
app.post("/expression" ,function(req,res){
    res.sendFile(__dirname+"/expression.html")
})

app.get("/comment" ,function(req,res){
    res.sendFile(__dirname+"/comments.html")
})
app.post("/comment" ,function(req,res){
    res.sendFile(__dirname+"/comments.html")
})

app.get("/break" ,function(req,res){
    res.sendFile(__dirname+"/break.html")
})
app.post("/break" ,function(req,res){
    res.sendFile(__dirname+"/break.html")
})














async function signupUploader(req,res){
    var email = req.body.email;
    var phone = req.body.phone;
    var name = req.body.name;
    var password = req.body.password;
    try{
        const article=await loginRecord.create({
            email:req.body.email,
            password: req.body.password,
            name:req.body.name,
            phone:req.body.phone,
        })
        console.log(article);
        res.sendFile(__dirname+"/login.html")
    }
    catch(err){
        console.log(err);
    }
}

async function fetchLogin(req,res){
    try{
        var email = req.body.email;
        var password = req.body.password;
        const user =  await loginRecord.where("email").equals(email);
        res.render("auth",{newListItems:user,Password:password});
        console.log(user);
    }catch(err){
        console.log(err);
    }
};


app.get("/" ,function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/" ,function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/registered",signupUploader);
app.get("/login" ,function(req,res){
    res.sendFile(__dirname+"/login.html")
})
app.post("/login" ,function(req,res){
    res.sendFile(__dirname+"/login.html")
})
app.post("/auth",fetchLogin);





app.listen(8001)