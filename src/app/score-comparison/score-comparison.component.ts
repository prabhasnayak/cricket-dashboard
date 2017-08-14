import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../providers/data-store.service';

@Component({
	selector: 'app-score-comparison',
	templateUrl: './score-comparison.component.html',
	styleUrls: ['./score-comparison.component.css']
})
export class ScoreComparisonComponent implements OnInit {
	
	data: any;
	type: string;
	options: any;
	loading: boolean;

	constructor(public dataStoreService: DataStoreService) { }

	ngOnInit() {
		this.getScoreComparison();
	}

	getScoreComparison() {
		this.loading = true;

		if(this.dataStoreService.data) {
			this.data = this.dataStoreService.getScoreComparison();
			this.prepareGraph();
			this.loading = false;
		} else {
			setTimeout(() => {
				this.getScoreComparison();
			},500);		
		};
	}

	prepareGraph() {
		this.type = 'line';
		let overs = [];
		for (var i = 1; i <= this.data["total_overs"]; ++i) {
			overs.push(i);
		}
		this.data = {
			labels: overs,
			datasets: [{
				label: "Team 1",
				data: this.data["team_1_runs"],
				borderColor: "green",
				fill: false,
				lineTension: 0,
				borderWidth: 1
			},
			{
				label: "Team 2",
				data: this.data["team_2_runs"],
				borderColor: "blue",
				fill: false,
				lineTension: 0,
				borderWidth: 1
			}]
		};
		this.options = {
			title: {
				display: true,
				text: "Score comparison"
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
						labelString: 'Runs'
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
