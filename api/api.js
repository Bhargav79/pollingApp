const db = require('../schema/database');

//Api code below
module.exports = (app,body)=>{


    app.post('/poll',(req,res)=>{

        if(req.body.studentname){
            db.findOne({studentname:req.body.studentname }).exec().then(data=>{
                if(data!=null){
                    console.log(data);
                    db.findOneAndUpdate({studentname:req.body.studentname},
                    {
                        fruitname: req.body.fruitname
                    }).exec().then(metadata=>{
                        res.json({message:"Sucessfully Updated",
                                    data:metadata});
                    })
                }
                else{
                    let newstudent  = db();
                    newstudent.fruitname  = req.body.fruitname;
                    newstudent.studentname  = req.body.studentname;
    
                    newstudent.save((err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(result);
                            res.json(result);
                        }
                    });
                }
            })
        }
        else{
            console.log("Please Enter Your Name")
            res.json({message:"Please Enter Your Name"});
        }
    
    });


 


    app.get('/fruit/:snack', (req,res)=>{
        db.find({fruitname:req.params.snack}).exec().then(data=>{
            res.json(data);
        })
    })




}
