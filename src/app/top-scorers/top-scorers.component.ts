import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../providers/data-store.service';

@Component({
	selector: 'app-top-scorers',
	templateUrl: './top-scorers.component.html',
	styleUrls: ['./top-scorers.component.css']
})
export class TopScorersComponent implements OnInit {

	data: any;
	type: string;
	options: any;
	loading: boolean;

	constructor(public dataStoreService: DataStoreService) { }

	ngOnInit() {
		this.getTopScorers();
	}

	getTopScorers() {
		this.loading = true;

		if(this.dataStoreService.data) {
			this.data = this.dataStoreService.getTopScorers();
			this.prepareGraph();
			this.loading = false;
		} else {
			setTimeout(() => {
				this.getTopScorers();
			},500);
		};
	}

	prepareGraph() {
		this.type = 'pie';
		let top = [];
		let labels = [];
		for (var i = 0; i < this.data["top_score"].length; ++i) {
			top.push(this.data["top_score"][i][1]);
			labels.push(this.data["top_score"][i][0])
		}

		this.data = {
			labels: labels,
			datasets: [{
				label: "",
				data: top,
				backgroundColor: ["red", "blue", "green"]
			}]
		};
		this.options = {
			title: {
				display: true,
				text: "3 Top Scorers"
			},
			responsive: true,
			maintainAspectRatio: true
		};
	}
}
