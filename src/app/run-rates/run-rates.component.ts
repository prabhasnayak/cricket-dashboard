import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../providers/data-store.service';

@Component({
	selector: 'app-run-rates',
	templateUrl: './run-rates.component.html',
	styleUrls: ['./run-rates.component.css']
})
export class RunRatesComponent implements OnInit {

	data: any;
	type: string;
	options: any;
	loading: boolean;

	constructor(public dataStoreService: DataStoreService) { }

	ngOnInit() {
		this.getRunRates();
	}

	getRunRates() {
		this.loading = true;

		if(this.dataStoreService.data) {
			this.data = this.dataStoreService.getRunRates();
			this.prepareGraph();
			this.loading = false;
		} else {
			setTimeout(() => {
				this.getRunRates();
			},500);
		};
	}

	prepareGraph() {
		this.type = 'line';
		let overs = [];
		let rr_rate = [];
		for (var i = 1; i <= this.data["total_overs"]; ++i) {
			overs.push(i);
			rr_rate.push(this.data["rr_rate"]);
		}
		this.data = {
			labels: overs,
			datasets: [{
				label: "Current Run Rate",
				data: this.data["cr_rate"],
				borderColor: "green",
				fill: false,
				lineTension: 0,
				borderWidth: 1
			},
			{
				label: "Required Run Rate",
				data: rr_rate,
				borderColor: "red",
				fill: false,
				lineTension: 0,
				borderWidth: 1
			}]
		};
		this.options = {
			title: {
				display: true,
				text: "Run Rate comparison"
			},
			legend: {
				display: true
			},
			responsive: true,
			maintainAspectRatio: true,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					},
					scaleLabel: {
						display: true,
						labelString: 'Run Rate'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Overs'
					}
				}]
			}
		};
	}
}
