
const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');
const { EventData, EventHubProducerClient } = require("@azure/event-hubs");

const fs = require('fs');
const {promisify} = require('util')

const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=hospitalstoragethesis;AccountKey=Sr8cft9eLH9tp//4a1zlz7KXugQgyEw89zAXPFD4N8tHknhPlPmZjAV3j2N+b3XTBNoIpdEehtUPELhLzBFFbA==;EndpointSuffix=core.windows.net";
const CONTAINER_NAME = "imgnewusers"
const IMAGES_DIR = "/Users/khoa1799/GitHub/E-health-WebApp/images_patient/"

const EVENT_HUB_CONNECTION = "Endpoint=sb://receivemsgsfromdevices.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=lM4liPS83Rni9DE72LJg2swfELncFmBKOIYTKm81eQY=";
const EVENT_HUB_NAME = "receivemsg";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
const producer = new EventHubProducerClient(EVENT_HUB_CONNECTION, EVENT_HUB_NAME);

let send_to_blod = (name) => {
    try {
        let image_path =  IMAGES_DIR + name;
        let data = fs.readFileSync(image_path);         
        containerClient.uploadBlockBlob(name, data, data.length);
        fs.unlink(image_path, (err)=>{
            if (err)console.log(err)
        });
    } catch (error) {
        console.log(error);
    }
}

const upload_image_cloud = promisify(send_to_blod)

async function send_python_server(user_infor, list_images) {
    const batch = await producer.createBatch();
    batch.tryAdd({properties:user_infor, body:list_images});  
  
    // Send the batch to the event hub.
    await producer.sendBatch(batch);
  
    // Close the producer client.
    await producer.close();
  
    console.log("A batch of three events have been sent to the event hub");
}

// send_python_server().catch((err) => {
//     console.log("Error occurred: ", err);
//   });

async function send_images_cloud(list_images){
    await Promise.all(list_images.map(name => upload_image_cloud(name)));
}

function create_patient (user_infor, list_images){
    send_images_cloud(list_images);
    let list_imgs_composed = "";
    list_images.forEach(element => {list_imgs_composed += element + ' '})
    console.log(user_infor, list_imgs_composed);
}


function create_new_device(){

}

module.exports = {
    create_patient: create_patient,
    create_new_device: create_new_device
};