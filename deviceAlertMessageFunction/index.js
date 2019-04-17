var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var ModuleClient = require('azure-iot-device').ModuleClient;
var Transport = require('azure-iot-device-mqtt').Mqtt;
var connectionString = process.env.AzureIoTHubConnectionString;

module.exports = async function(context, queueMsg) {
    
    context.log('JavaScript ServiceBus queue trigger function processed message', queueMsg);
          var data = JSON.stringify(queueMsg);
          var methodParams = {
            methodName: 'alert',
            payload: data,
            responseTimeoutInSeconds: 30
           };
        if (queueMsg.module) {
            var client = ModuleClient.fromConnectionString(connectionString, Transport);
            client.invokeMethod(queueMsg.deviceId, 'sensehatModule' ,methodParams
            , (err, resp) => {
                if (err) {
                    console.error(err.toString());
                } else {
                    console.log(JSON.stringify(resp, null, 2));
                }
            });
        } else {
            var client = Client.fromConnectionString(connectionString);
            client.invokeDeviceMethod(queueMsg.deviceId, methodParams, function (err,
                res) {
                 if (err) {
                            console.error(err.toString());
                        } else {
                            console.log(JSON.stringify(res, null, 2));
                        }
                });
        }
};