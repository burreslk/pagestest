var device;

document.write("test count=0x0008");
console.log("console-log = 0x0007");

  document.getElementsByTagName("button")[0].onclick = function (e){
    navigator.usb.requestDevice({ filters: [{ vendorId: 0x0483 }] })
    .then(selectedDevice => {
       device = selectedDevice;
       console.log('found WebUSB device');
       return device.open(); // Begin a session.
     })
    .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
    .then(() => device.claimInterface(1)) // Request exclusive control over interface #2.
    .then(() => device.controlTransferIn({
        requestType: 'vendor',
        recipient: 'device',
        request: 0x01,
        value: 0x01,
        index: 0x02}, 18)) // Ready to receive data
	.then((USBInTransferResult) =>console.log(USBInTransferResult))
//  .then(() => device.transferIn(3, 64)) // Waiting for 64 bytes of data from endpoint #3.
//    .then(result => {
//      let decoder = new USBInTransferResult();
//      console.log('Received: ' + decoder.decode(result.data));
//    })
    .catch(error => { console.log(error); 
      console.log(error.code); 
      console.log(error.message); 
      console.log(error.name);});
    
  }