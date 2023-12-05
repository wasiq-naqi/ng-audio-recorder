import * as i0 from '@angular/core';
import { EventEmitter, Injectable, NgModule } from '@angular/core';

class NgAudioRecorderService {
    constructor() {
        this.chunks = [];
        this.recorderEnded = new EventEmitter();
        this.recorderError = new EventEmitter();
        // tslint:disable-next-line
        this._recorderState = RecorderState.INITIALIZING;
        this.appendToChunks = (event) => {
            this.chunks.push(event.data);
        };
        this.recordingStopped = (event) => {
            const blob = new Blob(this.chunks, { type: 'audio/webm' });
            this.chunks = [];
            this.recorderEnded.emit(blob);
            this.clear();
        };
    }
    static guc() {
        return navigator.mediaDevices.getUserMedia({ audio: true });
    }
    getUserContent() {
        return NgAudioRecorderService.guc();
    }
    startRecording() {
        if (this._recorderState === RecorderState.RECORDING) {
            this.recorderError.emit(ErrorCase.ALREADY_RECORDING);
        }
        if (this._recorderState === RecorderState.PAUSED) {
            this.resume();
            return;
        }
        this._recorderState = RecorderState.INITIALIZING;
        NgAudioRecorderService.guc().then((mediaStream) => {
            this.recorder = new MediaRecorder(mediaStream);
            this._recorderState = RecorderState.INITIALIZED;
            this.addListeners();
            this.recorder.start();
            this._recorderState = RecorderState.RECORDING;
        });
    }
    pause() {
        if (this._recorderState === RecorderState.RECORDING) {
            this.recorder.pause();
            this._recorderState = RecorderState.PAUSED;
        }
    }
    resume() {
        if (this._recorderState === RecorderState.PAUSED) {
            this._recorderState = RecorderState.RECORDING;
            this.recorder.resume();
        }
    }
    stopRecording(outputFormat) {
        this._recorderState = RecorderState.STOPPING;
        return new Promise((resolve, reject) => {
            this.recorderEnded.subscribe((blob) => {
                this._recorderState = RecorderState.STOPPED;
                if (outputFormat === OutputFormat.WEBM_BLOB) {
                    resolve(blob);
                }
                if (outputFormat === OutputFormat.WEBM_BLOB_URL) {
                    const audioURL = URL.createObjectURL(blob);
                    resolve(audioURL);
                }
            }, _ => {
                this.recorderError.emit(ErrorCase.RECORDER_TIMEOUT);
                reject(ErrorCase.RECORDER_TIMEOUT);
            });
            this.recorder.stop();
        }).catch(() => {
            this.recorderError.emit(ErrorCase.USER_CONSENT_FAILED);
        });
    }
    getRecorderState() {
        return this._recorderState;
    }
    addListeners() {
        this.recorder.ondataavailable = this.appendToChunks;
        this.recorder.onstop = this.recordingStopped;
    }
    clear() {
        this.recorder = null;
        this.chunks = [];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
var OutputFormat;
(function (OutputFormat) {
    OutputFormat[OutputFormat["WEBM_BLOB_URL"] = 0] = "WEBM_BLOB_URL";
    OutputFormat[OutputFormat["WEBM_BLOB"] = 1] = "WEBM_BLOB";
})(OutputFormat || (OutputFormat = {}));
var ErrorCase;
(function (ErrorCase) {
    ErrorCase[ErrorCase["USER_CONSENT_FAILED"] = 0] = "USER_CONSENT_FAILED";
    ErrorCase[ErrorCase["RECORDER_TIMEOUT"] = 1] = "RECORDER_TIMEOUT";
    ErrorCase[ErrorCase["ALREADY_RECORDING"] = 2] = "ALREADY_RECORDING";
})(ErrorCase || (ErrorCase = {}));
var RecorderState;
(function (RecorderState) {
    RecorderState[RecorderState["INITIALIZING"] = 0] = "INITIALIZING";
    RecorderState[RecorderState["INITIALIZED"] = 1] = "INITIALIZED";
    RecorderState[RecorderState["RECORDING"] = 2] = "RECORDING";
    RecorderState[RecorderState["PAUSED"] = 3] = "PAUSED";
    RecorderState[RecorderState["STOPPING"] = 4] = "STOPPING";
    RecorderState[RecorderState["STOPPED"] = 5] = "STOPPED";
})(RecorderState || (RecorderState = {}));

class NgAudioRecorderModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderModule, providers: [
            NgAudioRecorderService
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: NgAudioRecorderModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: [
                        NgAudioRecorderService
                    ]
                }]
        }] });

/*
 * Public API Surface of ng-audio-recorder
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorCase, NgAudioRecorderModule, NgAudioRecorderService, OutputFormat, RecorderState };
//# sourceMappingURL=ng-audio-recorder.mjs.map
