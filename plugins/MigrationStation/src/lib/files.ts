import { findByProps } from "@vendetta/metro";
const { launchImageLibrary } = findByProps("launchImageLibrary");
const { downloadMediaAsset } = findByProps("downloadMediaAsset");

export const openFilePicker = (): Promise<object> => new Promise((resolve, reject) =>
    launchImageLibrary(
        {
            mediaType: "any",
            maxWidth: 0,
            maxHeight: 0,
            videoQuality: "high",
            durationLimit: 0,
            quality: 1,
            cameraType: "back",
            includeBase64: false,
            includeExtra: true,
            saveToPhotos: false,
            selectionLimit: 1,
        },
        async (r) => {
            if (r.didCancel) return reject("Backup selection cancelled");
            if (r.errorCode) return reject(`Native error: ${r.errorCode}`);

            const res = await fetch(r.assets[0].uri);
            let json;

            try {
                json = await res.json();
            } catch {
                return reject("Malformed backup file");
            }

            resolve(json);
        }
    )
);

export const downloadFile = (data: any) => downloadMediaAsset(`data:,${encodeURIComponent(data)}`);