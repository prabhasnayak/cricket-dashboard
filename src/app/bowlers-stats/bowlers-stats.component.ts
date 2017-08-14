import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../providers/data-store.service';

@Component({
	selector: 'app-bowlers-stats',
	templateUrl: './bowlers-stats.component.html',
	styleUrls: ['./bowlers-stats.component.css']
})
export class BowlersStatsComponent implements OnInit {
	graphs: any = {};
	data: any;
	loading: boolean;
	current_team: string;

	constructor(public dataStoreService: DataStoreService) { }

	ngOnInit() {
		this.getBowlersStats();
	}

	getBowlersStats() {
		this.loading = true;

		if(this.dataStoreService.data) {
			this.data = this.dataStoreService.getBowlersStats();
			let count = 0;
			for(var team in this.data) {
				if(count == 0) {
					this.current_team = team;
				};
				this.graphs[team] = {};
				this.prepareGraph(team);
				count++;
			}
			
			this.loading = false;
		} else {
			setTimeout(() => {
				this.getBowlersStats();
			},500);		
		};
	}

	prepareGraph(team) {
		this.graphs[team]["type"] = 'bar';
		let bowlers = [];
		let max_overs = 0;
		for (var bowler_id in this.data[team]["bowlers"]) {
			bowlers.push(bowler_id);
			let bowler = this.data[team]["bowlers"][bowler_id];
			max_overs = ( bowler.length > max_overs ) ? bowler.length : max_overs;
		}

		let datasets = [];
		let colors = ["blue", "green"];
		for (var i = 1; i <= max_overs; ++i) {
			var data = [];
			
			for (var bowler_id in this.data[team]["bowlers"]) {
				data.push(this.data[team]["bowlers"][bowler_id][i-1]);
			}
			datasets.push({
				label: "Over " + i,
				data: data,
				backgroundColor: colors[i - 1]
			})
		}
		this.graphs[team]["data"] = {
			labels: bowlers,
			datasets: datasets
		};
		this.graphs[team]["options"] = {
			title: {
				display: true,
				text: "Bowling Stats"
			},
			legend: {
				display: false
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
					},
					stacked: true
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Bowlers'
					},
					stacked: true
				}]
			}
		};
	}
}
