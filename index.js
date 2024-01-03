import express from "express";

//clusters - multithreading
import cluster from "cluster";
import os from "os";

//express app
const app = express();


//get the number of CPUs available
const cpusCount = os.cpus().length;


app.get("/", (req, res) => {
    
    //task example
    for(let i = 0; i < 1e8; i++){
       
    }

    res.send(`Task finished on....${process.pid}`);
    
    //kill the process after finishing
    //cluster.worker.kill();
});



//worker event hooks
cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} was killed`);
    
    //after a worker has died or killed, create a new one
    cluster.fork();
}); 



//use the primary process to create children processes
if(cluster.isPrimary){
    //create the workers
    for(let i = 0; i < cpusCount; i++){
        cluster.fork();
    }
}else{
    //we are on a worker
    //all workers work in the same port
    app.listen(3000, () => {
        console.log(`server running at port 3000 with process id ${process.pid}`);
    });
}


