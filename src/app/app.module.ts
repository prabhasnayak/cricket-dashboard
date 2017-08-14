import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';
import { AppComponent } from './app.component';
import { RunRatesComponent } from './run-rates/run-rates.component';
import { ScoreComparisonComponent } from './score-comparison/score-comparison.component';
import { TopScorersComponent } from './top-scorers/top-scorers.component';
import { BowlersStatsComponent } from './bowlers-stats/bowlers-stats.component';
import { DataStoreService } from './providers/data-store.service';
import { KeysPipe } from './pipes/keys';

@NgModule({
	declarations: [
		AppComponent,
		RunRatesComponent,
		ScoreComparisonComponent,
		TopScorersComponent,
		BowlersStatsComponent,
		KeysPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ChartModule
	],
	providers: [
		DataStoreService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }