import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NgAudioRecorderService {
    private chunks;
    protected recorderEnded: EventEmitter<any>;
    recorderError: EventEmitter<ErrorCase>;
    private _recorderState;
    constructor();
    private recorder;
    private static guc;
    getUserContent(): Promise<MediaStream>;
    startRecording(): void;
    pause(): void;
    resume(): void;
    stopRecording(outputFormat: OutputFormat): Promise<unknown>;
    getRecorderState(): RecorderState;
    private addListeners;
    private appendToChunks;
    private recordingStopped;
    private clear;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgAudioRecorderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgAudioRecorderService>;
}
export declare enum OutputFormat {
    WEBM_BLOB_URL = 0,
    WEBM_BLOB = 1
}
export declare enum ErrorCase {
    USER_CONSENT_FAILED = 0,
    RECORDER_TIMEOUT = 1,
    ALREADY_RECORDING = 2
}
export declare enum RecorderState {
    INITIALIZING = 0,
    INITIALIZED = 1,
    RECORDING = 2,
    PAUSED = 3,
    STOPPING = 4,
    STOPPED = 5
}
