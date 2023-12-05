import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NgAudioRecorderService {
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
export var OutputFormat;
(function (OutputFormat) {
    OutputFormat[OutputFormat["WEBM_BLOB_URL"] = 0] = "WEBM_BLOB_URL";
    OutputFormat[OutputFormat["WEBM_BLOB"] = 1] = "WEBM_BLOB";
})(OutputFormat || (OutputFormat = {}));
export var ErrorCase;
(function (ErrorCase) {
    ErrorCase[ErrorCase["USER_CONSENT_FAILED"] = 0] = "USER_CONSENT_FAILED";
    ErrorCase[ErrorCase["RECORDER_TIMEOUT"] = 1] = "RECORDER_TIMEOUT";
    ErrorCase[ErrorCase["ALREADY_RECORDING"] = 2] = "ALREADY_RECORDING";
})(ErrorCase || (ErrorCase = {}));
export var RecorderState;
(function (RecorderState) {
    RecorderState[RecorderState["INITIALIZING"] = 0] = "INITIALIZING";
    RecorderState[RecorderState["INITIALIZED"] = 1] = "INITIALIZED";
    RecorderState[RecorderState["RECORDING"] = 2] = "RECORDING";
    RecorderState[RecorderState["PAUSED"] = 3] = "PAUSED";
    RecorderState[RecorderState["STOPPING"] = 4] = "STOPPING";
    RecorderState[RecorderState["STOPPED"] = 5] = "STOPPED";
})(RecorderState || (RecorderState = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYXVkaW8tcmVjb3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWF1ZGlvLXJlY29yZGVyLWl2eS9zcmMvbGliL25nLWF1ZGlvLXJlY29yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBS3pELE1BQU0sT0FBTyxzQkFBc0I7SUFRakM7UUFOUSxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDckQsMkJBQTJCO1FBQ25CLG1CQUFjLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQztRQWdGNUMsbUJBQWMsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUM7UUFDTSxxQkFBZ0IsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUM7SUFyRkYsQ0FBQztJQUtPLE1BQU0sQ0FBQyxHQUFHO1FBQ2hCLE9BQU8sU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM1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QUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLENBQUM7SUFZTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQzsrR0FuR1Usc0JBQXNCO21IQUF0QixzQkFBc0I7OzRGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVU7O0FBd0dYLE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsaUVBQWEsQ0FBQTtJQUNiLHlEQUFTLENBQUE7QUFDWCxDQUFDLEVBSFcsWUFBWSxLQUFaLFlBQVksUUFHdkI7QUFFRCxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLHVFQUFtQixDQUFBO0lBQ25CLGlFQUFnQixDQUFBO0lBQ2hCLG1FQUFpQixDQUFBO0FBQ25CLENBQUMsRUFKVyxTQUFTLEtBQVQsU0FBUyxRQUlwQjtBQUVELE1BQU0sQ0FBTixJQUFZLGFBT1g7QUFQRCxXQUFZLGFBQWE7SUFDdkIsaUVBQVksQ0FBQTtJQUNaLCtEQUFXLENBQUE7SUFDWCwyREFBUyxDQUFBO0lBQ1QscURBQU0sQ0FBQTtJQUNOLHlEQUFRLENBQUE7SUFDUix1REFBTyxDQUFBO0FBQ1QsQ0FBQyxFQVBXLGFBQWEsS0FBYixhQUFhLFFBT3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyIE1lZGlhUmVjb3JkZXI6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nQXVkaW9SZWNvcmRlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgY2h1bmtzOiBBcnJheTxhbnk+ID0gW107XG4gIHByb3RlY3RlZCByZWNvcmRlckVuZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgcmVjb3JkZXJFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3JDYXNlPigpO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHJpdmF0ZSBfcmVjb3JkZXJTdGF0ZSA9IFJlY29yZGVyU3RhdGUuSU5JVElBTElaSU5HO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHJpdmF0ZSByZWNvcmRlcjogYW55O1xuXG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ3VjKCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7YXVkaW86IHRydWV9KTtcbiAgfVxuXG5cbiAgZ2V0VXNlckNvbnRlbnQoKSB7XG4gICAgcmV0dXJuIE5nQXVkaW9SZWNvcmRlclNlcnZpY2UuZ3VjKCk7XG4gIH1cblxuICBzdGFydFJlY29yZGluZygpIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkZXJTdGF0ZSA9PT0gUmVjb3JkZXJTdGF0ZS5SRUNPUkRJTkcpIHtcbiAgICAgIHRoaXMucmVjb3JkZXJFcnJvci5lbWl0KEVycm9yQ2FzZS5BTFJFQURZX1JFQ09SRElORyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9yZWNvcmRlclN0YXRlID09PSBSZWNvcmRlclN0YXRlLlBBVVNFRCkge1xuICAgICAgdGhpcy5yZXN1bWUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVjb3JkZXJTdGF0ZSA9IFJlY29yZGVyU3RhdGUuSU5JVElBTElaSU5HO1xuICAgIE5nQXVkaW9SZWNvcmRlclNlcnZpY2UuZ3VjKCkudGhlbigobWVkaWFTdHJlYW0pID0+IHtcbiAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcihtZWRpYVN0cmVhbSk7XG4gICAgICB0aGlzLl9yZWNvcmRlclN0YXRlID0gUmVjb3JkZXJTdGF0ZS5JTklUSUFMSVpFRDtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KCk7XG4gICAgICB0aGlzLl9yZWNvcmRlclN0YXRlID0gUmVjb3JkZXJTdGF0ZS5SRUNPUkRJTkc7XG4gICAgfSk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkZXJTdGF0ZSA9PT0gUmVjb3JkZXJTdGF0ZS5SRUNPUkRJTkcpIHtcbiAgICAgIHRoaXMucmVjb3JkZXIucGF1c2UoKTtcbiAgICAgIHRoaXMuX3JlY29yZGVyU3RhdGUgPSBSZWNvcmRlclN0YXRlLlBBVVNFRDtcbiAgICB9XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMuX3JlY29yZGVyU3RhdGUgPT09IFJlY29yZGVyU3RhdGUuUEFVU0VEKSB7XG4gICAgICB0aGlzLl9yZWNvcmRlclN0YXRlID0gUmVjb3JkZXJTdGF0ZS5SRUNPUkRJTkc7XG4gICAgICB0aGlzLnJlY29yZGVyLnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BSZWNvcmRpbmcob3V0cHV0Rm9ybWF0OiBPdXRwdXRGb3JtYXQpIHtcbiAgICB0aGlzLl9yZWNvcmRlclN0YXRlID0gUmVjb3JkZXJTdGF0ZS5TVE9QUElORztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWNvcmRlckVuZGVkLnN1YnNjcmliZSgoYmxvYikgPT4ge1xuICAgICAgICB0aGlzLl9yZWNvcmRlclN0YXRlID0gUmVjb3JkZXJTdGF0ZS5TVE9QUEVEO1xuICAgICAgICBpZiAob3V0cHV0Rm9ybWF0ID09PSBPdXRwdXRGb3JtYXQuV0VCTV9CTE9CKSB7XG4gICAgICAgICAgcmVzb2x2ZShibG9iKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3V0cHV0Rm9ybWF0ID09PSBPdXRwdXRGb3JtYXQuV0VCTV9CTE9CX1VSTCkge1xuICAgICAgICAgIGNvbnN0IGF1ZGlvVVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgICByZXNvbHZlKGF1ZGlvVVJMKTtcbiAgICAgICAgfVxuICAgICAgfSwgXyA9PiB7XG4gICAgICAgIHRoaXMucmVjb3JkZXJFcnJvci5lbWl0KEVycm9yQ2FzZS5SRUNPUkRFUl9USU1FT1VUKTtcbiAgICAgICAgcmVqZWN0KEVycm9yQ2FzZS5SRUNPUkRFUl9USU1FT1VUKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZWNvcmRlci5zdG9wKCk7XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5yZWNvcmRlckVycm9yLmVtaXQoRXJyb3JDYXNlLlVTRVJfQ09OU0VOVF9GQUlMRUQpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UmVjb3JkZXJTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkZXJTdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTGlzdGVuZXJzKCkge1xuICAgIHRoaXMucmVjb3JkZXIub25kYXRhYXZhaWxhYmxlID0gdGhpcy5hcHBlbmRUb0NodW5rcztcbiAgICB0aGlzLnJlY29yZGVyLm9uc3RvcCA9IHRoaXMucmVjb3JkaW5nU3RvcHBlZDtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kVG9DaHVua3MgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIHRoaXMuY2h1bmtzLnB1c2goZXZlbnQuZGF0YSk7XG4gIH07XG4gIHByaXZhdGUgcmVjb3JkaW5nU3RvcHBlZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKHRoaXMuY2h1bmtzLCB7dHlwZTogJ2F1ZGlvL3dlYm0nfSk7XG4gICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICB0aGlzLnJlY29yZGVyRW5kZWQuZW1pdChibG9iKTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBjbGVhcigpIHtcbiAgICB0aGlzLnJlY29yZGVyID0gbnVsbDtcbiAgICB0aGlzLmNodW5rcyA9IFtdO1xuICB9XG59XG5cblxuZXhwb3J0IGVudW0gT3V0cHV0Rm9ybWF0IHtcbiAgV0VCTV9CTE9CX1VSTCxcbiAgV0VCTV9CTE9CLFxufVxuXG5leHBvcnQgZW51bSBFcnJvckNhc2Uge1xuICBVU0VSX0NPTlNFTlRfRkFJTEVELFxuICBSRUNPUkRFUl9USU1FT1VULFxuICBBTFJFQURZX1JFQ09SRElOR1xufVxuXG5leHBvcnQgZW51bSBSZWNvcmRlclN0YXRlIHtcbiAgSU5JVElBTElaSU5HLFxuICBJTklUSUFMSVpFRCxcbiAgUkVDT1JESU5HLFxuICBQQVVTRUQsXG4gIFNUT1BQSU5HLFxuICBTVE9QUEVEXG59XG4iXX0=