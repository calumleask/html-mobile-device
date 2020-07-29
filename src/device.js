
import "./device.css";

import DeviceControls from "./device-controls";
import { devices } from "./devices";

export default class Device {

	constructor() {
		this._view = {
			container: null,
			device: null,
			screenContainer: null
		};
		this._device = {
			name: "",
			width: 0,
			height: 0
		};
		this._screenProperties = {
			width: 0,
			height: 0,
			aspectRatio: 1,
			orientation: "portrait"
		};

		this._deviceControls = null;
		this._onStart = null;
		this._onStop = null;
	}

	init(options) {
		if (!this._tryCreateDomElements(options))
		this._initDeviceInfo(options);
		if (typeof options.debugControls === "string") {
			this._deviceControls = new DeviceControls();
			this._deviceControls.init(this, {
				parent: options.debugControls,
				deviceHandle: this._getDeviceHandle()
			});
		}

		if (typeof options.start === "function") {
			this._onStart = options.start;
		}
		if (typeof options.stop === "function") {
			this._onStop = options.stop;
		}
	}

	_tryCreateDomElements(options) {
		this._view.container = document.getElementById(options.parent);
		if (this._view.container === null) {
			throw new Error("Failed to create device inside container with id \"" + options.parent + "\". Element does not exist.");
		}
		this._view.device = document.createElement("div");
		this._view.device.classList.add("device");
		this._view.device.classList.add("portrait");
		this._view.container.appendChild(this._view.device);
		this._view.screenContainer = document.createElement("div");
		this._view.screenContainer.className = "device-screen";
		this._view.device.appendChild(this._view.screenContainer);
	}

	_initDeviceInfo(options) {
		let deviceInfo = null;
		const useDefaultDevice = typeof options.deviceName !== "string";
		if (!useDefaultDevice) {
			deviceInfo = devices.getDeviceInfo(options.deviceName);
		}
		if (!deviceInfo) {
			deviceInfo = devices.getDefaultDeviceInfo();
			if (!useDefaultDevice) {
				console.warn("Device name: " + options.deviceName + " does not exist. Using default: "
							+ deviceInfo.names[0]);
			}
		}
		this.setDevice(deviceInfo);
		if (options.orientation === "landscape") {
			this.setLandscape();
		}
	}

	setDevice(device) {
		this._device.name = device.title;
		this._device.width = device.width;
		this._device.height = device.height;
		this._updateScreenProperties(this._device.width, this._device.height, this._screenProperties.orientation);
	}

	setLandscape() {
		this._updateScreenProperties(this._device.width, this._device.height, "landscape");
	}

	setPortrait() {
		this._updateScreenProperties(this._device.width, this._device.height, "portrait");
	}


	_updateScreenProperties(width, height, orientation) {
		if (orientation === "landscape") {
			const tempWidth = width;
			width = height;
			height = tempWidth;
		}
		this._view.device.classList.remove(this._screenProperties.orientation);
		this._screenProperties.orientation = orientation;
		this._view.device.classList.add(this._screenProperties.orientation);
		this._screenProperties.width = width;
		this._screenProperties.height = height;
		this._updateScreenContainer();
	}
	_updateScreenContainer() {
		this._view.screenContainer.style.width = this._screenProperties.width + "px";
		this._view.screenContainer.style.height = this._screenProperties.height + "px";
	}

	start() {
		if (typeof this._onStart === "function") {
			this._onStart(this._getDeviceHandle());
		}
	}

	stop() {
		if (typeof this._onStop === "function") {
			this._onStop(this._getDeviceHandle());
		}
	}

	_getDeviceHandle() {
		return {
			getDeviceName: () => { return this._device.name; },
			getScreenContainer: () => { return this._view.screenContainer; },
			getScreenProperties: () => { return this._screenProperties; }
		};
	}
}