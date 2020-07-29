
const deviceList = [
    {
        "title": "iPhone 4",
        "names": [
            "iPhone 4"
        ],
        "width": 320,
        "height": 480
    },
    {
        "title": "iPhone 5/SE",
        "names": [
            "iPhone 5",
            "iPhone SE"
        ],
        "width": 320,
        "height": 568
    },
    {
        "title": "iPhone 6/7/8",
        "names": [
            "iPhone 6",
            "iPhone 7",
            "iPhone 8"
        ],
        "width": 375,
        "height": 667
    },
    {
        "title": "iPhone X",
        "names": [
            "iPhone X",
        ],
        "width": 375,
        "height": 812
    },
    {
        "title": "iPad",
        "names": [
            "iPad",
            "iPad Mini"
        ],
        "width": 768,
        "height": 1024
    },
    {
        "title": "iPad Pro",
        "names": [
            "iPad Pro",
        ],
        "width": 1024,
        "height": 1366
    }
];

export const devices = {
    getDeviceList: () => {
        return deviceList;
    },
    getDeviceInfo: (name) => {
        let deviceInfo = null;
        deviceList.some((device) => {
            if (device.title === name || device.names.indexOf(name) !== -1) {
                deviceInfo = device;
                return true;
            }
            return false;
        });
        return deviceInfo;
    },
    getDefaultDeviceInfo: () => {
        return deviceList[0];
    }
};