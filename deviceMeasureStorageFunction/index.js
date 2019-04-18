const azureStorage = require('azure-storage');
const uuid = require('uuid/v1');

const tableService = azureStorage.createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING);

const TABLENAME = "DEVICETELEMETRY";

module.exports = async function (context, queueMsg) {

    context.log('JavaScript ServiceBus queue trigger function processed message');
    let item = queueMsg;
    if (item) {
        item["PartitionKey"] = "Partition";
        item["RowKey"] = new Date().getTime() + "_" + uuid();
        // Use { echoContent: true } if you want to return the created item including the Timestamp & etag
        tableService.insertEntity(TABLENAME, item, { echoContent: true }, function (error, result, resp) {
            if (!error) {
                console.log(JSON.stringify(resp, result, 2));
            } else {
                console.error(err.toString());
                context.res.status(500).json({ error: error });
            }
        });
    }

};