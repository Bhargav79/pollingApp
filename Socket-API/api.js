const db = require('../schema/database');

//Api code below
module.exports = (io)=>{

        io.on('connection', (socket) => {

            console.log('Connection Established');

            socket.on('disconnect', function() {
                console.log('User Disconnected');
            });

            socket.on('Add Poll', (Poll) => {
                        db.findOne({studentname:Poll.studentname}).exec().then(data=>{
                            if(data!=null){
                                console.log(data);
                                db.findOneAndUpdate({studentname:Poll.studentname},
                                {
                                    fruitname: Poll.fruitname
                                }).exec().then(metadata=>{
                                    io.emit('Poll', metadata);
                                })
                            }
                            else{
                                let newstudent  = db();
                                newstudent.fruitname  = Poll.fruitname;
                                newstudent.studentname  = Poll.studentname;
                
                                newstudent.save((err,result)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(result);
                                        io.emit('Poll', result);
                                    }
                                });
                            }
                        })
            
            });

        });

}
