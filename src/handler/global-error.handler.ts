import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error) {
        const location = this.injector.get<LocationStrategy>(LocationStrategy as any);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        StackTrace.fromError(error).then(stackframes => {
            const stackString = stackframes
                .splice(0, 20)
                .map(function (sf) {
                    return sf.toString();
                })
                .join('\n');

            console.log(
                `Error Message : ${message} | Url : ${url} | Stack Trace: ${stackString}`
            );
        });
    }
}
