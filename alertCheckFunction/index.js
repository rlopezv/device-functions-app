const MAX_TEMPERATURE = 20;

module.exports = async function(context, deviceMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', deviceMsg);
    if (deviceMsg.temperature && deviceMsg.temperature>MAX_TEMPERATURE) {
        var alertMsg = {
            "deviceId":deviceMsg.deviceId,
            "temperature":deviceMsg.temperature,
            "temperatureLimit":MAX_TEMPERATURE,
            "alertTime": new Date().toISOString()
          };
          context.bindings.outputAlertMsg = alertMsg;
          context.bindings.outputAlertStorageMsg = alertMsg;
          context.bindings.outputTelegramMsg = alertMsg;
    }
    context.bindings.outputTelemetryStorageMsg = deviceMsg;
    return;
    
};