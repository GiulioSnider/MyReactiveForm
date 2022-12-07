import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutModule } from "./core/layout/layout.module";
import { FeaturesModule } from "./features/features.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        LayoutModule,
        FeaturesModule
    ]
})
export class AppModule { }
