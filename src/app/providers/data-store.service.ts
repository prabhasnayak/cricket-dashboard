import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

//Service to get data from json file
//Convert the data as per the needs of the graph
@Injectable()
export class DataStoreService {
	url: string = "../../assets/data.json";
	data: any;
	team_1: any;
	team_2: any;

	constructor(private http: HttpClient) { 
		let seq = this.get("../../assets/data.json").share();

		seq
			.subscribe(res => {
				this.set(res);
			}, err => {
				console.log('in the API error ');
			});
	}

	//get data from the json file
	get(endpoint: string) {
		return this.http.get(endpoint);
	}

	//set the data retreived from the json file
	set(data) {
		this.data = data;
	}

	//convert the data as per needs of the graph
	getRunsPerOver(team_id) {
		let score = this.data["scores"][team_id];
		let team = {
			"overs": [],
			"runs": [],
			"total": 0,
			"cr_rate": [],
			"bowlers": {}
		};

		let runs = 0;
		
		for (var key in score) {
			let runs_per_over = 0;
			let over = parseInt(key.replace("over_", ""));

			for (var i = 0; i < score[key]["detail"].length; ++i) {
				runs += score[key]["detail"][i]["runs"];
				runs_per_over += score[key]["detail"][i]["runs"];
			}
			team.overs.push(over);
			team.runs.push(runs);
			team.total += runs;
			team.cr_rate.push(team.total/over);

			if(!team.bowlers[score[key]["bowler_id"]]) {
				team.bowlers[score[key]["bowler_id"]] = [];
			};
			team.bowlers[score[key]["bowler_id"]].push(runs_per_over);
		};

		return team;
	}

	//get data for run rate comparison graph
	getRunRates() {
		this.team_1 = this.getRunsPerOver("1");
		this.team_2 = this.getRunsPerOver("2");
		return {
			"total_overs": this.data["total_overs"],
			"rr_rate": this.team_1.total / this.data["total_overs"],
			"cr_rate": this.team_2.cr_rate
		};
	}

	//get data for score comparison between teams
	getScoreComparison() {
		return {
			"total_overs": this.data["total_overs"],
			"team_1_runs": this.team_1.runs,
			"team_2_runs": this.team_2.runs
		};
	}

	//get data for top scoreres graph
	getTopScorers() {
		let scores = { }
		let top = [];
		for (var team_id in this.data["scores"]) {
			let team = this.data["scores"][team_id];

			for (var key in team) {
				let over = parseInt(key.replace("over_", ""));

				for (var i = 0; i < team[key]["detail"].length; ++i) {
					let bowl = team[key]["detail"][i];
					if(!scores[team_id + '_' + bowl["batsman_id"]]) {
						scores[team_id + '_' + bowl["batsman_id"]] = 0;
					};
					scores[team_id + '_' + bowl["batsman_id"]] += bowl["runs"];
				}
			};
		};
		
		for (var score in scores) {
			let team = this.data["teams"][score.split("_")[0]]["name"] + ", " + this.data["teams"][score.split("_")[0]]["players"][score.split("_")[1]]["name"];
			top.push([team, scores[score]]);
		}

		top.sort(function(a, b) {
			return b[1] - a[1];
		});

		top.splice(3);

		return {
			"top_score": top
		};
	}

	//get bowler stats graph data
	getBowlersStats() {
		return {
			"team_1": this.team_1,
			"team_2": this.team_2
		};
	}
}