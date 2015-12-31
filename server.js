var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

    console.log('Master cluster settings up ' + numCPUs + ' CPUs');

    // TODO uncomment for set up ONE worker!
    cluster.fork();

    // TODO uncomment for set up MORE workers!
    /*for (var i = 0; i < numCPUs; i++) {
        setTimeout(function() {
            cluster.fork()
        }, 1000);
    }*/

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online')
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + 'died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker!');
        cluster.fork();
    });
} else {
    require('./app');
}

