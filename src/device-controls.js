
import { devices } from "./devices";

export default class DeviceControls {

	constructor() {
        this._device = null;
        this._view = {
            container: null
        };
        this._deviceSelector = null;
        this._orientCheckbox = null;
        this._startButton = null;
        this._stopButton = null;
	}

	init(device, options) {
        this._view.container = document.getElementById(options.parent);
		if (this._view.container === null) {
            console.warn("Element with id: \"" + options.parent + "\" does not exist. Please provide a valid id.");
            return;
		}
        this._device = device;
        this._initDeviceSelector(options.deviceHandle.getDeviceName());
        this._initOrientCheckbox(options.deviceHandle.getScreenProperties().orientation);
        this._initStartButton();
        this._initStopButton();

        this._deviceSelector.onchange = this._onDeviceSelect.bind(this);
        this._orientCheckbox.onclick = this._onOrientCheckbox.bind(this);
        this._startButton.onclick = this._onStartButton.bind(this);
        this._stopButton.onclick = this._onStopButton.bind(this);
    }
    
    _initDeviceSelector(deviceName) {
        this._deviceSelector = document.createElement("select");
        this._view.container.appendChild(this._deviceSelector);
        

        devices.getDeviceList().forEach(deviceInfo => {
            const option = document.createElement("option");
            option.value = JSON.stringify(deviceInfo);
            option.innerText = deviceInfo.title;
            if (deviceInfo.title === deviceName) {
                option.selected = true;
            }
            this._deviceSelector.appendChild(option);
        });
    }
    
    _initOrientCheckbox(orientation) {
        this._orientCheckbox = document.createElement("input");
        this._orientCheckbox.type = "checkbox";
        this._orientCheckbox.name = "device orientation";
        this._orientCheckbox.id = "device-orientation";
        this._view.container.appendChild(this._orientCheckbox);
        const label = document.createElement("label");
        label.htmlFor = "device-orientation";
        label.appendChild(document.createTextNode("Landscape"));
        this._view.container.appendChild(label);
        if (orientation === "landscape") {
            this._orientCheckbox.checked = true;
        }
    }
    
    _initStartButton() {
        this._startButton = document.createElement("button");
        this._startButton.innerText = "Start";
        this._view.container.appendChild(this._startButton);
    }
    
    _initStopButton() {
        this._stopButton = document.createElement("button");
        this._stopButton.innerText = "Stop";
        this._view.container.appendChild(this._stopButton);
    }

    _onDeviceSelect(e) {
        if (!this._device) return;
        const device = JSON.parse(e.target.value);
        this._device.setDevice(device);
    }

    _onOrientCheckbox(e) {
        if (!this._device) return;
        if (e.target.checked) {
            this._device.setLandscape();
        }
        else {
            this._device.setPortrait();
        }
    }

    _onStartButton() {
        if (!this._device) return;
        this._device.start();
    }

    _onStopButton() {
        if (!this._device) return;
        this._device.stop();
    }
}